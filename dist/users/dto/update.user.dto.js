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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "example@gmail.com", description: "User email example" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [], description: "User photo" }),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "example123", description: "User name example" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "15", description: "User age" }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Lviv", description: "User location example" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0962355522", description: "User phone number example" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "розмір сторінки" }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2", description: "іторінка" }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "page", void 0);
//# sourceMappingURL=update.user.dto.js.map