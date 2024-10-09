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
exports.UpdatePasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdatePasswordDto {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "example123", description: "User password example" }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "aBQtYdZ3xL2r61YDC6zcH7bv", description: "User Id example" }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "id", void 0);
//# sourceMappingURL=password.user.dto.js.map