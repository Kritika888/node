require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users');
const authRoutes = require('./Authentication/routes/authRoutes');

const app = express();
app.use(express.json());

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/kritika888')
    .then(()=>{
        console.log("Mongodb connected!");
    })
    .catch((err)=>{
        console.log("Connection error: ", err);
    });

app.get("/", (req, res) => {
  res.send("API running");
});

// app.post("/users", async (req, res)=>{
//     const user = await User.create(req.body);
//     res.json(user);
// });
app.use('/auth', authRoutes);


app.listen(3000, () => {
  console.log("Server running on 3000");
})