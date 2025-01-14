const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    work: {
      type: String,
      enum: ["chef", "waiter", "manager", "editor", "youtuber", "businessman"],
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  {versionKey: false, timestamps: true}
);

const Person = mongoose.model("person", personSchema);
module.exports = Person;
