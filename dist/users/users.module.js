"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const mongoose_1 = require("@nestjs/mongoose");
const users_model_1 = require("./users.model");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const GoogleStategy_1 = require("./utils/GoogleStategy");
const Serializer_1 = require("./utils/Serializer");
const cloudinary_service_1 = require("./cloudinary.service");
const nodemailer = require("nodemailer");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [{
                provide: users_service_1.TRANSPORTER_PROVIDER,
                useFactory: () => {
                    return nodemailer.createTransport({ host: 'smtp.i.ua', port: 465, secure: true, auth: { user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS } });
                }
            }, cloudinary_service_1.CloudinaryService, config_1.ConfigService, users_service_1.UsersService, GoogleStategy_1.GoogleStrategy, Serializer_1.SessionSerializer, { provide: 'USER_SERVICE', useClass: users_service_1.UsersService }],
        imports: [jwt_1.JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }),
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            mongoose_1.MongooseModule.forFeature([{
                    name: users_model_1.User.name,
                    schema: users_model_1.UserSchema,
                    collection: "users"
                }])]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map