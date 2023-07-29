const express = require('express');
const router = express.Router();

const conexion = require('./database/bd');
////   ACCESO AL SISTEMA/////
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
router.get('/pais', (req, res)=>{     
    conexion.query('select *from pais',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('../views/pais.ejs', {results:results});
          
        }   
    })
    

})


router.get('/crearpais', (req,res)=>{
    res.render('../views/crearpais');
})

router.get('/editarpais/:idpais', (req,res)=>{    
    const cpais = req.params.cpais;
    conexion.query('select  *from paises WHERE idpais=?',[idpais] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('../views/editarpais', {pais:results[0]});            
        }        
    });
});


router.get('/deletepais/:idpais', (req, res) => {
    const cpais = req.params.cpais;
    conexion.query('DELETE FROM pais WHERE idpais = ?',[idpais], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/pais');         
        }
    })
});


router.get('/get_pais', function(request, response, next){

    var buscar_query = request.query.buscar_query;

    var query = `
    SELECT pais FROM pais 
    WHERE pais LIKE '%${buscar_query}%' 
    LIMIT 2 `;

    conexion.query(query, function(error, data){

        response.json(data);

    });

});


const paises = require('./controller/pais');
router.post('/guardarpais', paises.guardarpais);
router.post('/actualizapais', paises.actualizapais);
  
//////////////PASAJERO///////////////
router.get('/', (req, res)=>{ 
    res.render('home.ejs'); 
   })

   router.get('/get_pasajero', function(request, response, next){
    var buscar_query = request.query.buscar_query;
    var query = `SELECT pasajero FROM pasajero WHERE pasajero LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, function(error, data){
    response.json(data);
    });
    });
router.get('/pasajero', (req, res)=>{     
    conexion.query('SELECT * FROM pasajero',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('../views/pasajero.ejs', {results:results});            
        }   
    })
    

})

router.get('/crearpasajero', (req,res)=>{
    res.render('../views/crearpasajero.ejs');
})

router.get('/deleteaeropuerto/:idpasajero', (req, res) => {
    const idaeropuerto = req.params.idaeropuerto;
    conexion.query('DELETE FROM pasajero WHERE idpasajero = ?',[idpasajero], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/pasajero');         
        }
    })
});

router.get('/editaraeropuerto/:idpasajero', (req,res)=>{    
    const idaeropuerto = req.params.idaeropuerto;
    conexion.query('SELECT * FROM pasajero WHERE idpasajero=?',[idapasajero] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('../views/editarpasajero.ejs', {pasajero:results[0]});            
        }        
    });
});

const pasajero = require('./controller/pasajero');
  router.post('/guardarpasajero', pasajero.guardarpasajero);
  router.post('/actualizapasajero', pasajero.actualizapasajero);

//////////////AEROPUERTO////////////
router.get('/', (req, res)=>{ 
    res.render('home.ejs'); 
   })

   router.get('/get_aeropuerto', function(request, response, next){
    var buscar_query = request.query.buscar_query;
    var query = `SELECT aeropuerto FROM aeropuerto WHERE aeropuerto LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, function(error, data){
    response.json(data);
    });
    });
router.get('/aeropuerto', (req, res)=>{     
    conexion.query('SELECT * FROM aeropuerto',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('../views/aeropuerto.ejs', {results:results});            
        }   
    })
    

})

router.get('/crearaeropuerto', (req,res)=>{
    res.render('../views/crearaeropuerto.ejs');
})

router.get('/deleteaeropuerto/:idaeropuerto', (req, res) => {
    const idaeropuerto = req.params.idaeropuerto;
    conexion.query('DELETE FROM aeropuerto WHERE idaeropuerto = ?',[idaeropuerto], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/aeropuerto');         
        }
    })
});

router.get('/editaraeropuerto/:idaeropuerto', (req,res)=>{    
    const idaeropuerto = req.params.idaeropuerto;
    conexion.query('SELECT * FROM aeropuerto WHERE idaeropuerto=?',[idaeropuerto] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('../views/editaraeropuerto.ejs', {aeropuerto:results[0]});            
        }        
    });
});

const aeropuerto = require('./controller/aeropuerto');
  router.post('/guardaraeropuerto', aeropuerto.guardaraeropuerto);
  router.post('/actualizaaeropuerto', aeropuerto.actualizaaeropuerto);
  
//////////ASIENTO////////
router.get('/get_asiento', (req, res) => {
  var buscar_query = req.query.buscar_query;
  var query = `SELECT asiento FROM asiento WHERE asiento LIKE '%${buscar_query}%'
  LIMIT 1 `;
  conexion.query(query, (error, data) => {
    res.json(data);
  });
});

router.get('/asiento', (req, res) => {
  conexion.query('SELECT * FROM asiento', (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('../views/asiento.ejs', { results: results });
    }
  });
});

router.get('/crearasiento', (req, res) => {
  res.render('../views/crearasiento.ejs');
});

router.get('/deleteasiento/:idasiento', (req, res) => {
  const idasiento = req.params.idasiento;
  conexion.query('DELETE FROM asiento WHERE idasiento = ?', [idasiento], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/asiento');
    }
  });
});

router.get('/editarasiento/:idasiento', (req, res) => {
  const idasiento = req.params.idasiento;
  conexion.query('SELECT * FROM asiento WHERE idasiento=?', [idasiento], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('../views/editarasiento.ejs', { asiento: results[0] });
    }
  });
});

const asiento = require('./controller/asiento');
  router.post('/guardarasiento', asiento.guardarasiento);
  router.post('/actualizaasiento', asiento.actualizaasiento);


module.exports = router;