-- 

DROP DATABASE IF EXISTS DEMO;
-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS DEMO;

-- Sử dụng cơ sở dữ liệu
USE DEMO;

-- Tạo bảng Account
CREATE TABLE IF NOT EXISTS Account (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(200),
  password VARCHAR(200)
);

-- Tạo bảng User_Infor
CREATE TABLE IF NOT EXISTS User_Infor (
  user_id INT,
  fullname VARCHAR(200),
  email VARCHAR(200) PRIMARY KEY,
  FOREIGN KEY (user_id) REFERENCES Account(user_id)
);
