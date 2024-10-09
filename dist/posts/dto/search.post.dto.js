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
exports.QueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class QueryDto {
}
exports.QueryDto = QueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "тут буде пост", description: "users post" }),
    __metadata("design:type", String)
], QueryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "тут буде опис", description: "users description" }),
    __metadata("design:type", String)
], QueryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Josephina", description: "тут буде ім'я юзера який добавить пост" }),
    __metadata("design:type", String)
], QueryDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Josephina", description: "any" }),
    __metadata("design:type", String)
], QueryDto.prototype, "request", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "розмір сторінки" }),
    __metadata("design:type", Number)
], QueryDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2", description: "іторінка" }),
    __metadata("design:type", Number)
], QueryDto.prototype, "page", void 0);
//# sourceMappingURL=search.post.dto.js.map