/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TRANSPORTER_PROVIDER, UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './utils/GoogleStategy';
import { SessionSerializer } from './utils/Serializer';
import { CloudinaryService } from './cloudinary.service';
import * as nodemailer from 'nodemailer'

@Module({
  controllers: [UsersController],
  providers: [{
    provide: TRANSPORTER_PROVIDER,
    useFactory: () => {
      return nodemailer.createTransport({ host: 'smtp.i.ua', port: 465, secure: true, auth: { user: process.env.MAIL_LOG, pass: process.env.MAIL_PASS } });
    }
  }, CloudinaryService, ConfigService, UsersService, GoogleStrategy, SessionSerializer, { provide: 'USER_SERVICE', useClass: UsersService }],
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1day' } }),
  ConfigModule.forRoot({
    envFilePath: `.env`,
  }),
  MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema,
    collection: "users"
  }])]
})
export class UsersModule { }
