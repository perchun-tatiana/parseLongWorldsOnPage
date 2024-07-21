import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class CreatePdfService {
  async getBuffer(text: Array<string>, url: string): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      doc.font(`${__dirname}/Arial.ttf`);

      doc.fontSize(16);
      const textUrl = url.length < 30 ? url : url.substring(0, 50) + '...';
      doc.text(`Список 10 самых длинных слов страницы: \n${textUrl}`, 10, 10);
      doc.fontSize(14);
      doc.list(text, 30, 50);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });
    return pdfBuffer;
  }
}
