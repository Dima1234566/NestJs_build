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
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_model_1 = require("./users.model");
const fs_1 = require("fs");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    constructor(userModel) {
        this.userModel = userModel;
        this.cloudinaryConfig = {
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.CLOUDYNARY_APIKEY,
            api_secret: process.env.CLOUDYNARY_SECRET,
        };
    }
    async uploadImages(user, images) {
        const validateImage = images.filter(async (image) => image && image.path);
        const uploadPromises = validateImage.map(async (image) => await this.uploadImage(user, image));
        await Promise.all(uploadPromises);
    }
    async uploadImage(user, image) {
        if (!image || !image.path) {
            console.log("invalid image");
            return;
        }
        const stream = (0, fs_1.createReadStream)(image.path);
        return new Promise(async (resolve, reject) => {
            try {
                const cloudinaryStream = cloudinary_1.v2.uploader.upload_stream(Object.assign({ folder: `user-${user.id}`, public_id: image.filename }, this.cloudinaryConfig), async (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const url = {
                            id: result.public_id,
                            url: result.secure_url,
                        };
                        const imageArr = [];
                        imageArr.push(...user.photos);
                        imageArr.push(url);
                        await this.userModel.findByIdAndUpdate({ _id: user.id }, {
                            $set: { photos: imageArr },
                        });
                        resolve();
                    }
                });
                stream.pipe(cloudinaryStream);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async deleteImage(user, photoId) {
        return new Promise(async (resolve, reject) => {
            try {
                cloudinary_1.v2.uploader.destroy(photoId, Object.assign({}, this.cloudinaryConfig), async (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const updatedPhoto = user.photos.filter((image) => image.id !== photoId);
                        await this.userModel.findByIdAndUpdate({ _id: user.id }, {
                            $set: { photos: updatedPhoto },
                        });
                        resolve();
                    }
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_model_1.User.name)),
    __metadata("design:paramtypes", [users_model_1.User])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map