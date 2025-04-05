import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlgorithmController } from '@algorithm/algorithm.controller';
import { AlgorithmService } from '@algorithm/algorithm.service';
import { Algorithm } from '@algorithm/algorithm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Algorithm]),
  ],
  controllers: [AlgorithmController],
  providers: [AlgorithmService],
  exports: [AlgorithmService],
})
export class AlgorithmModule {}
