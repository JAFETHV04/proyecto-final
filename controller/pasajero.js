const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardarpasajero = (req, res)=>{
    const idpasajero = req.body.idpasajero;
    const nombre = req.body.nombre;
    const apaterno = req.body.apaterno;
    const amaterno = req.body.amaterno;
    const tipo_documento = req.body.tipo_documento;
    const num_documento = req.body.num_documento ;
    const fecha_naciemiento = req.body.fecha_naciemiento;
    const idpais= req.body.idpais;
    const teléfono = req.body.teléfono;
    const email = req.body.fecha_naciemiento;
    const clave = req.body.clave;
    conexion.query('INSERT INTO pasajero SET ?',{idpasajero:idpasajero, nombre:nombre,apaterno:apaterno,amaterno:amaterno,tipo_documento:tipo_documento,num_documento:num_documento,fecha_naciemiento:fecha_naciemiento,idpais:idpais,teléfono:teléfono,email:email,clave:clave}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/pasajero');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizapasajero = (req, res)=>{
    const idpasajero = req.body.idpasajero;
    const nombre = req.body.nombre;
    const apaterno = req.body.apaterno;
    const amaterno = req.body.amaterno;
    const tipo_documento = req.body.tipo_documento;
    const num_documento = req.body.num_documento ;
    const fecha_naciemiento = req.body.fecha_naciemiento;
    const idpais= req.body.idpais;
    const teléfono = req.body.teléfono;
    const email = req.body.fecha_naciemiento;
    const clave = req.body.clave;
    
    conexion.query('UPDATE pasajero SET ? WHERE idpasajero =?', [{nombre:nombre},idpasajero,apaterno,amaterno,tipo_documento,num_documento,fecha_naciemiento,idpais,teléfono,email,clave ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/pasajero');         
        }
});
};