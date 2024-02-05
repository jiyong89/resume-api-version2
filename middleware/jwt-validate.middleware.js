import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtvalidate = async (req, res, next) => {
  try {
    const { authorization } = req.cookies;

    if (!authorization) {
      throw new Error('인증 정보가 올바르지 않습니다.');
    }

    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType !== 'Bearer' || !tokenValue) {
      throw new Error('인증 정보가 올바르지 않습니다.');
    }

    const token = jwt.verify(tokenValue, 'resume@#');

    if (!token.userId) {
      throw new Error('인증 정보가 올바르지 않습니다.');
    }
    const userId = token.userId
    const user = await prisma.user.findFirst({
      where: {
        userId: +userId
      },
    });
    console.log(user);
   
    if (!user) {
      throw new Error('인증 정보가 올바르지 않습니다.');
    }
   
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export default jwtvalidate;

