const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://Dipen1234:jVP8pyAv3s3NzEM3@cluster0.dkmbl.mongodb.net/iNotebook"

const connectToMongo = () => {
    mongoose.connect(mongoURI, {useNewUrlParser:true})
    .then(() => {
        console.log("Connected to MongoDb Sucessfully");
    })
    .catch((err)=>console.log(err.message))
}

module.exports = connectToMongo;