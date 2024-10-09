import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './users.model';
import { UpdatePasswordDto } from './dto/password.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { CloudinaryService } from './cloudinary.service';
import { ForgotPasswordDto } from './dto/forgor.pass.dto';
export declare class UsersController {
    private readonly userService;
    private readonly cloudinaryService;
    constructor(userService: UsersService, cloudinaryService: CloudinaryService);
    create(user: CreateUserDto): Promise<User>;
    googleLogin(): void;
    googleRedirect(res: any, req: any): Promise<any>;
    findUsers(): Promise<User>;
    findUserById(id: string, req: any): Promise<User>;
    update(password: UpdatePasswordDto): Promise<User>;
    updateUser(user: UpdateUserDto, query: any): Promise<User>;
    uploadPhoto(req: any, images: Express.Multer.File[]): Promise<User>;
    deletePhotoById(req: any, imageId: string): Promise<User>;
    deleteById(id: string): Promise<User>;
    logIn(user: LoginUserDto): Promise<User>;
    logOut(req: any): Promise<User>;
    forgotPass(data: ForgotPasswordDto): Promise<void>;
    findLocation(query: CreateUserDto): Promise<{
        totalPages: number;
        currentPage: number;
        data: any;
    }>;
    refreshToken(refresh: {
        refresh_token: string;
    }): Promise<{
        access_token: any;
        refresh_token: any;
    }>;
    verifyEmail(id: string): Promise<User>;
    favorites(id: string, req: any): Promise<User>;
    deleteFromFavorites(id: string, req: any): Promise<User>;
}
