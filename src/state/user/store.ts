import { createStateFactory } from '@/lib/state'
import type { UserState, InternalUserActions } from './types'
import { createAuthActions } from './actions/auth'

/** @public */
export const [useUser, useUserContext] = createStateFactory<
  UserState,
  InternalUserActions
>({
  initialize: () => ({
    me: null,
    isLoading: false
  }),

  actions: (set, get, context) => ({
    ...createAuthActions(set, get, context)
  })
})