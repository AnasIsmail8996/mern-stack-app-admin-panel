import express from "express"


import { addProduct, deleteProduct, 
    editProduct, fetchAllProducts, handleImageUpload } from "../../controllers/admin/productsController.js"

import { upload } from "../../db/cloudinary.js"

    const imageRouter= express.Router()



    imageRouter.post('/upload-image', upload.single("my_file"), handleImageUpload)
     imageRouter.post('/add', addProduct)
     imageRouter.get('/get', fetchAllProducts)
     imageRouter.put('/edit/:id', editProduct)
     imageRouter.delete('/delete/:id', deleteProduct)


    export default imageRouter