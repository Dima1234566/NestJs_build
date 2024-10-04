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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_model_1 = require("../posts/posts.model");
const posts_service_1 = require("../posts/posts.service");
const users_model_1 = require("../users/users.model");
const users_service_1 = require("../users/users.service");
let AdminService = class AdminService {
    constructor(userModel, userService, postModel, postService) {
        this.userModel = userModel;
        this.userService = userService;
        this.postModel = postModel;
        this.postService = postService;
    }
    async deleteAllPosts(req) {
        try {
            const user = await this.userService.findToken(req);
            if (!user) {
                return console.log("user not here");
            }
            if (user.role === 'admin') {
                const postArr = await this.postModel.find();
                for (const post of postArr) {
                    await this.postModel.findByIdAndDelete(post._id);
                }
                return console.log("all posts deleted");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async changeUserRole(id, req) {
        try {
            const admin = await this.userService.findToken(req);
            if (admin.role === 'admin') {
                const user = await this.userModel.findById(id);
                if (!user) {
                    console.log("user not found");
                }
                else {
                    if (user.role === 'user') {
                        const changeRole = await this.userModel.findByIdAndUpdate(id, { role: 'moderator' });
                        return changeRole;
                    }
                    else {
                        const changeRole = await this.userModel.findByIdAndUpdate(id, { role: 'user' });
                        return changeRole;
                    }
                }
            }
            else {
                console.log('you are not admin');
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async banUser(id, req) {
        try {
            const admin = await this.userService.findToken(req);
            console.log(admin.role);
            if (admin.role === 'admin' || admin.role === 'moderator') {
                const user = await this.userModel.findById(id);
                if (!user) {
                }
                else {
                    if (user.ban === true) {
                        const changeBanStatus = await this.userModel.findByIdAndUpdate(id, { ban: false });
                        return await this.userModel.findById(changeBanStatus._id);
                    }
                    if (user.ban === false) {
                        const changeBanStatus = await this.userModel.findByIdAndUpdate(id, { ban: true });
                        return await this.userModel.findById(changeBanStatus._id);
                    }
                }
            }
            else {
                console.log('you are not admin or moderator');
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async findBanUsers(req) {
        try {
            const admin = await this.userService.findToken(req);
            if (admin.role === 'admin' || admin.role === 'moderator') {
                return await this.userModel.find({ ban: false }, { ban: true, email: true });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_model_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(posts_model_1.Posts.name)),
    __metadata("design:paramtypes", [users_model_1.User,
        users_service_1.UsersService,
        posts_model_1.Posts,
        posts_service_1.PostsService])
], AdminService);
//# sourceMappingURL=admin.service.js.map