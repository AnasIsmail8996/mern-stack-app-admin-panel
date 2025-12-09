import mongoose from "mongoose"

const dbConnect =async ()=>{
const URI= process.env.MONGO_URI;

mongoose.connect(URI)
.then((res)=> console.log(`💜 DBConnected successfully `))
.catch((error)=> console.log(`😅  DBConnection  Error`) )
}



export {dbConnect}
