CREATE TABLE `kakao_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`kakao_id` text NOT NULL,
	`nickname` text NOT NULL,
	`profile_image` text,
	`email` text,
	`login_date` text NOT NULL,
	`last_visit` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `kakao_users_kakao_id_unique` ON `kakao_users` (`kakao_id`);