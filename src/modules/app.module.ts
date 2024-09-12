import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database.config';
import { ContentModule } from './content/content.module';
import { ContentWebsiteModule } from './content-website/content-website.module';
import { ScreensModule } from './screens/screens.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'temp', 'upload'),
      serveRoot: '/temp',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => databaseConfig(ConfigService),
      inject: [ConfigService],
    }),
    ContentModule,
    ContentWebsiteModule,
    ScreensModule,
    PlaylistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
