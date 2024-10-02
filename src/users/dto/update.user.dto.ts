/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Photo } from "../users.model";

export class UpdateUserDto {
    @ApiProperty({ example: "example@gmail.com", description: "User email example" })
    readonly email?: string;
    @ApiProperty({ example: [], description: "User photo" })
    readonly photos?: [Photo];
    @ApiProperty({ example: "example123", description: "User name example" })
    readonly name?: string;
    @ApiProperty({ example: "15", description: "User age" })
    readonly age?: number;
    @ApiProperty({ example: "Lviv", description: "User location example" })
    readonly location?: string;
    @ApiProperty({ example: "0962355522", description: "User phone number example" })
    readonly phone?: string;
    @ApiProperty({ example: "1", description: "розмір сторінки" })
    readonly size?: number;
    @ApiProperty({ example: "2", description: "іторінка" })
    readonly page?: number;

}