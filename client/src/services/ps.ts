import type { AxiosInstance } from 'axios'

class PandaScoreService {
  client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  async series() {
    const res = await this.client.get<{
      series: PSSerie[]
    }>('/series', {
      params: {
        year: 2025
      }
    })

    return res.data
  }

  async serie(serieId: number) {
    const res = await this.client.get<PSSerie>('/series', {
      params: {
        id: [serieId]
      }
    })

    return res.data
  }

  async teams() {
    const res = await this.client.get('/teams')

    return res.data
  }

  async matches(serieId: number) {
    const res = await this.client.get<{
      matches: PSMatch[]
    }>('/matches', {
      params: {
        serie_id: serieId
      }
    })

    return res.data
  }

  async runningMatches(serieId: number) {
    const res = await this.client.get<{
      matches: PSMatch[]
    }>('/matches/running', {
      params: {
        serie_id: serieId
      }
    })

    return res.data
  }

  async pastMatches(serieId: number) {
    const res = await this.client.get<{
      matches: PSMatch[]
    }>('/matches/past', {
      params: {
        serie_id: serieId
      }
    })

    return res.data
  }

  async upcomingMatches(serieId: number) {
    const res = await this.client.get<{ matches: PSMatch[] }>('/matches/upcoming', {
      params: {
        serie_id: serieId
      }
    })

    return res.data
  }

  async tournaments(serieId: number) {
    const res = await this.client.get<{
      tournaments: PSTournament[]
    }>('/tournaments', {
      params: {
        serie_id: serieId
      }
    })

    return res.data
  }
}

export default PandaScoreService
