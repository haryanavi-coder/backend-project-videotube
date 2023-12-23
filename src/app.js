import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // it is used to CRUD user cookies
const app = express();

app.use(cors({                  // use is used for midddlewares
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))                         


// some dat will come from url, json, form, to prevent server crashing limit no. of json requests
app.use(express.json({limit: "16kb"}))  // earlier express was not able to accept it, we were using body-parser
// by url handling
app.use(express.urlencoded({extended: true, limit: "16kb"})) // extended is not required but in nesting can be used

app.use(express.static("public"))  // no need to name public // used to access images, etc.

app.use(cookieParser()); 




export { app }   // export default app // will also work