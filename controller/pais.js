const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardarpais = (req, res)=>{
    const idpais = req.body.idpais;
    const nombre = req.body.nombre;
   
    conexion.query('INSERT INTO PAIS SET ?',{idpais:idpais, nombre:nombre}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/pais');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizapais = (req, res)=>{
    const idpais = req.body.idpais;
    const nombre = req.body.nombre;
    
    conexion.query('UPDATE PAIS SET ? WHERE idpais =?', [{nombre:nombre},idpais ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/pais');         
        }
});
};