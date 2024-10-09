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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_model_1 = require("../users/users.model");
const posts_model_1 = require("./posts.model");
const users_service_1 = require("../users/users.service");
const uuid_1 = require("uuid");
let PostsService = class PostsService {
    constructor(userModel, postModel, userService) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.userService = userService;
    }
    async createPost(post, req) {
        try {
            if (!post) {
                return console.log("нема посту");
            }
            const user = await this.userService.findToken(req);
            if (!user) {
                return console.log("not authorization");
            }
            if (user.role === 'user' || 'admin') {
                const { title, description } = post;
                const regPost = await this.postModel.create({
                    title: title,
                    description: description,
                    owner: user._id
                });
                return regPost;
            }
            else
                console.log("External Error");
        }
        catch (error) {
            console.error(error);
        }
    }
    async findAllPosts(req, page, size) {
        try {
            const currentPage = page || 1;
            const currentSize = size || 5;
            const totalCount = await this.postModel.countDocuments();
            const totalPages = Math.ceil(totalCount / currentSize);
            const offSet = (currentPage - 1) * currentSize;
            const user = await this.userService.findToken(req);
            if (user.role === 'user' || 'admin') {
                const result = await this.postModel.find().limit(currentSize).skip(offSet);
                return { totalPages: totalPages, currentPage: currentPage, data: result };
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async findPostById(id) {
        try {
            return await this.postModel.findById(id);
        }
        catch (error) {
            console.error(error);
        }
    }
    async updatePost(post, id) {
        try {
            if (!post) {
                return console.log("пусто, дай дані");
            }
            const updateUser = await this.postModel.findByIdAndUpdate(id, {
                title: post.title,
                description: post.description,
                img: post.img,
            });
            return updateUser;
        }
        catch (error) {
            console.error(error);
        }
    }
    async findAndDelete(req) {
        try {
            const user = await this.userService.findToken(req);
            if (user.role === 'admin') {
                return await this.postModel.findByIdAndDelete(user.id);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async addComments(comment, id, user) {
        try {
            if (!comment) {
                return console.log("пусто, дай дані");
            }
            const findUser = await this.userModel.findById(user);
            if (findUser) {
                const findPost = await this.postModel.findById(id);
                if (!findPost) {
                    return console.log("post not found");
                }
                else {
                    const commentFromPost = {
                        id: (0, uuid_1.v4)(),
                        text: comment.comments.text,
                        date: new Date(),
                        ownerName: user,
                    };
                    console.log(commentFromPost);
                    findPost.comments.push(commentFromPost);
                    await this.postModel.updateOne({ _id: id }, { $set: { comments: findPost.comments } });
                    return await this.postModel.findById(id);
                }
            }
            else {
                return console.log("user not found");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteComments(id, commentId) {
        try {
            if (!id && !commentId) {
                return console.log("пусто, дай дані");
            }
            const postToDelete = await this.postModel.findById(id);
            if (!postToDelete) {
                return console.log("post not found");
            }
            else {
                const arrToUpdate = postToDelete.comments.filter((comment) => comment.id !== commentId);
                await this.postModel.findByIdAndUpdate({ _id: id }, { $set: { comments: arrToUpdate } });
                return await this.postModel.findById(id);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async mergeAndRemoveDuplicates(...arrays) {
        const mergedArray = [].concat(...arrays);
        const uniqueArray = mergedArray.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
        return uniqueArray;
    }
    async searchPosts(query) {
        try {
            const { request, title, owner, description, page, size } = query;
            const currentPage = page || 1;
            const currentSize = size || 5;
            if (request) {
                const regex = new RegExp(request, 'i');
                const titleArr = await this.postModel.find({ title: { $regex: regex } }).select("_id title description owner date comments");
                const ownerArr = await this.postModel.find({ owner: { $regex: regex } }).select("_id title description owner date comments");
                const descriptionArr = await this.postModel.find({ description: { $regex: regex } }).select("_id title description owner date comments");
                const searchedArr = await this.mergeAndRemoveDuplicates(titleArr, ownerArr, descriptionArr);
                const totalCount = searchedArr.length;
                const totalPages = Math.ceil(totalCount / currentSize);
                return { totalPages: totalPages, currentPage: currentPage, data: searchedArr };
            }
            else if (title) {
                const regex = new RegExp(title, 'i');
                const titleArrays = await this.postModel.find({ title: { $regex: regex } }).select("_id title description owner date comments");
                const totalCount = titleArrays.length;
                const totalPages = Math.ceil(totalCount / currentSize);
                return { totalPages: totalPages, currentPage: currentPage, data: titleArrays };
            }
            else if (owner) {
                const regex = new RegExp(owner, 'i');
                const ownerArr = await this.postModel.find({ owner: { $regex: regex } }).select("_id title description owner date comments");
                const totalCount = ownerArr.length;
                const totalPages = Math.ceil(totalCount / currentSize);
                return { totalPages: totalPages, currentPage: currentPage, data: ownerArr };
            }
            else if (description) {
                const regex = new RegExp(description, 'i');
                const descriptionArr = await this.postModel.find({ description: { $regex: regex } }).select("_id title description owner date comments");
                const totalCount = descriptionArr.length;
                const totalPages = Math.ceil(totalCount / currentSize);
                return { totalPages: totalPages, currentPage: currentPage, data: descriptionArr };
            }
            else {
                const currentPage = page || 1;
                const currentSize = size || 5;
                const totalCount = await this.postModel.countDocuments();
                const totalPages = Math.ceil(totalCount / currentSize);
                const offSet = (currentPage - 1) * currentSize;
                const result = await this.postModel.find().limit(currentSize).skip(offSet).select("_id title description owner date comments");
                return { totalPages: totalPages, currentPage: currentPage, data: result };
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async likes(id, req) {
        try {
            const user = await this.userService.findToken(req);
            const post = await this.postModel.findById(id);
            if (!user) {
                console.log("не залогований юзер");
            }
            if (!post) {
                console.log("postu nema");
            }
            else {
                const arrayy = post.likes;
                const existId = arrayy.some(likeUserid => likeUserid.toString() === user.id);
                if (existId) {
                    const deleteLike = arrayy.filter(userLikeId => userLikeId.toString() !== user.id);
                    await this.postModel.findByIdAndUpdate(post._id, { $set: { likes: deleteLike } });
                    return await this.postModel.findById(post._id);
                }
                else {
                    arrayy.push(user._id);
                    await this.postModel.findByIdAndUpdate(post._id, { $set: { likes: arrayy } });
                    return await this.postModel.findById(post._id);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(posts_model_1.Posts.name)),
    __metadata("design:paramtypes", [users_model_1.User,
        posts_model_1.Posts,
        users_service_1.UsersService])
], PostsService);
//# sourceMappingURL=posts.service.js.map