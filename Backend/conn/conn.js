const mongoose = require("mongoose");

const conn = async () => {
  await mongoose
    .connect
    (
       process.env.MONGO_URI
    )
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

 conn();