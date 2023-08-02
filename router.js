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
router.get('/PAIS', (req, res)=>{     
    conexion.query('select *from PAIS',(error, results)=>{
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

router.get('/editarpais/:idpais', (req,res)=>{    
    const idpais = req.params.idpais;
    conexion.query('select  *from PAIS WHERE idpais=?',[idpais] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('../views/editarpais.ejs', {PAIS:results[0]});            
        }        
    });
});


router.get('/deletepais/:idpais', (req, res) => {
    const idpais = req.params.idpais;
    conexion.query('DELETE FROM PAIS WHERE idpais = ?',[idpais], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/PAIS');         
        }
    })
});


router.get('/get_pais', function(request, response, next){

    var buscar_query = request.query.buscar_query;

    var query = `
    SELECT pais FROM PAIS 
    WHERE PAIS LIKE '%${buscar_query}%' 
    LIMIT 2 `;

    conexion.query(query, function(error, data){

        response.json(data);

    });

});


const PAIS = require('./controller/pais');
router.post('/guardarpais', PAIS.guardarpais);
router.post('/actualizapais', PAIS.actualizapais);
  
//////////////PASAJERO///////////////
router.get('/', (req, res)=>{ 
    res.render('home.ejs'); 
   })

   router.get('/get_PASAJERO', function(request, response, next){
    var buscar_query = request.query.buscar_query;
    var query = `SELECT PASAJERO FROM PASAJERO WHERE PASAJERO LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, function(error, data){
    response.json(data);
    });
    });
router.get('/PASAJERO', (req, res)=>{     
    conexion.query('SELECT * FROM PASAJERO',(error, results)=>{
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

router.get('/deletepasajero/:idpasajero', (req, res) => {
    const idpasajero = req.params.idpasajero;
    conexion.query('DELETE FROM PASAJERO WHERE idpasajero = ?',[idpasajero], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/PASAJERO');         
        }
    })
});

router.get('/editarpasajero/:idpasajero', (req,res)=>{    
    const idpasajero = req.params.idpasajero;
    conexion.query('SELECT * FROM PASAJERO WHERE idpasajero=?',[idpasajero] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('../views/editarpasajero.ejs', {PASAJERO:results[0]});            
        }        
    });
});

const PASAJERO = require('./controller/pasajero');
  router.post('/guardarpasajero', PASAJERO.guardarpasajero);
  router.post('/actualizapasajero', PASAJERO.actualizapasajero);

//////////////AEROPUERTO////////////
router.get('/', (req, res)=>{ 
    res.render('home.ejs'); 
   })

   router.get('/get_AEROPUERTO', function(request, response, next){
    var buscar_query = request.query.buscar_query;
    var query = `SELECT AEROPUERTO FROM AEROPUERTO WHERE AEROPUERTO LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, function(error, data){
    response.json(data);
    });
    });
router.get('/AEROPUERTO', (req, res)=>{     
    conexion.query('SELECT * FROM AEROPUERTO',(error, results)=>{
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
    conexion.query('DELETE FROM AEROPUERTO WHERE idaeropuerto = ?',[idaeropuerto], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/AEROPUERTO');         
        }
    })
});

router.get('/editaraeropuerto/:idaeropuerto', (req,res)=>{    
    const idaeropuerto = req.params.idaeropuerto;
    conexion.query('SELECT * FROM AEROPUERTO WHERE idaeropuerto=?',[idaeropuerto] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('../views/editaraeropuerto.ejs', {AEROPUERTO:results[0]});            
        }        
    });
});

const AEROPUERTO = require('./controller/aeropuerto');
  router.post('/guardaraa', AEROPUERTO.guardara);
  router.post('/actualizaa', AEROPUERTO.actualizaa);
  
