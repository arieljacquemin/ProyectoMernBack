const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const ipVersion = process.env.IP_SERVER;


const port = 3977;

const connectDB = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`);
        app.listen(port, () => {
            console.log('================================')
            console.log('============= API ==============')
            console.log('================================')
            console.log(`http://${ipVersion}:${port}/api/v1/`);
        })
    } catch (error) {
        console.log('Error al conectar a la base de datos', error);
    }
}
connectDB();