const mongoose = require("mongoose")
function dbConnect(link){
    mongoose.connect(link)
    .then(()=>console.log("Database connected")).catch(()=>console.log("Database connection failed"))
}


module.exports = {dbConnect}