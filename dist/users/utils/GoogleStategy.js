"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = exports.GOOGLE_CLIENT_SECRET = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const users_service_1 = require("../users.service");
exports.GOOGLE_CLIENT_SECRET = 'MRkVmozGIDV8OP2eG1SKW9Dg';
const GOOGLE_CLIENT_ID = '160861531145-juj15dk6h1kapcvti9f40rih6d5gvmrm.apps.googleusercontent.com';
const GOOGLE_REDIRECT = 'http://localhost:5000/users/google/redirect';
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(userService) {
        super({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: exports.GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_REDIRECT,
            scope: ['email', 'profile'],
        });
        this.userService = userService;
    }
    async validate(accessToken, refreshToken, profile) {
        try {
            const user = await this.userService.validateUser({
                email: profile.emails[0].value,
                password: profile.id + accessToken,
                firstName: profile.name.givenName,
                googleId: profile.id,
            });
            return user || null;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], GoogleStrategy);
//# sourceMappingURL=GoogleStategy.js.map