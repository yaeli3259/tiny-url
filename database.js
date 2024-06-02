import mongoose from "mongoose";

// Replace the uri string with your connection string.
const uri =
"mongodb+srv://yb8061:GQhkOwkJajEP29UX@cluster0.rbtzxio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uriLocal = "mongodb://localhost:27017/<dbname>";

const connectDB = async () => {
  await mongoose.connect(uri);
};

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
      delete converted._id;
    }
  });
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})

export default connectDB;
