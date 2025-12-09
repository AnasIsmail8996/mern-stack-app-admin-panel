import express from "express"


import { addToCart, deleteCartItems, updateCartItemsQty, fetchCartItems } from "../../controllers/shop/cartController.js"


const router = express.Router()



router.post('/add', addToCart)
router.delete('/:userId/:productId', deleteCartItems)
router.put('/update-cart', updateCartItemsQty)
router.get('/get/:userId', fetchCartItems)


export default router ;