import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
