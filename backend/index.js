require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/userAuth");
const storeRouter = require("./routes/storeRoute");
const ratingRouter = require("./routes/ratingRoute");
const adminRouter = require("./routes/adminRoute");
const storeOwnerRouter = require("./routes/storeOwnerRoute");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");


const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());
app.use("/user", authRouter);
app.use("/store", storeRouter);
app.use("/rating", ratingRouter);
app.use("/admin", adminRouter);
app.use("/store-owner", storeOwnerRouter);


app.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      success: true,
      user: req.user
    });

  }
);


app.get("/", (req, res) => {
  res.send("Server Running");
});


app.listen(5000, ()=>{
    console.log(`listening at port:${port}`);
})