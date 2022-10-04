const express = require('express');
const router = express.Router();
const { memberCheck, getAllMembers, getMember, createMember, getMemberById, updateMember, deleteMember, ejemploPass, consultaAxios } = require('../controllers/members.controller');
const { check } = require('express-validator');
const { validateId } = require('../middlewares/validateId');
const { validateSurname } = require('../middlewares/validateSurname');


router.get('/', memberCheck);
router.get('/ver', getAllMembers);
router.get('/ver/:id', validateId , getMemberById);
router.get('/buscar/:surname',validateSurname, getMember);
router.get('/pass', ejemploPass);
router.get('/axios', consultaAxios);


router.post('/crear',[
    check('name').not().isEmpty().withMessage('Debe ingresar un nombre'),
    check('surname').not().isEmpty().withMessage('Debe ingresar un apellido'),
    check('dni').not().isEmpty().withMessage('Debe ingresar un dni').isLength({min:6, max:8}).withMessage('DNI inválido'),
    check('gender').not().isEmpty().withMessage('Debe ingresar un género'),
    check('email').not().isEmpty().withMessage('Debe ingresar un correo electrónico').isEmail().withMessage('Ingrese un correo electrónico válido'),
    check('debt').not().isEmpty().withMessage('Debe ingresar el estado de la cuenta')
], createMember);

router.put('/update/:id',validateId, [
    check('name').not().isEmpty().withMessage('Debe ingresar un nombre'),
    check('surname').not().isEmpty().withMessage('Debe ingresar un apellido'),
    check('dni').not().isEmpty().withMessage('Debe ingresar un dni').isLength({min:6, max:8}).withMessage('DNI inválido'),
    check('gender').not().isEmpty().withMessage('Debe ingresar un género'),
    check('email').not().isEmpty().withMessage('Debe ingresar un correo electrónico').isEmail().withMessage('Ingrese un correo electrónico válido'),
    check('debt').not().isEmpty().withMessage('Debe ingresar el estado de la cuenta')
], updateMember);

router.delete('/delete/:id', validateId, deleteMember);


module.exports = router;