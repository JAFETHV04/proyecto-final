const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardaravion = (req, res)=>{
    const idavion = req.body.idavion;
    const idaerolinea = req.body.idaerolinea;
    const fabricante = req.body.fabricante;
    const tipo = req.body.tipo;
    const capacidad = req.body.capacidad;
    conexion.query('INSERT INTO AVION SET ?',{idavion:idavion, idaerolinea:idaerolinea,fabricante:fabricante,tipo:tipo,capacidad:capacidad}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/avion');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizaavion = (req, res)=>{
    const idavion = req.body.idavion;
    const idaerolinea = req.body.idaerolinea;
    const fabricante = req.body.fabricante;
    const tipo = req.body.tipo;
    const capacidad = req.body.capacidad;
    
    conexion.query('UPDATE AVION SET ? WHERE idavion =?', [{fabricante:fabricante},idavion,idaerolinea,tipo,capacidad ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/avion');         
        }
});
};