import { User } from "./users.model";
export declare class CloudinaryService {
    private userModel;
    private readonly cloudinaryConfig;
    constructor(userModel: User);
    uploadImages(user: User, images: Express.Multer.File[]): Promise<void>;
    private uploadImage;
    deleteImage(user: User, photoId: string): Promise<void>;
}
