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

router.get('/editarpasajero/:idpasajero', (req,res)=>{    
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

////////////AEROLINEA//////
router.get('/get_aerolinea', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT aerolinea FROM aerolinea WHERE aerolinea LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/aerolinea', (req, res) => {
    conexion.query('SELECT * FROM aerolinea', (error, results) => {
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
    conexion.query('DELETE FROM aerolinea WHERE idaerolinea = ?', [idaerolinea], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/aerolinea');
      }
    });
  });
  
  router.get('/editaraerolinea/:idaerolinea', (req, res) => {
    const idaerolinea = req.params.idaerolinea;
    conexion.query('SELECT * FROM aerolinea WHERE idaerolinea=?', [idaerolinea], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editaraerolinea.ejs', { aerolinea: results[0] });
      }
    });
  });
  const asiento = require('./controller/aerolinea');
  router.post('/guardaraerolinea', asiento.guardarasiento);
  router.post('/actualizaaerolinea', asiento.actualizaasiento);

  /////AVION//////
  router.get('/get_avion', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT avion FROM avion WHERE avion LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/avion', (req, res) => {
    conexion.query('SELECT * FROM avion', (error, results) => {
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
    conexion.query('DELETE FROM avion WHERE idavion = ?', [idavion], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/avion');
      }
    });
  });
  
  router.get('/editaravion/:idavion', (req, res) => {
    const idavion = req.params.idavion;
    conexion.query('SELECT * FROM avion WHERE idavion=?', [idavion], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editaravion.ejs', { avion: results[0] });
      }
    });
  });
  
  const avion = require('./controller/avion');
  router.post('/guardaravion', avion.guardaravion);
  router.post('/actualizaavion', avion.actualizaavion);
  
  //////////PAGO//////////////
  router.get('/get_pago', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT pago FROM pago WHERE pago LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/pago', (req, res) => {
    conexion.query('SELECT * FROM pago', (error, results) => {
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
    conexion.query('DELETE FROM pago WHERE idpago = ?', [idpago], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/pago');
      }
    });
  });
  
  router.get('/editarpago/:idpago', (req, res) => {
    const idpago = req.params.idpago;
    conexion.query('SELECT * FROM pago WHERE idpago=?', [idpago], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editarpago.ejs', { pago: results[0] });
      }
    });
  });
  
  const pago = require('./controller/pago');
  router.post('/guardarpago', pago.guardarpago);
  router.post('/actualizapago', pago.actualizapago);

  //////////RESERVA////////////////////
  router.get('/get_reserva', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT reserva FROM reserva WHERE reserva LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/reserva', (req, res) => {
    conexion.query('SELECT * FROM reserva', (error, results) => {
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
    conexion.query('DELETE FROM reserva WHERE idreserva = ?', [idreserva], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/reserva');
      }
    });
  });
  
  router.get('/editarreserva/:idreserva', (req, res) => {
    const idreserva = req.params.idreserva;
    conexion.query('SELECT * FROM reserva WHERE idreserva=?', [idreserva], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editarreserva.ejs', { reserva: results[0] });
      }
    });
  });
  
  const reserva = require('./controller/reserva');
  router.post('/guardarreserva', reserva.guardarreserva);
  router.post('/actualizareserva', reserva.actualizareserva);

  ///////TARIFA///////////

  router.get('/get_tarifa', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT tarifa FROM tarifa WHERE tarifa LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/tarifa', (req, res) => {
    conexion.query('SELECT * FROM tarifa', (error, results) => {
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
    conexion.query('DELETE FROM tarifa WHERE idtarifa = ?', [idtarifa], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/tarifa');
      }
    });
  });
  
  router.get('/editartarifa/:idtarifa', (req, res) => {
    const idtarifa = req.params.idtarifa;
    conexion.query('SELECT * FROM tarifa WHERE idtarifa=?', [idtarifa], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editartarifa.ejs', { tarifa: results[0] });
      }
    });
  });
  
  const tarifa = require('./controller/tarifa');
  router.post('/guardartarifa', tarifa.guardartarifa);
  router.post('/actualizatarifa', tarifa.actualizatarifa);

  ///////////////VUELO///////////
  router.get('/get_vuelo', (req, res) => {
    var buscar_query = req.query.buscar_query;
    var query = `SELECT vuelo FROM vuelo WHERE vuelo LIKE '%${buscar_query}%'
    LIMIT 1 `;
    conexion.query(query, (error, data) => {
      res.json(data);
    });
  });
  
  router.get('/vuelo', (req, res) => {
    conexion.query('SELECT * FROM vuelo', (error, results) => {
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
  
  router.get('/deletevuelo/:idvuelo', (req, res) => {
    const idvuelo = req.params.idvuelo;
    conexion.query('DELETE FROM vuelo WHERE idvuelo = ?', [idvuelo], (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/vuelo');
      }
    });
  });
  
  router.get('/editarvuelo/:idvuelo', (req, res) => {
    const idvuelo = req.params.idvuelo;
    conexion.query('SELECT * FROM vuelo WHERE idvuelo=?', [idvuelo], (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render('../views/editarvuelo.ejs', { vuelo: results[0] });
      }
    });
  });
  
  const vuelo = require('./controller/vuelo');
  router.post('/guardarvuelo', vuelo.guardarvuelo);
  router.post('/actualizarvuelo', vuelo.actualizarvuelo);
  
module.exports = router;