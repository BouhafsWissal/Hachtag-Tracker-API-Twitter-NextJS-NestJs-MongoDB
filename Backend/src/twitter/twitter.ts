/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Twitter {

  @Prop()
  hashtag: string; // Ajout de l'attribut hashtag

  @Prop()
  owner: string; // Ajout de l'attribut owner

  @Prop()
  text:string //contenue texte de la publication 
  
  @Prop()
  content: string; // autre type de contenue de la publication 

  @Prop()
  replies: number; // Ajout de l'attribut replies

  @Prop()
  retweets: number; // Ajout de l'attribut retweets

  @Prop()
  likes: number; // Ajout de l'attribut likes

  @Prop()
  views: number; // Ajout de l'attribut views
}

export type TwitterDocument = Twitter & Document;
export const TwitterSchema = SchemaFactory.createForClass(Twitter);
