const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardarreserva = (req, res)=>{
    const idreserva = req.body.idreserva;
    const costo = req.body.costo;
    const fecha = req.body.fecha;
    const observacion = req.body.observacion;
    
    conexion.query('INSERT INTO reserva SET ?',{idreserva:idreserva, costo:costo,fecha:fecha,observacion:observacion}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/RESERVA');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizareserva = (req, res)=>{
    const idreserva = req.body.idreserva;
    const costo = req.body.costo;
    const fecha = req.body.fecha;
    const observacion = req.body.observacion;
    
    
    conexion.query('UPDATE RESERVA SET ? WHERE idreserva =?', [{costo:costo,fecha:fecha,observacion:observacion},idreserva], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/RESERVA');         
        }
});
};