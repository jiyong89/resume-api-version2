import authService from '../service/AuthenticatorAssertionResponse.service.js';

const generateNewAccessTokenByFreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const token = await authService.verifyFreshToken(refreshToken);
  return res.json(token);
};

export default generateNewAccessTokenByFreshToken;
