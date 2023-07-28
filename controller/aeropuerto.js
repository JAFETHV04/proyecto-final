const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardaraeropuerto = (req, res)=>{
    const idaeropuerto = req.body.idaeropuesto;
    const nombre = req.body.nombre;
    const idpais = req.body.idpais;
    
    conexion.query('INSERT INTO AEROPUERTO SET ?',{idaeropuerto:idaeropuerto, nombre:nombre,idpais:idpais}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/aeropuerto');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizaaeropuerto = (req, res)=>{
    const idaeropuerto = req.body.idaeropuesto;
    const nombre = req.body.nombre;
    const idpais = req.body.idpais;
    
    
    conexion.query('UPDATE AEROPUERTO SET ? WHERE idaeropuerto =?', [{nombre:nombre},idaeropuesto,idpais ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/aeropuerto');         
        }
});
};