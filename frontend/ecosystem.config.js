require('dotenv').config();

const {
    DEPLOY_USER,
    DEPLOY_HOST,
    DEPLOY_PATH,
    DEPLOY_REF,
} = process.env;

module.exports = {
    apps: [{
        name: "app1",
        script: ".src/index.js"
    }],
    deploy: {
        production: {
            user: DEPLOY_USER,
            ssh_options: "StrictHostKeyChecking=no",
            host: DEPLOY_HOST,
            ref: DEPLOY_REF,
            repo: 'https://github.com/George051191/pm2-deploy',
            path: DEPLOY_PATH,
            'post-deploy': 'cd frontend && cp build/* /var/www/frontend',
        },
    },
}