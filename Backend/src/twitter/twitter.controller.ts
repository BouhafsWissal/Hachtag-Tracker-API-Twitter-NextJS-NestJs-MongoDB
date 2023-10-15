/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { Twitter} from './twitter';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

 // @Get('/search')
//  async search(@Query('hashtag') hashtag: string): Promise<TwitterDocument[]> {
 //   return this.twitterService.search(hashtag);
 // } 

// ajout d'une publication twitter 
 @Post()
 async createTwitter(@Body() tweetData: Partial<Twitter>): Promise<Twitter> {
   return this.twitterService.createTwitter(tweetData);
 }
// recherche de publications avec hachtag 
 @Get('hashtag/:hashtag')
 async findByHashtag(@Param('hashtag') hashtag: string): Promise<Twitter[]> {
   return this.twitterService.findByHashtag(hashtag);
 }
//supression d'une publication 
 @Delete(':id')
 async deleteTwitter(@Param('id') id: string): Promise<Twitter> {
   return this.twitterService.deleteTwitter(id);
 }
//affichage de toutes les publications 
 @Get()
 async getAllTwitter(): Promise<Twitter[]> {
   return this.twitterService.getAllTwitter();
 }
}
