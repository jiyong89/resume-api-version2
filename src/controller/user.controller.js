import { newCreateToken, createTokens } from "../middlewares/middleware.js";

export class UsersController {
    constructor(userServices) {
        this.userServices = userServices;
    }

    signup = async (req, res, next) => {
        try {
            const { email, password, confirmpassword, name } = req.body;

            const user = await this.userServices.signup(
                email,
                password,
                confirmpassword,
                name
            );

            return res.status(201).json({ data: user });

        } catch (err) {
            next(err);
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await this.userServices.login(
                email,
                password
            );

            if (await createTokens(res, user.userId)) {
                return;
            }

            return res.status(200).json({ message: "로그인하였습니다." });

        } catch (err) {
            next(err);
        }
    }

    reissuance = async (req, res, next) => {
        try {
            await newCreateToken(req, res);

        } catch (err) {
            next(err);
        }
    }

    checkInformation = async (req, res, next) => {
        try {
            const {userId} = req.user;

            const user = await this.userServices.checkInformation(userId);

            return res.status(200).json({ data: user });

        } catch (err) {
            next(err);
        }
    }
}