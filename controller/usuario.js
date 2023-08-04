const conexion = require('../database/bd');

//GUARDAR un REGISTRO
exports.guardaru = (req, res)=>{
    const iduser = req.body.iduser;
    const nombre = req.body.nombre;
    const usuarios = req.body.usuarios;
    const contraseña = req.body.contraseña;

   
    conexion.query('INSERT INTO usuario SET ?',{iduser:iduser, nombre:nombre,usuarios:usuarios,contraseña:contraseña}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/usuario');         
        }
});
};

//ACTUALIZAR un REGISTRO
exports.actualizau = (req, res)=>{
    const iduser = req.body.iduser;
    const nombre = req.body.nombre;
    const usuarios = req.body.usuarios;
    const contraseña = req.body.contraseña;
    
    conexion.query('UPDATE usuario SET ? WHERE iduser =?', [{nombre:nombre,usuarios:usuarios,contraseña:contraseña},iduser ], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/usuario');         
        }
});
};