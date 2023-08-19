import mongoose from "mongoose";

let isConneected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConneected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Generatorize",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConneected = true;
    console.log('MongoDB is connected')
  } catch (error) {
    console.log(error);   
  }
}