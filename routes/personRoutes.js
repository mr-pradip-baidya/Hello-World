const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// **************person data post*************
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedData = await newPerson.save();
    console.log("Data saved", savedData);
    res.status(200).json(savedData);
  } catch (err) {
    console.log("Data is not saved", err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// **************person data get*************
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data feched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Data fetching failed");
    res.status(500).json({ err: "Internal server error to feching data" });
  }
});

// **********Employee Worktype****************
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType == "chef" ||
      workType == "waiter" ||
      workType == "editor" ||
      workType == "youtuber" ||
      workType == "businessman" ||
      workType == "manager"
    ) {
      const response = await Person.find({ work: workType });
      console.log("Perticular Person data fetched");
      res.status(200).json(response);
    } else {
      console.log("Include work type!");
      res.status(404).json({ error: "Include work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// **********Employee data update****************
router.put("/:id", async(req, res)=>{
  try{
    const personId = req.params.id; // url through getting id 
    const updatedPersonData = req.body; //getting value from body
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true
    });

    if(!response){
      res.status(404).json({error: "Person not found!"})
    }
     console.log("Data updated");
     res.status(200).json(response)
  }catch(err){
    console.log(err);
    res.status(500).json({err: "Internal server error"})
  }
})

// **********Delete Employee data ****************
router.delete("/:id", async(req, res) => {
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      console.log("data is not deleted");
      res.status(404).json({error: "Person not found"})
    };

    console.log("Person deleted", response);
    res.status(200).json({message: "Person data deleted"})
  }catch(err){
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
})


module.exports = router;


