const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // x-token headers

    const token = req.header('x-token');
    console.log('Este es ek token');
    console.log(token);

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }
    try {
            
        const payload = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED    
        );

        // console.log(payload);

        req.uid = payload.uid;
        req.name = payload.name;
        


    } catch (error) {
        
        return res.status(400).json({
            ok: false,
            msg: 'Tiempo de permanencia sobrepasado, ingrese de nuevo'
        })   

    }


    next();


}

module.exports = {
    validarJWT
}