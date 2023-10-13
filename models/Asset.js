import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  commissioningDate: {
    type: Date,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  serviceTerm: {
    type: Number,
    required: true,
  },
  writeOffDate: {
    type: Date,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
    required: true,
  },
});

export default mongoose.model("Asset", AssetSchema);