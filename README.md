# programistyczny-projekt
Big PP energy

# How to use Extension:
    - Download the extension folder
    - Go into chrome://extensions/
    - Load extension folder
    - With every change in extension code, you need to go back and click reload in extension
    - Also at chrome://extensions/ you can see any errors if some occure

# To use github:
    1. You need to be globally logged in
    2. When you make any changes -> Right click on folder -> Open in terminal
    3. git add .
    4. git commit -m "sample message"
    5. git push origin "name of the branch"

    1. New changes on github
    2. git pull repo

# To download correct modules:
    1. pip -> python –m pip install -–upgrade pip
    2. VirtualEnv:
        a) Install virtualenv -> python -m pip install virtualenv
        b) Create a venv -> python -m venv env
        c) Activate a venv -> .\env\Scripts\activate (every time you use it, so it loads correct modules, you see green "(env)" next to path in terminal)
        d) Leaving venv -> deactivate (or close VS Code :P)
    3. Requirements.txt:
        a) Installing needed modules: pip install -r requirements.txt
        b) Reload file to put in new modules: pip freeze > requirements.txt