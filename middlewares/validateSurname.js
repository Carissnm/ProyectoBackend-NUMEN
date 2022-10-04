const { Member } = require('../models/member');
// Middleware creado para validar la búsqueda de miembros por apellido
const validateSurname = async (req, res, next) => {
    const member = await Member.findOne(req.params);
    if(member !== null) {
        next()
    } else {
        res.status(500).json({msg: 'No se encontró un socio con ese apellido.'});
    }
}


module.exports = { validateSurname }