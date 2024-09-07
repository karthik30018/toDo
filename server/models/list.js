const mongoose = require('mongoose') 

const ListSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:true,   
        },
        body:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("ListSchema",ListSchema);