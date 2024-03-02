const mongoose = require("mongoose");

const addres = new mongoose.Schema({
    houseNo : {
        type: String,
        required:true
    },
    street: {
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type: Number,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
})

const apidata = new mongoose.model("addres", addres);

module.exports = apidata;