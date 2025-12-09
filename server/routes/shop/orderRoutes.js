import express from "express"


import { createOrder, capturePayment, getAllOrdersByUser, getOrdersDetails } from "../../controllers/shop/orderCotroller.js"


const router = express.Router()



router.post('/create', createOrder)
router.post('/capture', capturePayment)
router.get('/list/:userId', getAllOrdersByUser)
router.get('/details/:id',  getOrdersDetails)


export default router ;