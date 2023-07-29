const conexion = require('../database/bd');

exports.guardara = (req, res)=>{
    const idaeropuerto = req.body.idaeropuerto;
    const nombre = req.body.nombre;
    const idpais = req.body.idpais;
   
    conexion.query('INSERT INTO aeropuerto SET ?',{idaeropuerto:idaeropuerto, nombre:nombre,idpais:idpais}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/aeropuerto');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizaa = (req, res)=>{
    const idaeropuerto = req.body.idaeropuerto;
    const nombre = req.body.nombre;
    const idpais = req.body.idpais;
    
    conexion.query('UPDATE aeropuerto SET ? WHERE idaeropuerto =?', [{nombre:nombre,idpais:idpais},idaeropuerto ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/aeropuerto');         
        }
});
};