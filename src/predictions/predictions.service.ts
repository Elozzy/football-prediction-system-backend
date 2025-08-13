import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PredictionsRepository } from './predictions.repository';
import axios from 'axios';

@Injectable()
export class PredictionsService {
  constructor(private readonly repo: PredictionsRepository) {}

  async getPredictionsByDate(date: string) {
    const cached = await this.repo.findByDate(date);
    if (cached) {
      return cached.data;
    }

    try {
      // Replace with a real API if available
      const apiUrl = `${process.env.API_BASE_URL}/predictions?date=${date}&apiKey=${process.env.API_KEY}`;
      const { data } = await axios.get(apiUrl);

      const filtered = data.matches.filter(
        (match: any) => match.predictions?.homeWin > 50,
      );

      await this.repo.savePrediction(date, filtered);

      return filtered;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to fetch predictions');
    }
  }
}
