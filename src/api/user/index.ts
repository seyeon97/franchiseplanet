import type { UserAPI } from './types'

export * from './types'
export { getMe } from './actions/get-me'

import { getMe } from './actions/get-me'

export const user: UserAPI = {
  getMe,
}
