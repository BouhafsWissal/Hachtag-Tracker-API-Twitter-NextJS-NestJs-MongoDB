import { Test, TestingModule } from '@nestjs/testing';
import { OwnHashtagsService } from './own-hashtags.service';

describe('OwnHashtagsService', () => {
  let service: OwnHashtagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnHashtagsService],
    }).compile();

    service = module.get<OwnHashtagsService>(OwnHashtagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
