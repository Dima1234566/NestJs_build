/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './posts.model';
import { UsersModule } from 'src/users/users.module';
import { TRANSPORTER_PROVIDER, UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/users.model';
import { JwtModule } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer'


@Module({
  providers: [{
    provide: TRANSPORTER_PROVIDER,
    useFactory: () => {
      return nodemailer.createTransport({
        host: 'smtp.i.ua', port: 465, secure: true, auth:
          { user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS }
      });
    }
  }, UsersService, PostsService],
  controllers: [PostsController],
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }),
    UsersModule, ConfigModule.forRoot({
      envFilePath: `.env`,
    }), MongooseModule.forFeature([{
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
export class PostsModule { }
