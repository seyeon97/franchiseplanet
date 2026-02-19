CREATE TABLE `columns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`date` text NOT NULL,
	`thumbnail` text NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`bg_gradient` text NOT NULL,
	`is_new` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
