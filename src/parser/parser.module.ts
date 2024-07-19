import { Module } from '@nestjs/common';
import { ParseController } from './parse/parse.controller';
import {HttpModule} from "@nestjs/axios"
import { ScratchPageService } from './scratch_page/scratch_page.service';
import { CreatePdfService } from './create_pdf/create_pdf.service';

@Module({
  imports:[HttpModule],
  controllers: [ParseController],
  providers: [ScratchPageService, CreatePdfService]
})
export class ParserModule {}
