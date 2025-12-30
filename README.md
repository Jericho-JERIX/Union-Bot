# Project Setup
1. Create `package.json`
    ```bash
    $ npm init
    ```
2. Install the following dependencies
    ```bash
    $ npm install discord.js dotenv typescript ts-node nodemon @types/node
    ```

3. Create TypeScript files
    ```bash
    $ tsc --init
    ```
4. Edit output directory in `tsconfig.json`
    ```json
    {
        "outDir": "./build"
    }
    ```
5. Create `.env` file
    ```env
    TOKEN=YOUR_ACTUAL_BOT_TOKEN
    CLIENT_ID=YOUR_ACTUAL_CLIENT_ID
    ```
6. Replace `package.json` main and scripts with the following:
    ```json
    {
        "main": "build/index.js",
        "scripts": {
            "build": "tsc",
            "start": "node .",
            "dev": "nodemon --config nodemon.json src/index.ts",
            "regis": "ts-node src/scripts/register.ts"
        },
    }
    ```
7. Open `Jenkinsfile` and edit environment variables
# Install Prisma
See the quickstart guide [here](https://www.prisma.io/docs/orm/prisma-quickstart)