/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class QueryDto {
    @ApiProperty({ example: "тут буде пост", description: "users post" })
    readonly title?: string;
    @ApiProperty({ example: "тут буде опис", description: "users description" })
    readonly description?: string;
    @ApiProperty({ example: "Josephina", description: "тут буде ім'я юзера який добавить пост" })
    readonly owner?: string;
    @ApiProperty({ example: "Josephina", description: "any" })
    readonly request?: string;
    @ApiProperty({ example: "1", description: "розмір сторінки" })
    readonly size?: number;
    @ApiProperty({ example: "2", description: "іторінка" })
    readonly page?: number;
}

