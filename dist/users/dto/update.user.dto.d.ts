import { Photo } from "../users.model";
export declare class UpdateUserDto {
    readonly email?: string;
    readonly photos?: [Photo];
    readonly name?: string;
    readonly age?: number;
    readonly location?: string;
    readonly phone?: string;
    readonly size?: number;
    readonly page?: number;
}
