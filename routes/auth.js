/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const {Router}  = require('express');
const {check} = require('express-validator')
const router = Router();

const {createUser, checkoutRegister, loginUser} = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { validarJWT } = require('../middlewares/validar-jwt');



router.get('/get', (req, res) =>{

    console.log('Se Requiere el /');
    res.json({
        'ok': true,
        'msg': 'get'
    })

});

// colección de middleware = []

router.post(
    '/register',
    [// middleware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        fieldsValidator
    ],  
    createUser
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'Password must contain 6 character').isLength({min: 6}),
        fieldsValidator

    ],
    loginUser
);


router.get('/reregister', validarJWT, checkoutRegister);


module.exports = router;