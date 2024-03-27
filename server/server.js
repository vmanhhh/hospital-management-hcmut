const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const app = express();
const uri = "mongodb+srv://admin99:3QWRrIoCgUwAMH5y@project-hospital-hcmut.xhbaroi.mongodb.net/?retryWrites=true&w=majority&appName=project-hospital-hcmut";
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connect successfully");
    } catch (e) {
        console.error(e);
    }
}
connect();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});