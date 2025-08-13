import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { PredictionsRepository } from './predictions.repository';
import { Prediction, PredictionSchema } from './schemas/prediction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Prediction.name, schema: PredictionSchema },
    ]),
  ],
  controllers: [PredictionsController],
  providers: [PredictionsService, PredictionsRepository],
})
export class PredictionsModule {}
