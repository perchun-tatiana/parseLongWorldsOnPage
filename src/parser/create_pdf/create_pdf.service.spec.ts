import { Test, TestingModule } from '@nestjs/testing';
import { CreatePdfService } from './create_pdf.service';

describe('CreatePdfService', () => {
  let service: CreatePdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePdfService],
    }).compile();

    service = module.get<CreatePdfService>(CreatePdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
