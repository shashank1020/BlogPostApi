import { Controller, Get, Query } from '@nestjs/common';
import {AppService, Blog} from './app.service';
import {getBlogsParamsSchema, joiValidate} from "./validation";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBlog(@Query() queryParams: {slug?: string, startDate?: string, author?: number}): Promise<Blog[]> {
    const { slug, startDate, author } = joiValidate(
      getBlogsParamsSchema,
      queryParams,
    );
    return this.appService.getBlogPost({ slug, startDate, author });
  }
}
