/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OwnHashtags {
  @Prop()
  idUser: string; // Ajout de l'attribut idUser

  @Prop()
  hashtag: string; // Ajout de l'attribut hashtag
}

export type OwnHashtagsDocument = OwnHashtags & Document;
export const OwnHashtagsSchema = SchemaFactory.createForClass(OwnHashtags);
