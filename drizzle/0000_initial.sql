-- Initial schema (users only for future auth)
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) PRIMARY KEY NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255),
  `role` varchar(32) DEFAULT 'user',
  `created_at` datetime DEFAULT (now())
);
