import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { CheckauthorInterceptor } from '../checkauthor.interceptor';
import { Article } from './interfaces/article.interface';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Post()
  @UseInterceptors(CheckauthorInterceptor)
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    return this.articlesService.delete(id);
  }
}
