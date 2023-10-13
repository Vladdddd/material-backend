import TypeModel from "../models/Type.js";

export const getAll = async (req, res) => {
  try {
    const types = await TypeModel.find().exec();
    res.json(types);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get types",
    });
  }
};
