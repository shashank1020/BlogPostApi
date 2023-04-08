import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBlog(@Query() query: {slug?: string, startDate?: string, author?: number}): Promise<unknown> {
    const { slug, startDate, author } = query;
    return this.appService.getBlogPost({ slug, startDate, author });
  }
}
