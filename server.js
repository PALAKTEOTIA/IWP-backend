require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const cors = require('cors');
const userRoutes = require('./routes/index');
const bodyParser = require('body-parser')

require('./db/connection');

app.use(cors())

app.use(bodyParser.json({limit: '12mb'}));
app.use(bodyParser.urlencoded({limit: '12mb', extended: true}));
app.use(express.static('./uploads'))

app.use(userRoutes);

app.listen(port,(err)=>{
    if(err){
        console.log(err)
        process.exit()
    }
    console.log(`Server started on ${port}`)
})