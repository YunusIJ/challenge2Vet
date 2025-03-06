import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    breedName: { 
        type: String, 
        required: true },
    age: { 
        type: Number, 
        required: true },

    picture: { 
        type: String,
         required: true },

    quantity: {
        type: Number,
        require: true
    },

    cost: { 
        type: Number, 
        required: true },
        },
        

        {
            timestamps: true,
            versionKey: false,
          }
        );

        const pet = mongoose.model("pet", petSchema);

export default pet;