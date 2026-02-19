import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const configTable = sqliteTable('config', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  label: text('label').notNull(),
  description: text('description').notNull(),
  value: text('value').notNull(),
});

export const kakaoUsersTable = sqliteTable('kakao_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  kakaoId: text('kakao_id').notNull().unique(),
  nickname: text('nickname').notNull(),
  profileImage: text('profile_image'),
  email: text('email'),
  loginDate: text('login_date').notNull(),
  lastVisit: text('last_visit').notNull(),
});

export const columnsTable = sqliteTable('columns', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  category: text('category').notNull(),
  date: text('date').notNull(),
  thumbnail: text('thumbnail').notNull(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  bgGradient: text('bg_gradient').notNull(),
  isNew: integer('is_new', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
});
