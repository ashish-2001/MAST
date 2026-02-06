import mongoose from "mongoose";

async function connect(){

    try{
        const mongoUrl = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected!");

        if(!mongoUrl){
            console.log("Mongo url is undefined!");
        }
    } catch(e){
        console.log(e);
        process.exit(1);
    }
};

export {
    connect
};