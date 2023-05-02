const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject)=>{
        
        const payload = {uid, name};

        // Los JWT (Json Web Token) se tienen que firmar, hay que enviarle 
        // el payload, la secret key la cual creamos como variable de entorno, y aunque es opcional, 
        // hay que enviarle el tiempo de expiración

        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '2h'
        }, (err, token)=>{

            if(err){
                console.log(err);
                // No mandamos el error para no compremeter posible información sensible del 
                // servidor que pueda llegar en el mismo. 
                reject('No se pudo general el token');
            }

            resolve(token);

        });

    }) 
     


}


module.exports ={
    generateJWT
}