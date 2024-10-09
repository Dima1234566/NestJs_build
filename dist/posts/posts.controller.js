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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_post_dto_1 = require("./dto/create.post.dto");
const posts_service_1 = require("./posts.service");
const posts_model_1 = require("./posts.model");
const update_post_dto_1 = require("./dto/update.post.dto");
const coment_post_dto_1 = require("./dto/coment.post.dto");
const search_post_dto_1 = require("./dto/search.post.dto");
let PostsController = class PostsController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(post, req) {
        return await this.postService.createPost(post, req);
    }
    async findAllPosts(req, page, size) {
        return await this.postService.findAllPosts(req, page, size);
    }
    async findPostById(id) {
        return await this.postService.findPostById(id);
    }
    async updatePost(post, id) {
        return await this.postService.updatePost(post, id);
    }
    async findAndDelete(id) {
        return await this.postService.findAndDelete(id);
    }
    async addCommentsPost(comment, id, user) {
        return await this.postService.addComments(comment, id, user);
    }
    async deleteCommentFromComments(id, commentId) {
        return await this.postService.deleteComments(id, commentId);
    }
    async searchPost(query) {
        return await this.postService.searchPosts(query);
    }
    async likes(id, req) {
        return await this.postService.likes(id, req);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create Post" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: posts_model_1.Posts }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get all posts" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: posts_model_1.Posts }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAllPosts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get post by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: posts_model_1.Posts }),
    (0, common_1.Get)("/find/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findPostById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update Post" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: posts_model_1.Posts }),
    (0, common_1.Put)("/update/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_post_dto_1.UpdatePostDto, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete post by id" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: posts_model_1.Posts }),
    (0, common_1.Delete)("/delete/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAndDelete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Add Comment to post" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: posts_model_1.Posts }),
    (0, common_1.Put)("/comment/:id/:user"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coment_post_dto_1.CommentPostDto, String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addCommentsPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete Comment from comments to post" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: posts_model_1.Posts }),
    (0, common_1.Delete)("/comment/:id/:commentId"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deleteCommentFromComments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Search post" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: posts_model_1.Posts }),
    (0, swagger_1.ApiQuery)({ name: 'request', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'owner', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'description', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'size', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_post_dto_1.QueryDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "searchPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Post LIKE" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: posts_model_1.Posts }),
    (0, swagger_1.ApiBearerAuth)("BearerAuthMethod"),
    (0, common_1.Post)("/post-like/:id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "likes", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)("Posts"),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map