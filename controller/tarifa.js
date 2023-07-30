const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardartarifa = (req, res)=>{
    const idtarifa = req.body.idtarifa;
    const clase = req.body.clase;
    const precio = req.body.precio;
    const impuesto = req.body.impuesto;
    
    conexion.query('INSERT INTO TARIFA SET ?',{idtarifa:idtarifa, clase:clase,precio:precio,impuesto:impuesto}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/TARIFA');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizatarifa = (req, res)=>{
    const idtarifa = req.body.idtarifa;
    const clase = req.body.clase;
    const precio = req.body.precio;
    const impuesto = req.body.impuesto;
    
    
    conexion.query('UPDATE TARIFA SET ? WHERE idtarifa =?', [{clase:clase,precio:precio,impuesto:impuesto},idtarifa ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/TARIFA');         
        }
});
};