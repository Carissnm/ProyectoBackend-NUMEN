const { Member } = require('../models/member');

const validateId = async (req, res, next) => {
    const member = await Member.findById(req.params.id);
    if(member !== null) {
        next()
    } else {
        res.status(500).json({msg: 'El id no es válido.'});
    }
}


module.exports = { validateId }