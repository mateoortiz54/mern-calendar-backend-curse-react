/* 
    Event Routes
    /api/events

*/


const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();


const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    getEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento

} = require('../controllers/events');

const {fieldsValidator} = require('../middlewares/fieldsValidator');
const { isDate } = require('../helpers/isDate');

// Todas tiene que pasar por la validación del JWT
// Obtener eventos


// Con esto le decimos que antes de cualquier ruta o acción deberá ingresar a la función
// Esto se puede ya que en cada función le estabamos enviando la función como middleware
router.use(validarJWT);


// Obtener
router.get(
    '/', getEventos
)

// Crear
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de fin es obligatoria').custom( isDate ),
        fieldsValidator,
    ],
    crearEvento
)


// Actualizar
router.put('/:id', actualizarEvento)


// Eliminar
router.delete('/:id', eliminarEvento)


module.exports = router