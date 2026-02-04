import type { StateSetFn, StateGetFn, StateContext } from '@/lib/state/types'
import type { UserState, InternalUserActions, User } from '../types'

type AuthActions = Pick<InternalUserActions, 'init' | 'signIn' | 'signUp' | 'signOut'>

export const createAuthActions = (
  set: StateSetFn<UserState>,
  get: StateGetFn<UserState>,
  context: StateContext
): AuthActions => ({

  /**
   * Initialize user from SSR
   * Use { silent: true } to prevent re-render on initial load
   */
  init: (user) => {
    set(state => {
      state.me = user
      state.isLoading = false
    }, { silent: true })
  },

  /**
   * Sign in with username and password
   * TODO: Implement actual API call using @/api
   */
  signIn: async ({ username, password }) => {
    set(state => { state.isLoading = true })

    try {
      // TODO: Replace with actual API call
      // const user = await api.auth.signIn({ username, password })

      // Mock implementation
      const user: User = {
        id: '1',
        email: `${username}@example.com`,
        name: 'Mock User',
        username,
        displayUsername: username,
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      set(state => {
        state.me = user
        state.isLoading = false
      })
    } catch (error) {
      set(state => { state.isLoading = false })
      throw error
    }
  },

  /**
   * Sign up with email, username, name, and password
   * TODO: Implement actual API call using @/api
   */
  signUp: async ({ email, username, name, password }) => {
    set(state => { state.isLoading = true })

    try {
      // TODO: Replace with actual API call
      // const user = await api.auth.signUp({ email, username, name, password })

      // Mock implementation
      const user: User = {
        id: '1',
        email,
        name,
        username,
        displayUsername: username,
        image: null,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      set(state => {
        state.me = user
        state.isLoading = false
      })
    } catch (error) {
      set(state => { state.isLoading = false })
      throw error
    }
  },

  /**
   * Sign out current user
   * TODO: Implement actual API call using @/api
   */
  signOut: async () => {
    set(state => { state.isLoading = true })

    try {
      // TODO: Replace with actual API call
      // await api.auth.signOut()

      set(state => {
        state.me = null
        state.isLoading = false
      })
    } catch (error) {
      set(state => { state.isLoading = false })
      throw error
    }
  }
})
