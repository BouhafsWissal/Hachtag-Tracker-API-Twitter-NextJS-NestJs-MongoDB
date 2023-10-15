/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TwitterModule } from './twitter/twitter.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnHashtagsModule } from './own-hashtags/own-hashtags.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mydatabase'),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    UsersModule,
    TwitterModule,
    OwnHashtagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
