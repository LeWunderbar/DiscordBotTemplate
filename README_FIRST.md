Steps to setup new bot:
- Remove .git from root directoy
- Remove package.json file if exists
- Add .env and .envDev
- Add TOKEN=12345 to both .env's

(Below if MongoDB NOT in use)
- Remove "mongoHandler" in src/events/ready/03services.js
- Remove /src/handlers/mongoHandler.js
- Remove /src/schema Folder

(Below if MongoDB in USE)
- Add MONGODB=mongodb+srv://USERNAME:PASS@URL/?retryWrites=true&w=majority