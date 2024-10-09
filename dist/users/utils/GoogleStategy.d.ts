import { Strategy, Profile } from 'passport-google-oauth20';
import { UsersService } from '../users.service';
export declare const GOOGLE_CLIENT_SECRET = "MRkVmozGIDV8OP2eG1SKW9Dg";
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any>;
}
export {};
