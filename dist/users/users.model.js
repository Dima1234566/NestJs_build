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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.UserRoles = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["admin"] = 0] = "admin";
    UserRoles[UserRoles["user"] = 1] = "user";
    UserRoles[UserRoles["moderator"] = 2] = "moderator";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
let User = class User extends mongoose_2.Model {
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin', description: "User role" }),
    (0, mongoose_1.Prop)({ type: String, default: 'user' }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'moderator@gmail.com', description: "User email" }),
    (0, mongoose_1.Prop)({ type: String, required: [true, "email is required"] }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'moderasfw1234rator', description: "User password" }),
    (0, mongoose_1.Prop)({ type: String, required: [true, "password is required"], minlength: 8 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '{id: String, url: String}', description: "User photo" }),
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'moderator', description: "User name" }),
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, description: "User age" }),
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lviv', description: "User location" }),
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '21ui3ht4qpwopjI#OJIO%#*$&^*@#$&!@(*$&', description: "User token" }),
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1ui3ht4qpwopjI#OJIO%#*$&^*@#$&!@(*$&', description: "User retoken" }),
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "refresh_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+380564784', description: "User phone" }),
    (0, mongoose_1.Prop)({ type: String, minlength: 10, maxlength: 13 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3890000, description: "User telegram id" }),
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], User.prototype, "tgId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "09623wqer12r12rsfad55522", description: "User googleId example" }),
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: "User status" }),
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "ban", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verify", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=users.model.js.map