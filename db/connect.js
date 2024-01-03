import { connect } from "mongoose";

const connectDB = async (url) => {
  try {
    await connect(url);
    console.log("Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
