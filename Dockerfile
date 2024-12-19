# Этап сборки
FROM node:lts-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Установка зависимостей
COPY package.json package-lock.json ./
RUN npm install

# Копирование исходного кода
COPY index.js .

# Этап финального образа
FROM node:lts-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование зависимостей и кода из этапа сборки
COPY --from=builder /app .

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["node", "index.js"]
