const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
    DEPLOY_USER,
    DEPLOY_HOST,
    DEPLOY_PATH,
    DEPLOY_REF,
} = process.env;


module.exports = {
    apps: [{
        name: "app1",
        script: ".src/app.ts"
    }],
    deploy: {
        production: {
            user: DEPLOY_USER,
            ssh_options: "StrictHostKeyChecking=no",
            host: DEPLOY_HOST,
            ref: DEPLOY_REF,
            repo: 'https://github.com/George051191/pm2-deploy',
            path: DEPLOY_PATH,
            'pre-deploy-local': `scp .env .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
            'post-deploy': 'cd backend && npm i && npm run build && cd dist && pm2 start app.js',
        },
    },
}