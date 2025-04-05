import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Algorithm, AlgorithmSchema } from './algorithm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Algorithm.name, schema: AlgorithmSchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class AlgorithmModule {}
