const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardaraerolinea = (req, res)=>{
    const idaerolinea = req.body.idaerolinea;
    const ruc = req.body.ruc;
    const nombre = req.body.nombre;
    
    
    conexion.query('INSERT INTO aerolinea SET ?',{idaerolinea:idaerolinea, ruc:ruc,nombre:nombre}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/aerolinea');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizaaerolinea = (req, res)=>{
    const idaerolinea = req.body.idaerolinea;
    const ruc = req.body.ruc;
    const nombre = req.body.nombre;
    
    
    conexion.query('UPDATE aerolinea SET ? WHERE idaerolinea =?', [{nombre:nombre},idaerolinea,ruc ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/aerolinea');         
        }
});
};