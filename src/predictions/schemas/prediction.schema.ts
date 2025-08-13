import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PredictionDocument = Prediction & Document;

@Schema({ timestamps: true })
export class Prediction {
  @Prop({ required: true })
  date: string;

  @Prop({ type: Object, required: true })
  data: any;
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
