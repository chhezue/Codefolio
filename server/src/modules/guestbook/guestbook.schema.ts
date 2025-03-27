import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'guestbooks', timestamps: true })
export class GuestBook {
  @Prop({ type: String, required: true })
  name: string; // 이름

  @Prop({ type: String, required: true })
  message: string; // 내용

  @Prop({ type: String, required: true })
  password: string; // 비밀번호
}

export const GuestbookSchema = SchemaFactory.createForClass(GuestBook);

export const GuestBookFeature = MongooseModule.forFeature([
  { name: GuestBook.name, schema: GuestbookSchema },
]);
