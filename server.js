const express = require("express");
require('./connect');
const apidata = require("./schema/api");

const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors())


app.get("/", (req, res)=>{
    res.send("Address Website Server")
});



app.post("/saveaddress", async (req, res) => {
    try {
        // Check if address data already exists in the database
        const existingAddress = await apidata.findOne({
            $and: [
                { houseNo: { $regex: new RegExp(req.body.houseNo, 'i') } },
                { street: { $regex: new RegExp(req.body.street, 'i') } },
                { city: { $regex: new RegExp(req.body.city, 'i') } },
                { state: { $regex: new RegExp(req.body.state, 'i') } },
                {pincode: req.body.pincode},
            ]
        });
        

        if (existingAddress) {
            return res.status(400).json({ message: "Address already exists in the database" });
        } else {
            const newAddress = new apidata(req.body);
            await newAddress.save();
            return res.status(200).json({ message: "Address saved successfully" });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

app.patch('/updateaddress', async(req, res) => {
    const addressId = req.headers['address-id'];
        try{
            const updatedAddress = await apidata.findByIdAndUpdate(addressId, req.body, { new: true });
            res.json('Address Updated Successfully').status(200);
        }catch(err){
            res.json(err).status(404);
        }
})

app.delete("/deleteaddress", async(req,res)=>{
    const addressId = req.headers['address-id'];
    try{
        await apidata.findByIdAndDelete(addressId);
        res.status(200).json({ message: 'Address deleted successfully' });
    }catch(err){
        res.json(err).status(404);
    }
})

app.get("/getalladdress", async(req,res)=>{
    try{
        const data = await apidata.find({});
        res.send(data); 
    }catch(e){
        res.status(404).send(e);
    }
})





app.listen(port, ()=>{
    console.log(`Server running successfully on port no. ${port}`);
})