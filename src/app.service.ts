import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import * as DATA from '../database/data.json';

@Injectable()
export class AppService {
  async getBlogPost(query: {
    slug?: string;
    startDate?: string;
    author?: number;
  }) {
    return await new Promise((resolve, reject) => {
      let response = DATA.filter((obj) => obj.status === 'PUBLISHED');
      if (query.slug) {
        response = response.filter((obj) => obj.slug === query.slug);
      }
      if (query.startDate) {
        response = response.filter(
          (obj) => new Date(obj.publishedAt) >= new Date(query.startDate),
        );
      }
      if (query.author) {
        response = response.filter((obj) => obj.author === +query.author);
      }
      if (response.length == 0) {
        reject(new ForbiddenException('No such blog were found'));
      }
      resolve(response);
    });
  }
}
