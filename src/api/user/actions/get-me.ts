'use server'

import type { User } from '@/state/user'

/**
 * Get current logged-in user
 *
 * TODO: After auth-setup skill, replace with:
 *
 * import { getServerSession } from '@/server/auth'
 * import { getDb } from '@/server/db'
 * import { member } from '@/server/db/schema'
 * import { eq } from 'drizzle-orm'
 *
 * const session = await getServerSession()
 * if (!session?.user?.id) return null
 *
 * const db = await getDb()
 * const row = await db.query.member.findFirst({
 *   where: eq(member.id, session.user.id)
 * })
 * return row ?? null
 */
export async function getMe(): Promise<User | null> {
  // Mock user - remove after auth setup
  return {
    id: 'mock-user-001',
    email: 'test@example.com',
    name: '테스트 유저',
    username: 'testuser',
    displayUsername: 'TestUser',
    image: null,
    emailVerified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  }
}
