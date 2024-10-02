/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { UsersService } from '../users.service';


export const GOOGLE_CLIENT_SECRET = 'MRkVmozGIDV8OP2eG1SKW9Dg';
const GOOGLE_CLIENT_ID = '160861531145-juj15dk6h1kapcvti9f40rih6d5gvmrm.apps.googleusercontent.com';
const GOOGLE_REDIRECT = 'http://localhost:5000/users/google/redirect';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly userService: UsersService) {
        super({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_REDIRECT,
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        try {
            const user = await this.userService.validateUser({
                email: profile.emails[0].value,
                password: profile.id + accessToken,
                firstName: profile.name.givenName,
                googleId: profile.id,
            });
            return user || null;
        } catch (e) {
            console.log(e);
        }
    }
}