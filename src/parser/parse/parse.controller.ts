import {
  Controller,
  Post,
  Body,
  Res,
  ForbiddenException,
} from '@nestjs/common';
import { convert } from 'html-to-text';
import type { Response } from 'express';

import { ScratchPageService } from '../scratch_page/scratch_page.service';
import { CreatePdfService } from '../create_pdf/create_pdf.service';

@Controller('parse')
export class ParseController {
  constructor(
    private readonly scratchPage: ScratchPageService,
    private readonly createPdf: CreatePdfService,
  ) {}

  @Post()
  async pdfFromPage(
    @Body() body: { url: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const page = await this.scratchPage.getPage(body.url);
    if (page == 'Error') {
      throw new ForbiddenException('API not available');
    }

    const text = convert(page, {
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: 'a', options: { ignoreHref: true } },
      ],
    });

    console.log('text', text)
    
    const wordsArr: [string] = text.match(/\p{L}+/gu);
    wordsArr.sort((first: string, second: string) => {
      return second.length - first.length;
    });
    const result = wordsArr.slice(0, 10).join('\n').toString();

    console.log('wordsArr',wordsArr)

    const pdfBuffer = await this.createPdf.getBuffer(wordsArr.slice(0, 10), body.url);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
