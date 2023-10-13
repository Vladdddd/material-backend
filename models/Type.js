import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Alternative",
          required: true,
        },
    ],
  },
);

export default mongoose.model("Type", TypeSchema);
