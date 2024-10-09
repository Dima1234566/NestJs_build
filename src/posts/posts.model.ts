/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";

export type PostDocument = Posts & Document;

@ApiTags("Posts")
@Schema({ versionKey: false, timestamps: true })
export class Posts extends Model<Posts> {
    @ApiProperty({ example: "тут буде пост", description: "users post" })
    @Prop({ type: String, required: [true, "title is required"] })
    title: string;

    @ApiProperty({ example: "тут буде опис", description: "users description" })
    @Prop({ type: String, required: [true, "description is required"], minlength: 5 })
    description: string;

    @ApiProperty({ example: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/640px-Macaca_nigra_self-portrait_large.jpg", description: "post photo " })
    @Prop({ type: String })
    img: string;

    @ApiProperty({ example: "Josephina", description: "тут буде ім'я юзера який добавить пост" })
    @Prop({ type: String, required: [true, "owner is required"] })
    owner: string;

    @ApiProperty({ example: "30.08.2024", description: "post created date" })
    @Prop({ type: Date, default: new Date })
    date: Date;

    @ApiProperty({ example: "тут буде комент", description: "users comment" })
    @Prop({ type: Array, default: [] })
    comments: [Comment];

    @ApiProperty({ example: "лайк або є або нема", description: "лайк" })
    @Prop({ type: Array, default: [] })
    likes: [];


}
export const PostSchema = SchemaFactory.createForClass(Posts);
export interface Comment {
    id: string;
    text: string;
    ownerName: string;
    date: Date;
}
