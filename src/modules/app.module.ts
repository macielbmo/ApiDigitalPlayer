import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database.config';
import { UploadContentModule } from './upload-content/upload-content.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => databaseConfig(ConfigService),
      inject: [ConfigService],
    }),
    UploadContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
