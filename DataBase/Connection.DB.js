const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const conectDataBase = () => {
  mongoose
    .connect("mongodb://localhost:27017/Sports", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(`MongoDB Connected With Server ${data.connection.host}`);
    });
};

module.exports = conectDataBase;
