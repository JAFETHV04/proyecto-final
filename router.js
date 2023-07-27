const express = require('express');
const router = express.Router();

const conexion = require('./database/bd');

router.get('/', (req, res)=>{ 
    res.render('home.ejs'); 
   })
   router.get('/pais', (req, res)=>{ 
    res.render('pais.ejs'); 
   })

   module.exports = router;