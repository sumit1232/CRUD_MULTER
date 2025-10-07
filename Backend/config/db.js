const mongoose = require('mongoose');
const Connection = async()=>{
    try {
        mongoose.connect(`mongodb+srv://sumitjadav2525:M2ltzo4T9sBppWZt@curd-multer.ko9arw8.mongodb.net/?retryWrites=true&w=majority&appName=CURD-Multer`);
        console.log('Database Connection Success...');
    } catch (error) {
        console.log('Database Connection Failed !!!!');
    }
}

module.exports = Connection;