import Features from "../../models/Features.js";




const addFeatureImage= async(req, res)=>{
    try {
        const {image}= req.body;
        const featuresImage=  new Features({image})
        await featuresImage.save()

        res.status(201).json({
            success : true,
            data : featuresImage
        })

    } catch (error) {
        return res.status(500).json({
      success: false,
      message: "Failed to add  Features details",
    });
    }
}


const getFeatureImage= async(req, res)=>{
    try {
        
        const images = await Features.find()
          return res.status(201).json({
      success: true,
  data: images
    });
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: "Failed to add  Features details",
    });
    }
}



export { getFeatureImage, addFeatureImage}