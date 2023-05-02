const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt')

const createUser = async(req, res = express.response) =>{

    const {email, password} = (req.body);

    try {

        let user = await User.findOne({email})


        if(user) {
            return res.status(400).json({
                ok: 'false',
                msg: 'Un usuario ya existe con ese correo, intenta otro'
            })
        }


        user = new User(req.body);

        // Encriptar contraseña
        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);



        await user.save();

        const token = await generateJWT(user.id, user.name);
    
    
        res.status(201).json({
            ok: true,
            msg: 'registered',
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        // daño interno = 500
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        
    }

};

const loginUser = async(req, res = express.response) =>{

    const {email, password} = (req.body)

    try {


        let user = await User.findOne({email})


        if(!user) {
            return res.status(400).json({
                ok: 'false',
                msg: 'El usuario no existe con ese email'
            })
        }

        // Comparar la contraseña que se ingresa con la de la base de datos encriptada
        const validPassword = bcrypt.compareSync(password, user.password);

        console.log(validPassword);

        if (!validPassword){
            return res.status(400).json({
                ok: 'false',
                msg: 'Contraseña incorrecta'
            })
        }

        // Crear el token para iniciar sesión en caso que las validaciones sean correctas
        const token = await generateJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            msg: 'login',
            uid: user.id, 
            name: user.name,
            token
        })


        
    } catch (error) {
        console.log(error)
        // daño interno = 500
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
        
    }



    

};

const checkoutRegister = async(req, res = express.response) =>{

    const uid = req.uid;
    const name = req.name;

    const token = await generateJWT(uid, name);


    // console.log('Se Requiere el /');
    res.json({
        ok: true,
        msg: 'reregister',
        uid,
        name,
        token

    })



}






module.exports = {
    createUser,
    loginUser,
    checkoutRegister

}