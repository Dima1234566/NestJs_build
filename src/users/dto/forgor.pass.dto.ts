/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
    @ApiProperty({ example: "example@gmail.com", description: "User email example" })
    readonly email: string;


}