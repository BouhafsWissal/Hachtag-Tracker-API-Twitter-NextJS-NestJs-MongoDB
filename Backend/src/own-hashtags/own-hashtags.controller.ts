import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OwnHashtags } from './own-hashtags.entity';
import { OwnHashtagsService } from './own-hashtags.service';

@Controller('ownHashtags')
export class OwnHashtagsController {
  constructor(private readonly ownHashtagsService: OwnHashtagsService) {}

  @Post()
  create(
    @Body() createOwnHashtagsDto: Partial<OwnHashtags>,
  ): Promise<OwnHashtags> {
    return this.ownHashtagsService.create(createOwnHashtagsDto);
  }

  @Get()
  findAll(): Promise<OwnHashtags[]> {
    return this.ownHashtagsService.findAll();
  }

  // Assurez-vous que cette route est définie après la route pour "byUserId"
  @Get('byUserId/:idUser')
  findByUserId(@Param('idUser') idUser: string): Promise<OwnHashtags[]> {
    return this.ownHashtagsService.findByUserId(idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OwnHashtags> {
    return this.ownHashtagsService.findOneById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<OwnHashtags> {
    return this.ownHashtagsService.delete(id);
  }
}
