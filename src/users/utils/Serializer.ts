/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../users.model';
import { UsersService } from '../users.service';


@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('USER_SERVICE') private readonly usersService: UsersService,
    ) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    serializeUser(user: User, done: Function) {
        done(null, user);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    async deserializeUser(payload: any, done: Function) {
        const user = await this.usersService.findById(payload.id);
        return user ? done(null, user) : done(null, null);
    }
}