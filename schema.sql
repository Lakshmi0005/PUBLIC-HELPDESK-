-- Create database if not exists
CREATE DATABASE IF NOT EXISTS government_desk;

-- Use the database
USE government_desk;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP
);



-- Create or update the callback table
DROP TABLE IF EXISTS callback;
CREATE TABLE callback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    callback_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create or update the feedback table
DROP TABLE IF EXISTS feedback;
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    feedback_text TEXT,
    submission_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
