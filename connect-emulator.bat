@echo off
chcp 65001 >nul
echo Подключение эмулятора к проекту...

adb -s emulator-5554 reverse --remove-all
adb -s emulator-5554 reverse tcp:8081 tcp:8081
adb -s emulator-5554 shell am start -a android.intent.action.VIEW -d "exp://10.0.2.2:8081"

echo Готово. Сначала запусти: npm.cmd run start
