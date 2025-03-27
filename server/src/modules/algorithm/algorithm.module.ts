import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlgorithmController } from './algorithm.controller';
import { AlgorithmService } from './algorithm.service';
import { Algorithm, AlgorithmSchema } from './algorithm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Algorithm.name, schema: AlgorithmSchema },
    ]),
  ],
  controllers: [AlgorithmController],
  providers: [AlgorithmService],
  exports: [AlgorithmService],
})
export class AlgorithmModule {}
