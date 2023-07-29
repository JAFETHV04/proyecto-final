const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardarasiento = (req, res)=>{
    const idasiento = req.body.idasiento;
    const letra = req.body.letra;
    const fila = req.body.fila;
    
    
    conexion.query('INSERT INTO asiento SET ?',{idasiento:idasiento, letra:letra,fila:fila}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/asiento');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizaasiento = (req, res)=>{
    const idasiento = req.body.idasiento;
    const letra = req.body.letra;
    const fila = req.body.fila;
    
    
    conexion.query('UPDATE asiento SET ? WHERE idasiento =?', [{idasiento:idasiento},letra,fila ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/asiento');         
        }
});
};