/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.model";
import { createReadStream } from "fs";
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    private readonly cloudinaryConfig: any;
    constructor(
        @InjectModel(User.name) private userModel: User,
    ) {
        this.cloudinaryConfig = {
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.CLOUDYNARY_APIKEY,
            api_secret: process.env.CLOUDYNARY_SECRET,
        }
    }
    async uploadImages(user: User, images: Express.Multer.File[]) {
        const validateImage = images.filter(async (image) => image && image.path);
        const uploadPromises = validateImage.map(async (image) => await this.uploadImage(user, image));
        await Promise.all(uploadPromises);

    }
    private async uploadImage(user: User, image: Express.Multer.File): Promise<void> {

        if (!image || !image.path) {
            console.log("invalid image");
            return;
        }

        const stream = createReadStream(image.path);
        return new Promise(async (resolve, reject) => {
            try {
                const cloudinaryStream = cloudinary.uploader.upload_stream(
                    {
                        folder: `user-${user.id}`,
                        public_id: image.filename,
                        ...this.cloudinaryConfig,
                    },
                    async (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            const url = {
                                id: result.public_id,
                                url: result.secure_url,
                            };
                            const imageArr = [];
                            imageArr.push(...user.photos);
                            imageArr.push(url);



                            await this.userModel.findByIdAndUpdate(
                                { _id: user.id },
                                {
                                    $set: { photos: imageArr },
                                },
                            );
                            resolve();
                        }
                    },
                );

                stream.pipe(cloudinaryStream);
            } catch (error) {
                reject(error);
            }
        });
    }


    async deleteImage(user: User, photoId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                cloudinary.uploader.destroy(photoId, { ...this.cloudinaryConfig },
                    async (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            const updatedPhoto = user.photos.filter((image) => image.id !== photoId)

                            await this.userModel.findByIdAndUpdate(
                                { _id: user.id },
                                {
                                    $set: { photos: updatedPhoto },
                                },
                            );
                            resolve();
                        }
                    },
                );
            } catch (error) {
                reject(error);
            }
        });

    }



}
