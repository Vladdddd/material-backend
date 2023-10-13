import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  AssetController,
  TypeController
} from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.rxr3kzw.mongodb.net/assets?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());
app.use(cors());

app.get("/assets", AssetController.getAll);

app.get("/assets/:startDate/:endDate", AssetController.getByDate);
app.get("/assetsByName/:name", AssetController.getByName);
app.get("/assetsById/:id", AssetController.getById);

app.post("/assets", AssetController.create);
app.patch("/assets/:id", AssetController.update);
app.delete("/assets/:id", AssetController.remove);

app.get("/types", TypeController.getAll);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
