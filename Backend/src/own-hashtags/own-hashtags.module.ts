import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnHashtags, OwnHashtagsSchema } from './own-hashtags.entity';
import { OwnHashtagsController } from './own-hashtags.controller';
import { OwnHashtagsService } from './own-hashtags.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OwnHashtags.name, schema: OwnHashtagsSchema },
    ]),
  ],
  controllers: [OwnHashtagsController],
  providers: [OwnHashtagsService],
})
export class OwnHashtagsModule {}
