import { IsDateString } from 'class-validator';

export class GetPredictionsDto {
  @IsDateString({}, { message: 'Invalid date format. Use YYYY-MM-DD.' })
  date: string;
}
