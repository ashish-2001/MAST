import mongoose from "mongoose";

async function connect(){

    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected!");
    } catch(e){
        console.log(e);
        process.exit(1);
    }
};