import mongoose from 'mongoose';

export const connectDb = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/Change', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("DB connected successfully");
   } catch (error) {
      console.error("DB connection failed", error);
   }
};