//////////ASIENTO////////
router.get('/get_ASIENTO', (req, res) => {
  var buscar_query = req.query.buscar_query;
  var query = `SELECT ASIENTO FROM ASIENTO WHERE ASIENTO LIKE '%${buscar_query}%'
  LIMIT 1 `;
  conexion.query(query, (error, data) => {
    res.json(data);
  });
});

router.get('/ASIENTO', (req, res) => {
  conexion.query('SELECT * FROM ASIENTO', (error, results) => {
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
  conexion.query('DELETE FROM ASIENTO WHERE idasiento = ?', [idasiento], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/ASIENTO');
    }
  });
});

router.get('/editarasiento/:idasiento', (req, res) => {
  const idasiento = req.params.idasiento;
  conexion.query('SELECT * FROM ASIENTO WHERE idasiento=?', [idasiento], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('../views/editarasiento.ejs', {ASIENTO: results[0] });
    }
  });
});

const ASIENTO = require('./controller/asiento');
  router.post('/guardarasiento', ASIENTO.guardarasiento);
  router.post('/actualizaasiento', ASIENTO.actualizaasiento);

////////////AEROLINEA//////
router.get('/get_AEROLINEA', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT AEROLINEA FROM AEROLINEA WHERE AEROLINEA LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });

  router.get('/AEROLINEA', (req, res) => {
    conexion.query('SELECT * FROM AEROLINEA', (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/aerolinea.ejs', { results: results });
      }
    });
  });
  
  router.get('/crearaerolinea', (req, res) => {
    res.render('../views/crearaerolinea.ejs');
  });
  
  router.get('/deleteaerolinea/:idaerolinea', (req, res) => {
    const idaerolinea = req.params.idaerolinea;
    conexion.query('DELETE FROM AEROLINEA WHERE idaerolinea = ?', [idaerolinea], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/AEROLINEA');
      }
    });
  });
  
  router.get('/editaraerolinea/:idaerolinea', (req, res) => {
    const idaerolinea = req.params.idaerolinea;
    conexion.query('SELECT * FROM AEROLINEA WHERE idaerolinea=?', [idaerolinea], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editaraerolinea.ejs', {AEROLINEA: results[0] });
      }
    });
  });
  const AEROLINEA = require('./controller/aerolinea');
  router.post('/guardaraerolinea', AEROLINEA.guardaraerolinea);
  router.post('/actualizaaerolinea', AEROLINEA.actualizaaerolinea);

  /////AVION//////
  router.get('/get_AVION', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT AVION FROM AVION WHERE AVION LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/AVION', (req, res) => {
    conexion.query('SELECT * FROM AVION', (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/avion.ejs', { results: results });
      }
    });
  });
  
  router.get('/crearavion', (req, res) => {
    res.render('../views/crearavion.ejs');
  });
  
  router.get('/deleteavion/:idavion', (req, res) => {
    const idavion = req.params.idavion;
    conexion.query('DELETE FROM AVION WHERE idavion = ?', [idavion], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/AVION');
      }
    });
  });
  
  router.get('/editaravion/:idavion', (req, res) => {
    const idavion = req.params.idavion;
    conexion.query('SELECT * FROM AVION WHERE idavion=?', [idavion], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editaravion.ejs', {AVION: results[0] });
      }
    });
  });
  
  const AVION = require('./controller/avion');
  router.post('/guardaravion', AVION.guardaravion);
  router.post('/actualizaavion', AVION.actualizaavion);
  
  //////////PAGO//////////////
  router.get('/get_PAGO', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT PAGO FROM PAGO WHERE PAGO LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/PAGO', (req, res) => {
    conexion.query('SELECT * FROM PAGO', (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/pago.ejs', { results: results });
      }
    });
  });
  
  router.get('/crearpago', (req, res) => {
    res.render('../views/crearpago.ejs');
  });
  
  router.get('/deletepago/:idpago', (req, res) => {
    const idpago = req.params.idpago;
    conexion.query('DELETE FROM PAGO WHERE idpago = ?', [idpago], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/PAGO');
      }
    });
  });
  
  router.get('/editarpago/:idpago', (req, res) => {
    const idpago = req.params.idpago;
    conexion.query('SELECT * FROM PAGO WHERE idpago=?', [idpago], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editarpago.ejs', {PAGO: results[0] });
      }
    });
  });
  
  const PAGO = require('./controller/pago');
  router.post('/guardarpago', PAGO.guardarpago);
  router.post('/actualizapago', PAGO.actualizapago);

  //////////RESERVA////////////////////
  router.get('/get_RESERVA', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT RESERVA FROM RESERVA WHERE RESERVA LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/RESERVA', (req, res) => {
    conexion.query('SELECT * FROM RESERVA', (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/reserva.ejs', { results: results });
      }
    });
  });
  
  router.get('/crearreserva', (req, res) => {
    res.render('../views/crearreserva.ejs');
  });
  
  router.get('/deletereserva/:idreserva', (req, res) => {
    const idreserva = req.params.idreserva;
    conexion.query('DELETE FROM RESERVA WHERE idreserva = ?', [idreserva], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/RESERVA');
      }
    });
  });
  
  router.get('/editarreserva/:idreserva', (req, res) => {
    const idreserva = req.params.idreserva;
    conexion.query('SELECT * FROM RESERVA WHERE idreserva=?', [idreserva], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editarreserva.ejs', {RESERVA: results[0] });
      }
    });
  });
  
  const RESERVA = require('./controller/reserva');
  router.post('/guardarreserva', RESERVA.guardarreserva);
  router.post('/actualizareserva', RESERVA.actualizareserva);

  ///////TARIFA///////////

  router.get('/get_TARIFA', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT TARIFA FROM TARIFA WHERE TARIFA LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/TARIFA', (req, res) => {
    conexion.query('SELECT * FROM TARIFA', (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/tarifa.ejs', { results: results });
      }
    });
  });
  
  router.get('/creartarifa', (req, res) => {
    res.render('../views/creartarifa.ejs');
  });
  
  router.get('/deletetarifa/:idtarifa', (req, res) => {
    const idtarifa = req.params.idtarifa;
    conexion.query('DELETE FROM TARIFA WHERE idtarifa = ?', [idtarifa], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/TARIFA');
      }
    });
  });
  
  router.get('/editartarifa/:idtarifa', (req, res) => {
    const idtarifa = req.params.idtarifa;
    conexion.query('SELECT * FROM TARIFA WHERE idtarifa=?', [idtarifa], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editartarifa.ejs', {TARIFA: results[0] });
      }
    });
  });
  
  const TARIFA = require('./controller/tarifa');
  router.post('/guardartarifa', TARIFA.guardartarifa);
  router.post('/actualizatarifa', TARIFA.actualizatarifa);

  ///////////////VUELO///////////
  router.get('/get_VUELO', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT VUELO FROM VUELO WHERE VUELO LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/VUELO', (req, res) => {
    conexion.query('SELECT * FROM VUELO', (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/vuelo.ejs', { results: results });
      }
    });
  });
  
  router.get('/crearvuelo', (req, res) => {
    res.render('../views/crearvuelo.ejs');
  });
  
  router.get('/deletevuelo/:idasiento', (req, res) => {
    const idasiento = req.params.idasiento;
    conexion.query('DELETE FROM VUELO WHERE idasiento = ?', [idasiento], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/VUELO');
      }
    });
  });
  
  router.get('/editarvuelo/:idasiento', (req, res) => {
    const idasiento = req.params.idasiento;
    conexion.query('SELECT * FROM VUELO WHERE idasiento=?', [idasiento], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editarvuelo.ejs', {VUELO: results[0] });
      }
    });
  });
  
  const VUELO = require('./controller/vuelo');
  router.post('/guardarvuelo', VUELO.guardarvuelo);
  router.post('/actualizarvuelo', VUELO.actualizarvuelo);
  
module.exports = router;