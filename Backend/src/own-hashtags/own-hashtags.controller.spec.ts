import { Test, TestingModule } from '@nestjs/testing';
import { OwnHashtagsController } from './own-hashtags.controller';

describe('OwnHashtagsController', () => {
  let controller: OwnHashtagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnHashtagsController],
    }).compile();

    controller = module.get<OwnHashtagsController>(OwnHashtagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
