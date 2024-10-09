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
exports.UpdatePostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdatePostDto {
}
exports.UpdatePostDto = UpdatePostDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "тут буде пост", description: "users post" }),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "тут буде опис", description: "users description" }),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/640px-Macaca_nigra_self-portrait_large.jpg", description: "post photo " }),
    __metadata("design:type", String)
], UpdatePostDto.prototype, "img", void 0);
//# sourceMappingURL=update.post.dto.js.map