const mongoose = require('mongoose');
require('dotenv').config();

const connectDataBase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log('BBDD conectada exitosamente.');
    } catch {
        console.log('Error al conectarse a la BBDD');
    }
}

module.exports = {
    connectDataBase
}