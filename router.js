const express = require('express');
const router = express.Router();

const conexion = require('./database/bd');
//////PAIS////////////
router.get('/', (req, res)=>{ 
    res.render('home.ejs'); 
   })

   router.get('/get_PAIS', function(request, response, next){
    var buscar_query = request.query.buscar_query;
    var query = `
    SELECT PAIS FROM PAIS WHERE PAIS LIKE '%${buscar_query}%'
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
    const idpais = req.params.idpais;
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
  router.post('/guardara', AEROPUERTO.guardara);
  router.post('/actualizaa', AEROPUERTO.actualizaa);
  

   module.exports = router;