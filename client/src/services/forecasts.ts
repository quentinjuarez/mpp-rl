import type { AxiosInstance } from 'axios'

class ForecastsService {
  client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  async getAll(serie_id?: number) {
    const res = await this.client.get<{
      forecasts: Forecast[]
    }>('/forecasts', {
      params: {
        serie_id
      }
    })

    return res.data
  }

  async createOrUpdate({
    blue,
    orange,
    matchId,
    tournamentId,
    serieId,
    date
  }: {
    blue: number
    orange: number
    matchId: number
    tournamentId: number
    serieId: number
    date: string
  }) {
    const res = await this.client.post<Forecast>('/forecasts', {
      blue,
      orange,
      matchId,
      tournamentId,
      serieId,
      date
    })

    return res.data
  }

  async points(serieId?: number) {
    const res = await this.client.get<{ points: number; forecasts?: Forecast[] }>(
      '/forecasts/points',
      {
        params: {
          serie_id: serieId,
          enriched: true
        }
      }
    )

    return res.data
  }

  async getByMatchId(matchId: number) {
    const res = await this.client.get<{ forecasts: Forecast[] }>(`/forecasts/${matchId}`)

    return res.data
  }
}

export default ForecastsService
