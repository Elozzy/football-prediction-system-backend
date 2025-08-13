import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { PredictionsService } from './predictions.service';
import { GetPredictionsDto } from './dto/get-predictions.dto';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly service: PredictionsService) {}

  @Get()
  async getPredictions(
    @Query(new ValidationPipe({ transform: true })) query: GetPredictionsDto,
  ) {
    return this.service.getPredictionsByDate(query.date);
  }
}
