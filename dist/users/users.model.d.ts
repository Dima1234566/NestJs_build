import { Model } from "mongoose";
export type UserDocument = User & Document;
export declare enum UserRoles {
    admin = 0,
    user = 1,
    moderator = 2
}
export declare class User extends Model<User> {
    role: UserRoles;
    email: string;
    password: string;
    photos: [Photo];
    firstName: string;
    age: number;
    location: string;
    access_token: string;
    refresh_token: string;
    phone: string;
    tgId: number;
    googleId: string;
    ban: boolean;
    verify: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export interface Photo {
    id: string;
    url: string;
}
