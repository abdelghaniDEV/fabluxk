const express = require('express');
require('dotenv').config(); 
const cors = require('cors');


const app = express();


app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

const userRouter = require('./router/user.router')
const leadRouter = require('./router/lead.router')
const projectRouter = require('./router/project.router')

app.use('/api/users' , userRouter)
app.use('/api/lead' , leadRouter)
app.use('/api/projects' , projectRouter)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});