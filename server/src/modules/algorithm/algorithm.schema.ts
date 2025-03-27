import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'algorithms', timestamps: true })
export class Algorithm extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  difficulty: string; // 'Easy', 'Medium', 'Hard'

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ type: String, required: true })
  solution: string;

  @Prop({ type: Number, default: 0 })
  viewCount: number;
}

export const AlgorithmSchema = SchemaFactory.createForClass(Algorithm);
