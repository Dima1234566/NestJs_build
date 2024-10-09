"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const posts_controller_1 = require("./posts.controller");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const posts_model_1 = require("./posts.model");
const users_module_1 = require("../users/users.module");
const users_service_1 = require("../users/users.service");
const users_model_1 = require("../users/users.model");
const jwt_1 = require("@nestjs/jwt");
const nodemailer = require("nodemailer");
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        providers: [{
                provide: users_service_1.TRANSPORTER_PROVIDER,
                useFactory: () => {
                    return nodemailer.createTransport({
                        host: 'smtp.i.ua', port: 465, secure: true, auth: { user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS }
                    });
                }
            }, users_service_1.UsersService, posts_service_1.PostsService],
        controllers: [posts_controller_1.PostsController],
        imports: [jwt_1.JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }),
            users_module_1.UsersModule, config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }), mongoose_1.MongooseModule.forFeature([{
                    name: posts_model_1.Posts.name,
                    schema: posts_model_1.PostSchema,
                    collection: "posts",
                },
                {
                    name: users_model_1.User.name,
                    schema: users_model_1.UserSchema,
                    collection: "users"
                }])]
    })
], PostsModule);
//# sourceMappingURL=posts.module.js.map