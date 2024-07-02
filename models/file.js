const mongoose = require('mongoose')

const schema = mongoose.Schema

const fileSchema = new schema({
    name:{type:String},
    image:{type:String}
},{timeseries:true})


const fileModel = mongoose.model("images",fileSchema)

module.exports = fileModel