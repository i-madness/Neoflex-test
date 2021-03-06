# Film list
Вступительное тестовое задание от компании Neoflex на вакансию фронт-энд разработчика.

## Описание
Как следует из названия, основной единицей данных в приложения являются записи о фильмах, которые заносятся в таблицу.  
JPA Entity `Film`:
```Kotlin
var id: Long
var name: String
var description: String?
var isWatched: Boolean
var releaseDate: java.util.Date
var genre: Genre // enum 
```
С данными записями реализованы CRUD операции.  

## Стек приложения
### Back-end:
- Kotlin / Java 8
- Spring Boot
- **БД**: H2 (in-memory), управляется с помощью JPA
### Front-end:
- Typescript
- React, Redux
- SASS, CSS Modules
- **Взаимодействие с сервером**:
  - web socket + redux middleware;
  - REST + fetch API (для поля genre (жанр фильма) реализован REST-словарь с соответствующим ему компонентом "autocomplete" на клиенте.)

## Сборка и запуск приложения:
### Front-end
```bash
cd frontend
npm install
# Dev-server:
npm start
# Сборка с переносом бандла в папку backend/resources (Windows only):
npm run transfer
```
### Back-end
```bash
cd backend
# Сборка:
mvn clean install
# Запуск:
mvn spring-boot:run
```
Приложение может работать как в режиме дев-сервера на порте 3000 вместе с запущенным на другом порту (8080) бэк-эндом, так и без сборки/запуска фронта вообще.

## Изначальные требования к приложению:
- последние версии: react ✔️, redux ✔️, webpack ❌
- настроенные eslint, preter, jest ✔️
- стилизация компонентов: CSS Modules + Sass ✔️
- использование ~~flow~~ или TypeScript ✔️
- данные для таблицы должны храниться в redux ✔️
- side-effect хранить в middleware ✔️ (но на данный момент один REST-запрос не в middleware).