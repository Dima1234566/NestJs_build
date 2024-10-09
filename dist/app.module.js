"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const posts_module_1 = require("./posts/posts.module");
const posts_model_1 = require("./posts/posts.model");
const users_model_1 = require("./users/users.model");
const jwt_1 = require("@nestjs/jwt");
const telegram_module_1 = require("./telegram/telegram.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_HOST), config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }), users_module_1.UsersModule, posts_module_1.PostsModule, mongoose_1.MongooseModule.forFeature([{
                    name: posts_model_1.Posts.name,
                    schema: posts_model_1.PostSchema,
                    collection: "posts",
                },
                {
                    name: users_model_1.User.name,
                    schema: users_model_1.UserSchema,
                    collection: "users"
                }]), telegram_module_1.TelegramModule, admin_module_1.AdminModule],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map