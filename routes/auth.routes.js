const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth.controler');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login',[
    check('user_email','El correo es obligatorio').isEmail(),
    check('user_password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT,
], login );

module.exports = router;