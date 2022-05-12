const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Para conectarnos con Mongo.
main().catch(err => console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Succesful Connection')
}


app.listen(3000, ()=>{
    console.log('Listening on Port 3000 http://localhost:3000/')
})