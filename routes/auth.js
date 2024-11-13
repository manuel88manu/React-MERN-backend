/*
    Rutas de Usuarios / Auth
    host + /api/auth    
*/

const { Router }= require('express')
const {check}=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const router=Router()
const {crearUsuario,loginUsuario,revalidarToken}=require('../controllers/auth')
const {validarJWT}=require('../middlewares/validar-jwt')

router.post('/new',
    [   // middlewares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ]
    ,crearUsuario )

router.post('/',
    [
        //middlewere
      check('email','El email debe de ser obligatorio').isEmail(),
      check('password','La contraseña debe de ser obligatoria').isLength({min:6}),
      validarCampos  
    ]
    ,loginUsuario)

router.get('/renew',validarJWT, revalidarToken)


module.exports=router