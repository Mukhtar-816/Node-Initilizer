import { Router } from "express";
import Controller from '../controllers/authController.js'


const router = Router();

//Local Auth Login or JWT Authentication
router.post('/login', Controller.Login)

//Local SignUp  or JWT SignUp
router.post('/signup', Controller.SignUp)

//Refresh access token
router.post('/refreshAccessToken', Controller.RefreshAccessToken)



export default router;