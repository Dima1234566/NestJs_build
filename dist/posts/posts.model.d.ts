import { Model } from "mongoose";
export type PostDocument = Posts & Document;
export declare class Posts extends Model<Posts> {
    title: string;
    description: string;
    img: string;
    owner: string;
    date: Date;
    comments: [Comment];
}
export declare const PostSchema: import("mongoose").Schema<Posts, Model<Posts, any, any, any, import("mongoose").Document<unknown, any, Posts> & Posts & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Posts, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Posts>> & import("mongoose").FlatRecord<Posts> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export interface Comment {
    id: string;
    text: string;
    ownerName: string;
    date: Date;
}
