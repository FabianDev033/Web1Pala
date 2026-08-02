CREATE DATABASE IF NOT EXISTS boludez
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE boludez;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stats (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  game_mode ENUM('normal', 'hard', 'easy') NOT NULL,
  played INT UNSIGNED NOT NULL DEFAULT 0,
  wins INT UNSIGNED NOT NULL DEFAULT 0,
  current_streak INT UNSIGNED NOT NULL DEFAULT 0,
  best_streak INT UNSIGNED NOT NULL DEFAULT 0,
  distribution JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_stats_user_mode (user_id, game_mode),
  CONSTRAINT fk_stats_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS daily_solutions (
  solution_date DATE NOT NULL,
  normal_solution_id INT UNSIGNED NOT NULL,
  hard_solution_id INT UNSIGNED NOT NULL,
  easy_solution_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (solution_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS daily_game_results (
  user_id INT UNSIGNED NOT NULL,
  game_date DATE NOT NULL,
  game_mode ENUM('normal', 'hard', 'easy') NOT NULL,
  result ENUM('win', 'loss') NOT NULL,
  tries TINYINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, game_date, game_mode),
  CONSTRAINT fk_daily_game_results_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
