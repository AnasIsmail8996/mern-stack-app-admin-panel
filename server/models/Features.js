import mongoose from "mongoose";

const FeaturesSchema = new mongoose.Schema({
    image : String,

},
 
  { timestamps: true }
);

const Features = mongoose.model("Features", FeaturesSchema );
export default Features;

