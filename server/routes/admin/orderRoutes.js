
import express from "express"
import { getAllOrdersOfAllUsers, getOrdersDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/orderController.js"

const router= express.Router()

router.get('/get', getAllOrdersOfAllUsers )
router.get('/details/:id', getOrdersDetailsForAdmin )
router.put('/update/:id', updateOrderStatus )


 export default router