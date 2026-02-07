import { defineStore } from 'pinia'

// serie: {
//   begin_at: '2025-05-09T12:00:00Z',
//   end_at: '2025-05-18T23:00:00Z',
//   full_name: '2024',
//   id: 7907,
//   league_id: 4834,
//   modified_at: '2024-08-30T08:26:14Z',
//   name: '',
//   season: null,
//   slug: 'rl-rlcs-world-championship-2024',
//   winner_id: null,
//   winner_type: 'Team',
//   year: 2024
// } as PSSerie | null

export const useRLStore = defineStore('mpp-rl-data', {
  state: () => ({
    loading: false,
    focusSerieId: 0,
    series: [] as PSSerie[],
    teams: [] as PSTeam[],
    matches: [] as PSMatch[],
    cacheTTL: null as number | null
  }),
  getters: {
    serie: (state) => {
      if (state.focusSerieId === null) return null

      return state.series.find((s) => s.id === state.focusSerieId)
    },
    runningMatches: (state) => {
      return state.matches.filter((m) => m.status === 'running')
    },
    upcomingMatches: (state) => {
      return state.matches.filter((m) => m.status === 'not_started')
    },
    pastMatches: (state) => {
      return state.matches.filter((m) => m.status === 'finished')
    }
  },
  actions: {
    handleTTL(force = false) {
      if (this.cacheTTL === null || this.cacheTTL < Date.now() || force) {
        this.cacheTTL = Date.now() + 5 * 60 // 5 minutes
        return true
      }

      return false
    },
    async getSeries(serieId?: number) {
      try {
        const res = await this.$services.ps.series()

        if (res.series.length === 0) return false

        this.series = res.series

        if (!this.focusSerieId || serieId) {
          this.focusSerieId = serieId || res.series[0].id
        }

        return true
      } catch {
        return false
      }
    },
    async getMatches(serieId?: number) {
      try {
        this.loading = true
        const res = await this.$services.ps.matches(serieId || this.focusSerieId)

        this.matches = res.matches

        return true
      } catch {
        return false
      } finally {
        this.loading = false
      }
    },
    async getTeams() {
      try {
        const res = await this.$services.ps.teams()

        this.teams = res.teams

        return true
      } catch {
        this.teams = []
        return false
      }
    }
  },
  persist: {
    key: `mpp-rl-data`
  },
  share: {
    enable: false
  }
})
