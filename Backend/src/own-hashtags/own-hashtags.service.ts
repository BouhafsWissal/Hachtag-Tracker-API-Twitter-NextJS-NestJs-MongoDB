import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OwnHashtags, OwnHashtagsDocument } from './own-hashtags.entity';

@Injectable()
export class OwnHashtagsService {
  constructor(
    @InjectModel(OwnHashtags.name)
    private ownHashtagsModel: Model<OwnHashtagsDocument>,
  ) {}

  async create(
    createOwnHashtagsDto: Partial<OwnHashtags>,
  ): Promise<OwnHashtags> {
    const createdOwnHashtags = new this.ownHashtagsModel(createOwnHashtagsDto);
    return createdOwnHashtags.save();
  }

  async findAll(): Promise<OwnHashtags[]> {
    return this.ownHashtagsModel.find().exec();
  }

  async findOneById(id: string): Promise<OwnHashtags> {
    return this.ownHashtagsModel.findById(id).exec();
  }

  // Recuperer les hachtags avec l'id du user authentifié
  async findByUserId(idUser: string): Promise<OwnHashtags[]> {
    return this.ownHashtagsModel.find({ idUser }).exec();
  }

  async delete(id: string): Promise<OwnHashtags> {
    return this.ownHashtagsModel.findByIdAndRemove(id).exec();
  }
}
