import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './auth.service';
import { HttpExceptionFilter } from './exceptions/exception.filter';
import { CatchErrorInterceptor } from './interceptors/catchError.interceptor';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new CatchErrorInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: object) {
    return this.appService.login(user);
  }
}
