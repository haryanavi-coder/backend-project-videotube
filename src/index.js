// require('dotenv).config({path: './env'})  // will work fine
import dotenv from "dotenv"; 
import connectDB from "./db/db.js";

dotenv.config({
    path: './env'
})



// database connection
/*
import express from "express"
const app = express()

// effi 
()()

semicolon is added to keep error from aboveline of code

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/

connectDB()
.then(() => {
    
    app.on("error", (error) => {
        console.log("ERRR: ", error);
        throw error
    })

    const port = process.env.PORT || 8000;
    app.listen(port, ( ) => {
        console.log(`Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!!", err);
})