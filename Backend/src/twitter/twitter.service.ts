/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Twitter, TwitterDocument } from './twitter';

@Injectable()
export class TwitterService {
  constructor(
    @InjectModel(Twitter.name) private readonly twitterModel: Model<TwitterDocument>,
  ) {}

  //async search(hashtag: string): Promise<TwitterDocument[]> {
  //  const query = encodeURIComponent(`#${hashtag}`);
  //  const searchUrl = `https://api.twitter.com/1.1/search/tweets.json?q=${query}`;

    // logique d'authentification et de requête vers l'API Twitter

  //  try {
  //   const response = await axios.get(searchUrl);
   //   const tweets = response.data.statuses;

   //  const publications: TwitterDocument[] = tweets.map((tweet: any) => {
   //     const { user, text } = tweet;
   //     return { username: user.screen_name, tweet: text };
   //   });

   //   return this.twitterModel.create(publications);
   // } catch (error) {
   //   throw new Error('An error occurred while searching on Twitter');
   // }
 // } 

 async createTwitter(tweetData: Partial<Twitter>): Promise<Twitter> {
  const createdTwitter = new this.twitterModel(tweetData);
  return createdTwitter.save();
}

async findByHashtag(hashtag: string): Promise<Twitter[]> {
  return this.twitterModel.find({ hashtag }).exec();
}

async deleteTwitter(id: string): Promise<Twitter> {
  return this.twitterModel.findByIdAndRemove(id).exec();
}

async getAllTwitter(): Promise<Twitter[]> {
  return this.twitterModel.find().exec();
}
}
