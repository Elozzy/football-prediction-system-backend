import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prediction, PredictionDocument } from './schemas/prediction.schema';

@Injectable()
export class PredictionsRepository {
  constructor(
    @InjectModel(Prediction.name) private model: Model<PredictionDocument>,
  ) {}

  async findByDate(date: string) {
    return this.model.findOne({ date }).exec();
  }

  async savePrediction(date: string, data: any) {
    return this.model.create({ date, data });
  }
}
