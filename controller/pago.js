const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardarpago = (req, res)=>{
    const idpago = req.body.idpago;
    const idreserva = req.body.idreserva;
    const fecha = req.body.fecha;
    const idpasajero = req.body.idpasajero;
    const monto = req.body.monto;
    const tipo_comprobante = req.body.tipo_comprobante;
    const num_comprobante = req.body.num_comprobante;
    const impuesto = req.body.impuesto;
    conexion.query('INSERT INTO PAGO SET ?',{idpago:idpago, idreserva:idreserva,fecha:fecha,idpasajero:idpasajero,monto:monto,tipo_comprobante:tipo_comprobante,num_comprobante:num_comprobante,impuesto:impuesto}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/pago');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizapago = (req, res)=>{
    const idavion = req.body.idavion;
    const idaerolinea = req.body.idaerolinea;
    const fabricante = req.body.fabricante;
    const tipo = req.body.tipo;
    const capacidad = req.body.capacidad;
    
    conexion.query('UPDATE PAGO SET ? WHERE idpago =?', [{idpago:idpago},idreserva,fecha,idpasajero,monto,tipo_comprobante,num_comprobante,impuesto ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/pago');         
        }
});
};