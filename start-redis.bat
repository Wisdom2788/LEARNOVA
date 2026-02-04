@echo off
echo Starting Redis Server for LEARNOVA...
echo.
echo Make sure you have downloaded and extracted Redis to C:\Redis
echo Download from: https://github.com/redis-windows/redis-windows/releases
echo.
echo If Redis is installed, it will start on port 6379
echo Keep this window open while developing
echo Press Ctrl+C to stop Redis
echo.
C:\Redis\redis-server.exe
pause