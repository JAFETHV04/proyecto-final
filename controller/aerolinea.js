const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardaraerolinea = (req, res)=>{
    const idaerolinea = req.body.idaerolinea;
    const ruc = req.body.ruc;
    const nombre = req.body.nombre;
    
    
    conexion.query('INSERT INTO AEROLINEA SET ?',{idaerolinea:idaerolinea, ruc:ruc,nombre:nombre}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/AEROLINEA');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizaaerolinea = (req, res)=>{
    const idaerolinea = req.body.idaerolinea;
    const ruc = req.body.ruc;
    const nombre = req.body.nombre;
    
    
    conexion.query('UPDATE AEROLINEA SET ? WHERE idaerolinea =?', [{nombre:nombre, ruc:ruc},idaerolinea ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/AEROLINEA');         
        }
});
};