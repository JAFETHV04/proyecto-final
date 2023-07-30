const express = require('express');
const router = express.Router();
const conexion = require('./database/bd');

/////////LOGIN///////

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', session : req.session });
  });
  

  router.post('/login', function(request, response, next){
  
      var correo = request.body.correo;
  
      var clave = request.body.clave;
  
      if(correo && clave)
      {
          query = `
          SELECT * FROM cuentausuario WHERE correo = "${correo}"  `;
  
          conexion.query(query, function(error, data){
  
              if(data.length > 0)
              {
                  for(var count = 0; count < data.length; count++)
                  {
                      if(data[count].clave == clave)
                      {
                          request.session.id = data[count].id;
  
                          response.redirect("/home");
                      }
                      else
                      {
                          response.send('Clave Incorrecta');
                      }
                  }
              }
              else
              {
                  response.send('Correo Incorrecto');
              }
              response.end();
          });
      }
      else
      {
          response.send('Por Favor Digite el Correo y la');
          response.end();
      }
  
  });
  


  router.get('/logout', function(request, response, next){
  
      request.session.destroy();
  
      response.redirect("/");
  
  });


router.get('/home', (req, res)=>{     
    res.render('home.ejs');               
})





//////PAIS////////////

   router.get('/get_pais', function(request, response, next){
    var buscar_query = request.query.buscar_query;
    var query = `
    SELECT NOMBRE FROM PAIS WHERE NOMBRE LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, function(error, data){
    response.json(data);
    });
    });

router.get('/PAIS', (req, res)=>{     
    conexion.query('SELECT * FROM PAIS',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('../views/pais.ejs', {results:results});            
        }   
    })
    

})

router.get('/crearpais', (req,res)=>{
    res.render('../views/crearpais.ejs');
})

router.get('/deletepais/:idpais', (req, res) => {
    const ccate = req.params.ccate;
    conexion.query('DELETE FROM PAIS WHERE idpais = ?',[idpais], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/pais');         
        }
    })
});

router.get('/PAIS/:idpais', (req,res)=>{    
    const idpais = req.params.idpais;
    conexion.query('SELECT * FROM PAIS WHERE idpais=?',[idpais] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('../views/editarpais.ejs', {pais:results[0]});            
        }        
    });
});

const pais = require('./controller/pais');
  router.post('/guardarpais', pais.guardarpais);
  router.post('/actualizapais', pais.actualizapais);
  
//////////////PASAJERO///////////////

   module.exports = router;



   