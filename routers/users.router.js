import express from 'express';
import { prisma } from '../modules/index.js';
import { verificationToken } from '../middlewares/middleware.js';
import { UsersController } from '../controllers/users.controller.js'
import { UsersServices } from '../services/user.services.js';
import { UsersRepository } from '../repositories/user.repositories.js';

const router = express.Router();
const userRepositories = new UsersRepository(prisma);
const userServices = new UsersServices(userRepositories);
const userController = new UsersController(userServices);

// 회원가입 API
router.post('/sign-up', userController.signup);

// 로그인 API
router.post('/log-in', userController.login);

// Access Token 재발급 API
router.get('/tokens', userController.reissuance)

// 내 정보 조회 API
router.get('/', verificationToken, userController.checkInformation)

export default router;