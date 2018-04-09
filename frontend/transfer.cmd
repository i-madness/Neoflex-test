@REM Скрипт для переноса билда фронтэнда в папку статических ресурсов бэкэнда.
@REM                    usage: npm run transfer
@REM TODO
@REM Данная концепция сомнительна, и скорее всего файлы бандла в составе бэкэнда должны быть прописаны в .gitignore.
@REM Тем не менее, останавливаемся на этом решении, Т.К. для гипотетического деплоя на Heroku нужно, чтобы
@REM фронт-энд был в собранном состоянии...

RMDIR "..\backend\src\main\resources\static" /S /Q
node scripts/build.js
ROBOCOPY build ..\backend\src\main\resources\static /e
git add ..\backend\src\main\resources\static
ECHO Transfering frontend build completed