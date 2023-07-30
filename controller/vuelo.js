const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardarvuelo = (req, res)=>{
    const idasiento = req.body.idasiento;
    const idaeropuerto = req.body.idaeropuerto;
    const idreserva = req.body.idreserva;
    const idavion = req.body.idavion;
    const idtarifa = req.body.idtarifa;
    
    conexion.query('INSERT INTO VUELO SET ?',{idasiento:idasiento, idaeropuerto:idaeropuerto,idreserva:idreserva,idavion:idavion,idtarifa:idtarifa}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/VUELO');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizarvuelo = (req, res)=>{
    const idasiento = req.body.idasiento;
    const idaeropuerto = req.body.idaeropuerto;
    const idreserva = req.body.idreserva;
    const idavion = req.body.idavion;
    const idtarifa = req.body.idtarifa;
    
    
    conexion.query('UPDATE VUELO SET ? WHERE idasiento =?', [{idasiento:idasiento,idaeropuerto:idaeropuerto,idreserva:idreserva,idavion:idavion,idtarifa:idtarifa}, ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/VUELO');         
        }
});
};