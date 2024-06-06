import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName?: string;

  @Prop()
  email?: string;

  @Prop({ required: true })
  gender: string;

  @Prop()
  birthDay?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
