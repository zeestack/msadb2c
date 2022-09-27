import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './http/axios.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
