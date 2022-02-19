const prompts = require('prompts');
const { execSync } = require("child_process");
const { replaceContents } = require('./utils');
const fs = require('fs');

module.exports = async (feature) => {
    const path = './'
    const { default: ora } = await import('ora');
    if ( !['vue-native-router'].includes(feature) ) return console.log('Invalid feature, please choose from the following: vue-native-router');
    if ( feature == 'vue-native-router' ) {
        const installingVueRouter = ora('Installing Vue Native Router...').start();
        const vueRouter = execSync(`cd ${path} && yarn add vue-native-router`, {
            stdio: 'ignore'
        })
        installingVueRouter.succeed('Vue Native Router Installed');
        // vueRouter.on('close', code => {
        //     if (code !== 0) {
        //         console.log('Unexpected error. Please try again.');
        //     }
        // })

        const installingVRDependencies = ora('Installing Vue Native Rotuer Dependencies...').start();
        const vueRouterDeps = execSync(`cd ${path} && yarn add react-native-screens react-native-reanimated react-native-paper react-native-gesture-handler`, )
        installingVRDependencies.succeed('Vue Native Router Dependencies Installed');
        // vueRouterDeps.on('close', code => {
        //     if (code !== 0) {
        //         console.log('Unexpected error. Please try again.');
        //     }
        // })

        console.log('Vue Native Router successflly installed.')

        fs.unlinkSync(`${path}/babel.config.js`)

        fs.copyFileSync(`${__dirname}/assets/babel.config.js`, `${path}/babel.config.js`)
    }
}