@echo off
cd /d "%~dp0"

echo ==========================================
echo    Portfolio - Quick Git Commit
echo ==========================================
echo.
echo Changed files:
git status --short
echo.

set "msg="
set /p msg=Commit message (press Enter for default):
if "%msg%"=="" set "msg=Update portfolio"

git add -A
git commit -m "%msg%"
echo.

set "push="
set /p push=Push to GitHub now? [Y/N]:
if /i "%push%"=="Y" (
    git push
    echo.
    echo Done - changes are on GitHub.
) else (
    echo Committed locally only. Run "git push" later to upload.
)

echo.
pause
