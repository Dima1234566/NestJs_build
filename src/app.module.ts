/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { Posts, PostSchema } from './posts/posts.model';
import { User, UserSchema } from './users/users.model';
import { JwtModule } from '@nestjs/jwt';
import { TelegramModule } from './telegram/telegram.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }),
  MongooseModule.forRoot(process.env.DB_HOST), ConfigModule.forRoot({
    envFilePath: `.env`,
  }), UsersModule, PostsModule, MongooseModule.forFeature([{
    name: Posts.name,
    schema: PostSchema,
    collection: "posts",
  },
  {
    name: User.name,
    schema: UserSchema,
    collection: "users"
  }]), TelegramModule, AdminModule],
  controllers: [],
  providers: [],
})

export class AppModule { }

