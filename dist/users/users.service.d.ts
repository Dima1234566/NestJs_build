import { User } from './users.model';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordDto } from './dto/password.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { GoogleUserDto } from './dto/google.user.dto';
import * as nodemailer from 'nodemailer';
export declare const TRANSPORTER_PROVIDER = "TRANSPORTER_PROVIDER";
export declare class UsersService {
    private readonly jwtService;
    private userModel;
    private transporter;
    constructor(jwtService: JwtService, userModel: User, transporter: nodemailer.Transporter);
    createUser(user: CreateUserDto): Promise<any>;
    findAllUsers(): Promise<any>;
    findUserById(id: string, req: any): Promise<any>;
    findById(id: string): Promise<User>;
    updateUserPassword(passwordAndId: UpdatePasswordDto): Promise<any>;
    updateUser(data: UpdateUserDto, query: any): Promise<any>;
    findAndDelete(id: string): Promise<any>;
    userLogin(user: LoginUserDto): Promise<any>;
    userLogout(req: any): Promise<any>;
    createToken(userId: string): Promise<any>;
    findToken(req: any): Promise<any>;
    refreshToken(refresh: {
        refresh_token: string;
    }): Promise<{
        access_token: any;
        refresh_token: any;
    }>;
    findLocationUser(query: UpdateUserDto): Promise<{
        totalPages: number;
        currentPage: number;
        data: any;
    }>;
    validateUser(details: GoogleUserDto): Promise<any>;
    forgotPassword(email: string): Promise<void>;
    verification(userId: string): Promise<any>;
    sendVerify(regUser: User): Promise<void>;
    favorites(id: string, req: any): Promise<User>;
    deleteFromFavorites(id: string, req: any): Promise<User>;
}
