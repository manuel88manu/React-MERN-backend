/*
    Event Routes
    /api/events
 */
const {getEventos,crearEvento,eliminarEvento,actualizarEvento}=require('../controllers/events')

const{Router}=require('express')
const{check}=require('express-validator')
const {validarJWT}=require('../middlewares/validar-jwt')
const {validarCampos}=require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')
const router = Router()
// Todas tienes que pasar por la validacion del JWT

router.use(validarJWT)
// Obtener eventos
router.get('/',getEventos);

//Crear un evento
router.post('/',
                 [
                    check('title','El titulo es obligatorio').not().isEmpty(),
                    check('start','Fecha de inicio es obligatorio').custom(isDate),
                    check('end','Fecha de finalizacion es obligatorio').custom(isDate),
                    validarCampos
                 ],
                 crearEvento)

//Actualizar Evento
router.put('/:id',actualizarEvento)

//Borrar evento
router.delete('/:id',eliminarEvento)

module.exports=router 