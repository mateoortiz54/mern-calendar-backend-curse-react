const mongoose = require('mongoose');

const dbconection = async() =>{

    try {
        
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');

    } catch (error) {
        console.log(error)
        throw new Error('Error')
    }

}

module.exports = {
    dbconection

}