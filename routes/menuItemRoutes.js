const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem")

//************Menu item Post******************* 
router.post("/", async(req, res)=>{
  try{
    const data = req.body;
    const newMenuItem = await new MenuItem(data);
    const saved = await newMenuItem.save();
    console.log("Mennu Item is saved in database", saved);
    res.status(200).json(saved);
  }catch(err){
    console.log("Men item error", err);
    res.status(500).json({err: "Internal server error"})
  }
})

//************Menu item Get******************* 
router.get("/", async(req, res)=>{
  try{
    const data = await MenuItem.find();
    // console.log("Menu item Data", data);
    res.status(200).json(data)
  }catch(err){
    res.status(500).json({err: "Internal server error"})
  }
})


//************Specific Menu item******************* 
router.get("/:tasteItem", async(req, res) => {
      try{
            const tasteItem = req.params.tasteItem;
            if (
              tasteItem === "sweet" ||
              tasteItem === "spicy" ||
              tasteItem === "sour" ||
              tasteItem === "bitter"
            ) {
              const response = await MenuItem.find({ taste: tasteItem });
              console.log("Response fetched");
              res.status(200).json(response);
            } else {
              res.sendStatus(404).json({ error: "Invalid taste type" });
            }
      }catch(err){
            console.log(err);
            res.status(500).json({error: "Internal server error"})
      }
})


//************Update menu item******************* 
router.put("/:id", async(req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuId = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuId, {
      new: true,
      runValidators: true,
    })

    if(!response){
      res.status(404).json({message: "Menu item is not found"});
    }
    console.log("Data is updated");
    res.status(200).json(response)
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }
})


//************Delete menu item******************* 
router.delete("/:id", async(req, res) => {
  try{
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);
    if(!response){
      console.log("Menu item is not found");
      res.status(404).json({error: "Menu item is not found"});
    }
    console.log("Data is deleted",response);
    res.status(200).json({message: "Data is deleted"})
  }catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

module.exports = router;