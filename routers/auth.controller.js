import authController from '../src/controller/auth.controller';
import express from 'express';


const router = express.Router();

router.post('/token',authController.generateNewAccessTokenByFreshToken)

export default router;