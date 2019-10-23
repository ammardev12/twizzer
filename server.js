const express = require('express');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./database/db');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }));
 //app
//file upload
app.use(fileupload())
 
//Routes and Middlewares
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
app.use('/api/users', authRoutes);
app.use('/api/posts', postsRoutes);
app.use(express.static('client/build'));

if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} 

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => console.log(`server up and running on ${PORT}`));

