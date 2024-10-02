/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "../posts.model";

export class CommentPostDto {
    @ApiProperty({
        example: { text: 'ttetext' }, description: "User comment"
    })
    readonly comments: Comment;



}
