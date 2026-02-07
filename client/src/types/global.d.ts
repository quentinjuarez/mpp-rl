export {}

declare global {
  const __DEV__: boolean
  const __APP_VERSION__: string

  type User = {
    _id: number
    username: string
    firstName: string
    lastName: string
    email: string
  }

  type Forecast = {
    _id: number
    blue: number
    orange: number
    matchId: number
    tournamentId: number
    serieId: number
    userId: number
    processed: boolean
    correct: boolean
    exact: boolean
    match?: PSMatch
  }

  type LeaderboardItem = {
    username: string
    points: number
  }
}
