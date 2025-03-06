import cloudinary from "../utils/log/image/cloudinary.js"
import Pet from "../models/pet.models.js";

export const addPet = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "Pets", 
            use_filename: true,
            unique_filename: false,
        });

        const { breedName, age, cost, quantity, } = req.body;

        

        const newPet = new Pet({
            breedName,
            age,
            cost,
            quantity,
            picture: result.secure_url,        });

        await newPet.save();

        return res.status(201).json({ message: "Pet Added Successfully", data: newPet });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error adding pet" });
    }
};

  
  export const editPet = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPet = await Pet.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedPet) {
        return res.status(404).json({ message: "Pet not found" });
      }
  
      res.json({ message: "Pet updated successfully!", pet: updatedPet });
    } catch (error) {
      console.error("Error updating pet:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export const purchasePet = async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
  
      if (!quantity || quantity <= 0) {
        return res.status(401).json({ message: "Invalid quantity" });
      }
  
    
      const pet = await Pet.findById(id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
  
      if (pet.quantity < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }
  
      
      pet.quantity -= quantity;
      await pet.save();
  
      res.json({ 
        message: "Purchase successful!", 
        pet: { breedName: pet.breedName, remainingStock: pet.quantity } 
      });
  
    } catch (error) {
      console.error("Error purchasing pet:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };