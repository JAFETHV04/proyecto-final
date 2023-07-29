const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardartarifa = (req, res)=>{
    const idtarifa = req.body.idtarifa;
    const clase = req.body.letra;
    const precio = req.body.precio;
    const impuesto = req.body.impuesto;
    
    conexion.query('INSERT INTO tarifa SET ?',{idtarifa:idtarifa, letra:letra,precio:precio,impuesto:impuesto}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/tarifa');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizatarifa = (req, res)=>{
    const idtarifa = req.body.idtarifa;
    const clase = req.body.letra;
    const precio = req.body.precio;
    const impuesto = req.body.impuesto;
    
    
    conexion.query('UPDATE tarifa SET ? WHERE idtarifa =?', [{idtarifa:idtarifa},letra,precio,impuesto ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/tarifa');         
        }
});
};