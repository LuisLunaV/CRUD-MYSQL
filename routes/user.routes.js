const { Router } = require('express');
const { check } = require('express-validator');

const usuarios = require('../controllers/user.controller');

const { usuarioExistePorID, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuarios.userGet );

router.get('/:id',[
    check('id', 'No es un ID valido').isInt(),
    check('id').custom(usuarioExistePorID),
    validarCampos
]
, usuarios.userGetId);

router.post('/', [
    check('user_password','El password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
    check('user_email').custom( emailExiste ),
    validarCampos
],usuarios.userPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isInt(),
    check('id').custom(usuarioExistePorID),
    validarCampos
],usuarios.userPut);

router.delete('/:id', usuarios.userDelet);

module.exports = router;