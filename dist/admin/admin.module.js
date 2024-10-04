"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const users_module_1 = require("../users/users.module");
const posts_module_1 = require("../posts/posts.module");
const mongoose_1 = require("@nestjs/mongoose");
const posts_model_1 = require("../posts/posts.model");
const users_model_1 = require("../users/users.model");
const users_service_1 = require("../users/users.service");
const posts_service_1 = require("../posts/posts.service");
const jwt_1 = require("@nestjs/jwt");
const nodemailer = require("nodemailer");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        providers: [{
                provide: users_service_1.TRANSPORTER_PROVIDER,
                useFactory: () => {
                    return nodemailer.createTransport({ host: 'smtp.i.ua', port: 465, secure: true, auth: { user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS } });
                }
            }, admin_service_1.AdminService, users_service_1.UsersService, posts_service_1.PostsService],
        imports: [jwt_1.JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }), users_module_1.UsersModule, posts_module_1.PostsModule, mongoose_1.MongooseModule.forFeature([{
                    name: posts_model_1.Posts.name,
                    schema: posts_model_1.PostSchema,
                    collection: "posts",
                },
                {
                    name: users_model_1.User.name,
                    schema: users_model_1.UserSchema,
                    collection: "users"
                }])],
        controllers: [admin_controller_1.AdminController],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map