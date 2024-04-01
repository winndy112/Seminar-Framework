# Seminar-Framework
## Introduce
**Nhóm thực hiện**: Nhóm 8 
**Thành viên**:
1. Nguyễn Thị Quỳnh Anh (Nhóm trưởng)
2. Nguyễn Trần Lan Phương
3. Võ Đặng Phương Thùy

**Chủ đề**: Tìm hiểu các hệ CSDL cho ứng dụng web: MySQL, PostgreSQL, MongoDB.

## Requirements
- ExpressJS
- MySQL Command Line Client
- MySQL Workbench (optional)
- MongoDB
- PostgreSQL
## Setup and Usage
### ExpressJS
1. Tải NodeJS ở link này: https://nodejs.org/en/download. (hiện tại t cài bản node-v20.11.1-x64.msi)
2. Trong terminal vscode, chạy lệnh:
```
npm init -y
npm i express
npm i --save-dev nodemon
```
3. Sửa file ```package.json``` thành:
```
{
  "name": "handmade-forum",
  "version": "1.0.0",
  "description": "Project of NT208",
  "main": "index.js",
  "scripts": {
    "devStart": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```
4. Cài extension EJS trong vscode. Sau đó chạy lệnh:
```
npm i ejs
```
5. Chạy code bằng lệnh:
```
npm run devStart
```
### MySQL Command Line client / MySQL Workbench
Chạy lệnh `npm run demoMySQL` để chạy demo MySQL

1. Download installer từ link https://dev.mysql.com/downloads/installer/
2. Chạy file `.msi` và chọn `Custom` type.
3. Trong `Select Products and Fetures`, mở rộng option `MySQL Server` và bỏ chọn các server components.
4. Trong cùng hộp thoại, mở rộng option `Application` chọn `MySQL Shell` và `MySQL Workbench`, những application này bao gồm MySQL client.
5. Hoàn thành các bước install còn lại.

Kiểm tra xem đã cài đặt thành công chưa: Mở Command Prompt -> nhập `mysql --vesion` .

Nếu không hiện version của MySQL dù đã hoàn thành các bước cài đặt bên trên, mở `Edit the system environment variables` -> chọn `Environment Variables` -> trong `System variables` double click vào `Path` -> thêm path mặc định `C:\Program Files\MySQL\MySQL Server 8.0\bin` (hoặc đường dẫn bạn chọn để cài dặt MySQL) vào path và check lại.

Có thể dùng `MySQL Command Line Client` (chỉ cần mở và nhập password) hoặc dùng thông qua Command Prompt bằng câu lệnh.

```
mysql -u root -p 
```

Các câu lệnh cơ bản có thể xem ở link: https://dev.mysql.com/doc/mysql-getting-started/en/

### MongoDB 

Chạy lệnh `npm run demoMongoDB` để chạy demo mongodb

### PostgreSQL

Chạy lệnh `npm run demoPostgreSQL` để chạy 

## Trình bày

