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
exports.GoogleUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GoogleUserDto {
}
exports.GoogleUserDto = GoogleUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "example@gmail.com", description: "User email example" }),
    __metadata("design:type", String)
], GoogleUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "example123", description: "User password example" }),
    __metadata("design:type", String)
], GoogleUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "09623wqer12r12rsfad55522", description: "User googleId example" }),
    __metadata("design:type", String)
], GoogleUserDto.prototype, "googleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "tolya uso", description: "User first name example" }),
    __metadata("design:type", String)
], GoogleUserDto.prototype, "firstName", void 0);
//# sourceMappingURL=google.user.dto.js.map