/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({ example: "тут буде пост", description: "users post" })
    readonly title: string;
    @ApiProperty({ example: "тут буде опис", description: "users description" })
    readonly description: string;



}


