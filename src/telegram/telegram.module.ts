/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TRANSPORTER_PROVIDER, UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { Posts, PostSchema } from 'src/posts/posts.model';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { JwtModule } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer'


@Module({

  providers: [{
    provide: TRANSPORTER_PROVIDER,
    useFactory: () => {
      return nodemailer.createTransport({ host: 'smtp.i.ua', port: 465, secure: true, auth: { user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS } });
    }
  }, TelegramService, UsersService, PostsService],
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }), UsersModule, PostsModule, MongooseModule.forFeature([{
    name: Posts.name,
    schema: PostSchema,
    collection: "posts",
  },
  {
    name: User.name,
    schema: UserSchema,
    collection: "users"
  }])]
})
export class TelegramModule { }

