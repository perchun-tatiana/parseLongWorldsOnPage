import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, catchError, map } from 'rxjs';

@Injectable()
export class ScratchPageService {
  constructor(private readonly httpService: HttpService) {}

  async getPage(url: string): Promise<String> {
    const request = this.httpService
      .get(url)
      .pipe(
        map((res) => {
          return res.data;
        }),
      )
      .pipe(
        catchError((err) => {
          return 'Error';
        }),
      );

    const result = await lastValueFrom(request);
console.log('result',result)
    return result;
  }
}
