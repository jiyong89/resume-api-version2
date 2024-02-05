import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/sign-up', async (req, res) => {
  const { email, password, passwordConfirm, name } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ succes: false, message: '이메일은 필수값입니다.' });
  }
  if (!password) {
    return res
      .status(400)
      .json({ succes: false, message: '비밀번호는 필수값입니다.' });
  }
  if (!passwordConfirm) {
    return res
      .status(400)
      .json({ succes: false, message: '비밀번호 확인은 필수값입니다.' });
  }
  if (!name) {
    return res
      .status(400)
      .json({ succes: false, message: '이름은 필수값입니다.' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ succes: false, message: '비밀번호는 최소 6자 이상입니다.' });
  }
  if (password !== passwordConfirm) {
    return res.status(400).json({
      succes: false,
      message: '비밀번호와 비밀번호 확인값이 일치하지 않습니다.',
    });
  }

  const user = await prisma.users.findFirst({
    where: { email },
  });

  if (user) {
    return res
      .status(400)
      .json({ succes: false, message: '사용할 수 없는 이메일 입니다.' });
  }

  await prisma.users.create({
    data: {
      email,
      password,
      passwordConfirm,
      name,
    },
  });

  return res.status(201).json({
    email,
    name,
  });
});

export default router;
