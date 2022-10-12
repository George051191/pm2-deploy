require('dotenv').config();

const {
    DEPLOY_USER,
    DEPLOY_HOST,
    DEPLOY_PATH,
    DEPLOY_REF = 'origin/master',
} = process.env;


module.exports = {
    apps: [{
        name: "app1",
        script: ".src/app.ts"
    }],
    deploy: {
        production: {
            user: DEPLOY_USER,
            key: '~/.ssh/node_ec2.pem',
            host: DEPLOY_HOST,
            ref: DEPLOY_REF,
            repo: 'https://github.com/George051191/pm2-deploy',
            path: DEPLOY_PATH,
            'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
            'post-deploy': 'npm i && npm run build',
        },
    },
}