import { Test, TestingModule } from '@nestjs/testing';
import { ScratchPageService } from './scratch_page.service';

describe('ScratchPageService', () => {
  let service: ScratchPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScratchPageService],
    }).compile();

    service = module.get<ScratchPageService>(ScratchPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
