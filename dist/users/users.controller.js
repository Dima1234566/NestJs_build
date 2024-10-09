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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create.user.dto");
const users_model_1 = require("./users.model");
const swagger_1 = require("@nestjs/swagger");
const password_user_dto_1 = require("./dto/password.user.dto");
const update_user_dto_1 = require("./dto/update.user.dto");
const login_user_dto_1 = require("./dto/login.user.dto");
const google_user_dto_1 = require("./dto/google.user.dto");
const Guard_1 = require("./utils/Guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path = require("path");
const cloudinary_service_1 = require("./cloudinary.service");
const forgor_pass_dto_1 = require("./dto/forgor.pass.dto");
let UsersController = class UsersController {
    constructor(userService, cloudinaryService) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(user) {
        return await this.userService.createUser(user);
    }
    googleLogin() {
        return;
    }
    async googleRedirect(res, req) {
        const userId = req.user._id;
        const user = await this.userService.findById(userId);
        return res.redirect(`https://www.google.com/?token=${user.access_token}`);
    }
    async findUsers() {
        return await this.userService.findAllUsers();
    }
    async findUserById(id, req) {
        return await this.userService.findUserById(id, req);
    }
    async update(password) {
        return await this.userService.updateUserPassword(password);
    }
    async updateUser(user, query) {
        return await this.userService.updateUser(user, query);
    }
    async uploadPhoto(req, images) {
        try {
            const user = await this.userService.findToken(req);
            if (!user) {
                console.log("user not in base ");
            }
            await this.cloudinaryService.uploadImages(user, images);
            return await this.userService.findById(user.id);
        }
        catch (error) {
            console.error(error);
        }
    }
    async deletePhotoById(req, imageId) {
        const user = await this.userService.findToken(req);
        if (!user) {
            console.log("user not in base ");
        }
        await this.cloudinaryService.deleteImage(user, imageId);
        return await this.userService.findById(user.id);
    }
    async deleteById(id) {
        return await this.userService.findAndDelete(id);
    }
    async logIn(user) {
        return await this.userService.userLogin(user);
    }
    async logOut(req) {
        return await this.userService.userLogout(req);
    }
    async forgotPass(data) {
        return await this.userService.forgotPassword(data.email);
    }
    async findLocation(query) {
        return await this.userService.findLocationUser(query);
    }
    async refreshToken(refresh) {
        return await this.userService.refreshToken(refresh);
    }
    async verifyEmail(id) {
        return await this.userService.verification(id);
    }
    async favorites(id, req) {
        return await this.userService.favorites(id, req);
    }
    async deleteFromFavorites(id, req) {
        return await this.userService.deleteFromFavorites(id, req);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create User" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "google login" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: google_user_dto_1.GoogleUserDto }),
    (0, common_1.UseGuards)(Guard_1.GoogleAuthGuard),
    (0, common_1.Get)("/google/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "googleLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "google login" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: google_user_dto_1.GoogleUserDto }),
    (0, common_1.UseGuards)(Guard_1.GoogleAuthGuard),
    (0, common_1.Get)("/google/redirect"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "googleRedirect", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get User" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get User by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.Get)("/find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUserById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update password" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.Put)("/update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_user_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update user" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.Put)("/update/user"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "upload image" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("file", 5, {
        storage: (0, multer_1.diskStorage)({
            destination: "upload",
            filename: (req, file, cd) => {
                const filename = path.parse(file.originalname).name.replace(/\s/g, "") + "-" + Date.now();
                const extension = path.parse(file.originalname).ext;
                cd(null, `${filename}${extension}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadPhoto", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete User Photo by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.Delete)("/delete-image/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deletePhotoById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete User by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.Delete)("/delete/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Log in User" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Log Out User" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.Post)("/logout"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "forgot password? change it" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/forgot"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgor_pass_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "forgotPass", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "find location User" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'location', required: false, type: String }),
    (0, common_1.Get)("/find-location"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findLocation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update TOKEN" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Object }),
    (0, common_1.Post)("/refresh"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refreshToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "verify User by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, common_1.Get)("/verify-email/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "favorite posts" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("/favorites/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "favorites", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "delete from favorite posts" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: users_model_1.User }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)("/delete-favorites/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteFromFavorites", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        cloudinary_service_1.CloudinaryService])
], UsersController);
//# sourceMappingURL=users.controller.js.map