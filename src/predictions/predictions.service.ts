import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PredictionsRepository } from './predictions.repository';
import axios from 'axios';

@Injectable()
export class PredictionsService {
  constructor(private readonly repo: PredictionsRepository) {}

  async getPredictionsByDate(date: string, refresh = false) {
    if (!refresh) {
      const cached = await this.repo.findByDate(date);
      if (cached) {
        console.log(`✅ Returning cached data for ${date}`);
        return cached.data;
      }
    }

    try {
      console.log(`🌍 Calling BetMiner API for date: ${date}`);
      const response = await axios.get(
        `${process.env.API_BASE_URL}/bm/v2/matches/${date}/${date}`,
        {
          headers: {
            'x-rapidapi-host': 'betminer.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY,
          },
        },
      );

      const matches = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      console.log(`📦 Received ${matches.length} matches`);

      // ✅ Filter: home_win probability above 50% or predictions.home_win === "Y"
      const filtered = matches.filter((match: any) => {
        const probHomeWin = parseFloat(match?.probability?.home_win || '0');
        const predictedHomeWin = match?.predictions?.home_win === 'Y';
        return probHomeWin > 50 || predictedHomeWin;
      });

      console.log(`🎯 Filtered matches: ${filtered.length}`);

      // Save in DB for caching
      await this.repo.savePrediction(date, filtered);

      // Return filtered matches for Postman
      return filtered;
    } catch (err) {
      console.error('❌ Error fetching from BetMiner:', err.message);
      throw new InternalServerErrorException('Failed to fetch predictions');
    }
  }
}
