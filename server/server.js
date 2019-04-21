// requires
const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.router');


// uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/task', taskRouter);

// server up
app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});








