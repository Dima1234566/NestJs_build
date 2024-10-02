/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty({ example: "тут буде пост", description: "users post" })
    readonly title?: string;
    @ApiProperty({ example: "тут буде опис", description: "users description" })
    readonly description?: string;
    @ApiProperty({ example: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/640px-Macaca_nigra_self-portrait_large.jpg", description: "post photo " })
    readonly img?: string;





}
