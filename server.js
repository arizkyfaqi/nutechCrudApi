const app = require("./app");
const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/nutechcrud";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connections success!");
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
