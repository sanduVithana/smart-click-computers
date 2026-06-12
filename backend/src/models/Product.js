// import mongoose from "mongoose";

// const specificationSchema = new mongoose.Schema(
//   {
//     key: String,
//     value: String,
//   },
//   { _id: false }
// );

// const productSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: Number,
//       unique: true,
//     },

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },

//     brand: {
//       type: String,
//       required: true,
//     },

//     price: {
//       type: Number,
//       required: true,
//     },

//     stockQuantity: {
//       type: Number,
//       default: 0,
//     },

//     images: [
//       {
//         type: String,
//       },
//     ],

//     specifications: [
//       specificationSchema,
//     ],

//     featured: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model(
//   "Product",
//   productSchema
// );

import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema(
  {
    key: String,
    value: String,
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stockQuantity: {
      type: Number,
      default: 0,
    },

    images: [imageSchema],

    specifications: [specificationSchema],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Product",
  productSchema
);