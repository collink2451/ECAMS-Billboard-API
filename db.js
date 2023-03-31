const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
module.exports.connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to API Database - Initial Connection");
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      );
    });
};
