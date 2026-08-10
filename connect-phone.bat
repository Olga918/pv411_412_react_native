@echo off
chcp 65001 >nul
echo Подключение телефона через USB...

adb -s GY7TJVPRBASKJ7BM reverse --remove-all
adb -s GY7TJVPRBASKJ7BM reverse tcp:8081 tcp:8081
adb -s GY7TJVPRBASKJ7BM shell am force-stop host.exp.exponent
timeout /t 2 /nobreak >nul
adb -s GY7TJVPRBASKJ7BM shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:8081"

echo.
echo Готово. Сначала запусти: npm.cmd run start
echo Если синий экран - в Expo Go введи: exp://127.0.0.1:8081
