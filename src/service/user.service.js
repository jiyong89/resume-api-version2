import bcrypt from "bcrypt";

export class UsersServices {
    constructor(userRepositories) {
        this.userRepositories = userRepositories;
    }

    signup = async (email, password, confirmpassword, name) => {

        if (!email) {
            throw new Error('이메일을 입력하세요.');
        } else if (!name) {
            throw new Error('이름을 입력하세요.');
        } else if (!password) {
            throw new Error('비밀번호를 입력하세요.');
        } else if (!confirmpassword) {
            throw new Error('비밀번호 확인을 입력하세요.');
        }

        const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
        if (emailFormat === false) {
            throw new Error('이메일 형식이 틀립니다.');
        }

        const isExistUser = await this.userRepositories.findUserByemail(email);
        if (isExistUser) {
            throw new Error('이미 존재하는 이메일입니다.');
        }

        if (password.length < 6) {
            throw new Error('비밀번호는 최소 6글자 이상 입력하세요.');
        }

        if (password !== confirmpassword) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userRepositories.signup(
            email,
            hashedPassword,
            name
        );

        return {
            email: user.email,
            name: user.name
        }
    }

    login = async (email, password) => {

        if (!email) {
            throw new Error('이메일을 입력하세요.');
        } else if (!password) {
            throw new Error('비밀번호를 입력하세요.');
        }

        const user = await this.userRepositories.findUserByemail(email)

        if (!user) {
            throw new Error('존재하지 않는 이메일입니다.');
        } else if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return user;
    }

    checkInformation = async (userId) => {

        const user = await this.userRepositories.findUserByuserId(userId);

        return {
            userId: user.userId,
            email: user.email,
            name: user.name,
        }
    }
}