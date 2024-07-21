// const { uniq } = require("lodash");
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sweet", "spicy", "sour", "bitter"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    required: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    // unique: true,
    required: true,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
