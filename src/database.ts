import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://restapi_ts:restapi_ts@cluster0.r7jyr.mongodb.net/restapi_ts"
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection stablished");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});
