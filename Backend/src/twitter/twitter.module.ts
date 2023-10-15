/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';
import { TwitterSchema, Twitter } from './twitter';

@Module({
  imports: [MongooseModule.forFeature([{ name: Twitter.name, schema: TwitterSchema }])],
  controllers: [TwitterController],
  providers: [TwitterService],
  exports: [TwitterService],
})
export class TwitterModule {}

