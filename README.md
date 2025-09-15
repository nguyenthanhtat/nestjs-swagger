# NestJS Auth Template

Dự án mẫu NestJS + PostgreSQL + Prisma + Docker.  
Bao gồm:
- Auth với JWT (access + refresh)
- Lưu mật khẩu hash (bcrypt)
- ConfigModule (@nestjs/config) để validate config (tương tự FastAPI BaseSettings)
- Swagger UI để test API
- Docker setup cho **Development** và **Production**

---

## 📂 Cấu trúc
nestjs-auth-template/
│── docker-compose.dev.yml
│── docker-compose.prod.yml
│── Dockerfile.dev
│── Dockerfile.prod
│── prisma/
│ └── schema.prisma
│── src/
│ ├── app.module.ts
│ ├── main.ts
│ ├── config/
│ ├── prisma/
│ ├── auth/
│ └── user/
│── .env
│── package.json
│── README.md|

---

## 🚀 Chạy Development

```bash
docker-compose -f docker-compose.dev.yml up --build
## 🚀 Chạy Development

```bash
docker-compose -f docker-compose.dev.yml up --build
App chạy tại: http://localhost:3000

Swagger UI: http://localhost:3000/docs

Postgres: localhost:5432 (user: postgres / pass: postgres / db: nestauth)

🚀 Chạy Production
bash
Copy code
docker-compose -f docker-compose.prod.yml up --build -d
Trong chế độ Production:

App sẽ build ra dist/

Prisma migrate deploy trước khi chạy app

Chạy dạng container tối ưu hơn (chỉ copy dist và dependencies cần thiết)

📌 Prisma & Database Migration
Development
Khi thay đổi prisma/schema.prisma, tạo migration mới:

bash
Copy code
docker-compose -f docker-compose.dev.yml exec app npx prisma migrate dev --name init
Mở Prisma Studio để quản lý DB qua UI:

bash
Copy code
docker-compose -f docker-compose.dev.yml exec app npx prisma studio
Production
Trong file docker-compose.prod.yml đã có:

yaml
Copy code
command: sh -c "npx prisma migrate deploy && node dist/main.js"
👉 Tức là khi container production khởi động, nó sẽ tự động chạy prisma migrate deploy để đồng bộ schema mới nhất vào DB.

📌 Auth API
POST /auth/register

json
Copy code
{ "email": "test@example.com", "password": "123456" }
POST /auth/login

json
Copy code
{ "email": "test@example.com", "password": "123456" }
Trả về:

json
Copy code
{
  "accessToken": "...",
  "refreshToken": "..."
}
📌 Notes
Development: hot-reload (npm run start:dev)

Production: build + chạy dist/

Config validate bằng Joi trong src/config/config.module.ts

Swagger setup sẵn tại /docs
