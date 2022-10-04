const { Member } = require('../models/member');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const memberCheck = (req, res) => {
    res.send('Backender\'s Athletic Club');
}

const getAllMembers = async (req, res) => {
    const member = await Member.find();
    res.status(200).json({member});
}

const getMember = async (req, res) => {
    const member = await Member.findOne({surname: req.params.surname});
    res.status(200).json({member});
}

const getMemberById = async (req, res) => {
    const member = await Member.findById(req.params.id);
    res.status(200).json({member});
}

const createMember = async (req, res) => {
    try {
        const err = validationResult(req)
        if(err.isEmpty()) {
            const member = new Member(req.body);
            await member.save();
            res.status(201).json({member});
        } else {
            res.status(501).json({err});
        }
        
    } catch (error) {
        res.status(501).json({error});
    }
    
}

const updateMember = async (req, res) => {
    try {
        const err = validationResult(req);
        if (err.isEmpty()) {
            await Member.findByIdAndUpdate(req.params.id, req.body);
            res.status(501).json({msg:"Actualización exitosa"})
        } else {
            res.status(501).json({err});
        }
    } catch (error) {
        res.status(501).json({error});
    }
}

const deleteMember = async (req, res) => {
    const member = await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({msg: 'Miembro eliminado exitosamente'})
}

const ejemploPass = async (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.pass, salt);
    let comparison = bcrypt.compareSync(req.body.pass, hash)
    let comparison2 = bcrypt.compareSync("a23497sdf", hash)
    res.json({hash, comparison, comparison2})
}

// Objeto para conectar a la API del clima con la ubicación de Bs As en parámetros latitud y longitud
const options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    params: {lat: '-34.603722', lon: '-58.381592'},
    headers: {
        'X-RapidAPI-Key': 'a6f134be2emsh99cd0edd8c3ac2ap14d5c0jsn12c993266b0c',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
};

// Consulta a la API del clima modificada de la brindada por el docente para poder conectar como lo requiere la API.
const consultaAxios = async (req, res) => {
    try {
        const answer = await axios.request(options);
        res.status(200).json({data: answer.data, status: answer.status});
    } catch (error) {
        res.json({status: error.response.status, data: error.response.data})
    }
}

module.exports = {
    memberCheck,
    getAllMembers,
    getMember,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    ejemploPass,
    consultaAxios
}