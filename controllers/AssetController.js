import AssetModel from "../models/Asset.js";
import Type from "../models/Type.js";

export const getAll = async (req, res) => {
  try {
    const assets = await AssetModel.find().exec();
    res.json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get assets",
    });
  }
};

export const getByName = async (req, res) => {
  try {
    const name = req.params.name;
    const assets = await AssetModel.find({name: { $regex: name, $options: "i" }});
    res.json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get asset",
    });
  }
}

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const assets = await AssetModel.find({id: { $regex: id, $options: "i" }});
    res.json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get asset",
    });
  }
}

export const getByDate = async (req, res) => {
  try {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    
    const assets = await AssetModel.find({ commissioningDate: { $gte: startDate, $lte: endDate } })
    res.json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get asset",
    });
  }
}

export const create = async (req, res) => {
  try {
    const doc = new AssetModel({
      name: req.body.name,
      id: req.body.id,
      releaseDate: req.body.releaseDate,
      commissioningDate: req.body.commissioningDate,
      cost: req.body.cost,
      type: req.body.typeId,
      serviceTerm: req.body.serviceTerm,
      writeOffDate: req.body.writeOffDate,
    });
    const asset = await doc.save();
    
    const typeById = await Type.findById(req.body.typeId);
    typeById.assets.push(asset);
    await typeById.save();
    
    const assets = await AssetModel.find().exec();
    res.json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create asset",
    });
  }
};

export const update = async (req, res) => {
  try {
    const assetId = req.params.id;

    await AssetModel.updateOne(
      {
        _id: assetId,
      },
      {
        id: req.body.id,
        name: req.body.name,
        releaseDate: req.body.releaseDate,
        commissioningDate: req.body.commissioningDate,
        cost: req.body.cost,
        serviceTerm: req.body.serviceTerm,
        writeOffDate: req.body.writeOffDate,
        type: req.body.typeId
      }
    );

    const assets = await AssetModel.find().exec();
    res.json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update asset",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const assetId = req.params.id;

    await AssetModel.findOneAndDelete({
      _id: assetId,
    });

    const assets = await AssetModel.find().exec();
    res.json(assets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete asset",
    });
  }
};
