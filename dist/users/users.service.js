"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = exports.TRANSPORTER_PROVIDER = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_model_1 = require("./users.model");
const jwt_1 = require("@nestjs/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const nodemailer = require("nodemailer");
const verify_email_1 = require("./emails/verify.email");
const pass_generate_1 = require("./emails/pass.generate");
exports.TRANSPORTER_PROVIDER = 'TRANSPORTER_PROVIDER';
let UsersService = class UsersService {
    constructor(jwtService, userModel, transporter) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.transporter = transporter;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.zoho.eu', port: 465, secure: true, auth: {
                user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS
            },
        });
    }
    async createUser(user) {
        try {
            if (!user) {
                return console.log("нема юзера");
            }
            const { email, password, phone } = user;
            const lowerCaseEmail = email.toLocaleLowerCase();
            const findEmail = await this.userModel.findOne({
                email: lowerCaseEmail
            });
            const findPhone = await this.userModel.findOne({
                phone: phone
            });
            if (!findPhone && !findEmail) {
                const regUser = await this.userModel.create({
                    email: lowerCaseEmail,
                    password: password,
                    phone: phone
                });
                regUser.setPassword(password);
                regUser.save();
                await this.createToken(regUser);
                await this.sendVerify(lowerCaseEmail);
                return regUser;
            }
            else {
                console.log("this phone and email exist");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async findAllUsers() {
        try {
            console.log(process.env.MAIL_PASS);
            return await this.userModel.find();
        }
        catch (error) {
            console.error(error);
        }
    }
    async findUserById(id, req) {
        try {
            const admin = await this.findToken(req);
            if (!admin) {
                return console.error("User not found");
            }
            console.log;
            if (admin && admin.role === 'admin') {
                return await this.userModel.findById(id);
            }
            else {
                console.error("User not admin");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async findById(id) {
        try {
            return await this.userModel.findById(id);
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateUserPassword(passwordAndId) {
        try {
            const { password, id } = passwordAndId;
            return await this.userModel.findByIdAndUpdate(id, {
                password: password
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateUser(data, query) {
        try {
            const { email, photos, name, age, location } = data;
            const user = await this.findToken(query);
            if (!user) {
                console.log("Not authorizate");
            }
            if (email || photos || name || age || location) {
                await this.userModel.findByIdAndUpdate(user._id, Object.assign({}, data));
                return await this.userModel.findById(user.id);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async findAndDelete(id) {
        try {
            return await this.userModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.error(error);
        }
    }
    async userLogin(user) {
        try {
            const { password, email } = user;
            const loginUser = await this.userModel.findOne({ email: email });
            if (!loginUser) {
                console.log("User not found");
            }
            else if (loginUser.comparePassword(password) === true) {
                await this.createToken(loginUser.id);
                return await this.userModel.findById(loginUser.id);
            }
            else {
                console.log("password useless");
            }
            return;
        }
        catch (error) {
            console.error(error);
        }
    }
    async userLogout(req) {
        try {
            const user = await this.findToken(req);
            if (!user) {
                console.log('JWT are useless');
            }
            else {
                await this.userModel.findByIdAndUpdate({ _id: user.id }, { access_token: null, refresh_token: null });
                return await this.userModel.findById(user.id);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async createToken(userId) {
        const payLoad = {
            id: userId
        };
        const secret = process.env.SECRET_KEY;
        const token = (0, jsonwebtoken_1.sign)(payLoad, secret, { expiresIn: "30m" });
        const refreshToken = (0, jsonwebtoken_1.sign)(payLoad, secret, { expiresIn: "1day" });
        try {
            await this.userModel.findByIdAndUpdate(userId, { access_token: token, refresh_token: refreshToken });
            return await this.userModel.findById(userId);
        }
        catch (error) {
            console.error(error);
        }
    }
    async findToken(req) {
        try {
            const { authorization = '' } = req.headers;
            const [bearer, token] = authorization.split(' ');
            if (bearer !== 'Bearer') {
                console.log("user not in a base");
            }
            const secret = process.env.SECRET_KEY;
            const findId = (0, jsonwebtoken_1.verify)(token, secret);
            const user = await this.userModel.findById(findId.id);
            return user;
        }
        catch (error) {
            console.error(error);
        }
    }
    async refreshToken(refresh) {
        try {
            const user = await this.userModel.findOne(refresh);
            const updateToken = await this.createToken(user._id);
            return { access_token: updateToken.access_token, refresh_token: updateToken.refresh_token };
        }
        catch (error) {
            console.error(error);
        }
    }
    async findLocationUser(query) {
        try {
            const { location, page, size } = query;
            const currentPage = page || 1;
            const currentSize = size || 5;
            const regex = new RegExp(location, 'i');
            const usersLocation = await this.userModel.find({ location: { $regex: regex } }).select("location");
            if (location) {
                const totalCount = location.length;
                const totalPages = Math.ceil(totalCount / currentSize);
                return { totalPages: totalPages, currentPage: currentPage, data: usersLocation };
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async validateUser(details) {
        try {
            const user = await this.userModel.findOne({ email: details.email });
            if (user) {
                if (user.googleId === details.googleId) {
                    await this.createToken(user._id);
                    return this.userModel.findById(user._id);
                }
                if (!user.googleId) {
                    await this.userModel.findByIdAndUpdate({ _id: user._id }, { googleId: details.googleId });
                    await this.createToken(user._id);
                    return this.userModel.findById(user._id);
                }
            }
            if (!user) {
                const regUser = await this.userModel.create({
                    email: details.email,
                    password: details.googleId,
                    firstName: details.firstName,
                });
                await this.createToken(regUser._id);
                return this.userModel.findById(regUser._id);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async forgotPassword(email) {
        try {
            const user = await this.userModel.findOne({ email: email });
            const newPass = (0, pass_generate_1.generatePassword)();
            user.setPassword(newPass);
            user.save();
            const body = await (0, verify_email_1.forgotPassEmail)(newPass);
            const massage = { from: process.env.MAIL_LOG, to: email, subject: "Ваш новий пароль", html: body };
            await this.transporter.sendMail(massage);
            return;
        }
        catch (error) {
            console.error(error);
        }
    }
    async verification(userId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                console.log("user not found");
                await this.userModel.findByIdAndUpdate({ _id: userId }, {
                    verify: true
                });
                return await this.userModel.findById(userId);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async sendVerify(email) {
        try {
            const user = this.userModel.findOne({ email: email });
            const body = await (0, verify_email_1.verifyEmails)(user._id);
            const massage = { from: process.env.MAIL_LOG, to: email, subject: "Дякуємо за підтвердження інформації", html: body };
            await this.transporter.sendMail(massage);
            return;
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(users_model_1.User.name)),
    __param(2, (0, common_1.Inject)(exports.TRANSPORTER_PROVIDER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_model_1.User, Object])
], UsersService);
users_model_1.UserSchema.methods.setPassword = async function (password) {
    return (this.password = (0, bcryptjs_1.hashSync)(password, 10));
};
users_model_1.UserSchema.methods.comparePassword = function (password) {
    return (0, bcryptjs_1.compareSync)(password, this.password);
};
//# sourceMappingURL=users.service.js.map