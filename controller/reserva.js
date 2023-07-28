const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardarreserva = (req, res)=>{
    const idreserva = req.body.idreserva;
    const costo = req.body.costo;
    const fecha = req.body.fecha;
    const observacion = req.body.observacion;
    
    conexion.query('INSERT INTO RESERVA SET ?',{idreserva:idreserva, costo:costo,fecha:fecha,observacion:observacion}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/reserva');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizareserva = (req, res)=>{
    const idreserva = req.body.idreserva;
    const costo = req.body.costo;
    const fecha = req.body.fecha;
    const observacion = req.body.observacion;
    
    
    conexion.query('UPDATE RESERVA SET ? WHERE idreserva =?', [{idreserva:idreserva},costo,fecha,observacion ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/reserva');         
        }
});
};