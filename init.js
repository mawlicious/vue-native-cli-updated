const prompts = require('prompts');
const { execSync } = require("child_process");
const { replaceContents } = require('./utils');
const fs = require('fs')

module.exports = async (path) => {
    if (path == '.') {
        const currentDirectory = await prompts({
            type: 'confirm',
            name: 'continue',
            message: 'Are you sure you want to initialize a new project in the current directory?',
            initial: false
        })

        if (!currentDirectory.continue) {
            return;
        }
    }

    path = path == "." || "./" ? path : `./${path}`;

    const useExpo = await prompts({
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to use Expo?',
        initial: true
    })

    const installRouter = await prompts({
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to install the Vue Native Router?',
        initial: true
    })

    if (useExpo.continue) {
        console.log('Initializing Expo Project...')
        const expoInit = execSync(`expo init ${path}`, {
            stdio: 'inherit'
        })

        // expoInit.on('close', code => {
        //     if (code !== 0) {
        //         console.log('expo-cli not installed globally. Please install it globally with `npm install -g expo-cli');
        //     }
        // })
    } else {
        console.log('Initializing React Native Project...')
        const reactNativeInit = execSync("npx react-native init --version react-native@0.63", {
            stdio: 'inherit'
        })

        // reactNativeInit.on('close', code => {
        //     if (code !== 0) {
        //         console.log('Unexpected error. Please try again.');
        //     }
        // })
    }

    execSync(`cd ${path} && yarn add vue-native-core vue-native-scripts vue-native-helper`, {
        stdio: 'inherit'
    })

    fs.copyFileSync(`./assets/vueTransformerPlugin.js`, `${path}/vueTransformerPlugin.js`)

    fs.copyFileSync(`./assets/metro.config.js`, `${path}/metro.config.js`)


    if (installRouter.continue) {
        console.log('Installing Vue Native Router...')
        const vueRouter = execSync(`cd ${path} && yarn add vue-native-router`, {
            stdio: 'inherit'
        })

        // vueRouter.on('close', code => {
        //     if (code !== 0) {
        //         console.log('Unexpected error. Please try again.');
        //     }
        // })

        console.log('Installing Vue Native Rotuer Dependencies...')
        const vueRouterDeps = execSync(`cd ${path} && yarn add react-native-screens react-native-reanimated react-native-paper react-native-gesture-handler`,  {
            stdio: 'inherit'
        })

        // vueRouterDeps.on('close', code => {
        //     if (code !== 0) {
        //         console.log('Unexpected error. Please try again.');
        //     }
        // })

        fs.unlinkSync(`${path}/babel.config.js`)

        fs.copyFileSync(`./assets/babel.config.js`, `${path}/babel.config.js`)

        fs.unlinkSync(`${path}/App.js`)

        fs.copyFileSync(`./assets/RouterApp.vue`, `${path}/App.vue`)

        var dir = `${path}/screens`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        
        fs.copyFileSync(`./assets/HomeScreen.vue`, `${path}/screens/HomeScreen.vue`)

        fs.copyFileSync(`./assets/DetailsScreen.vue`, `${path}/screens/DetailsScreen.vue`)
    } else {
        fs.unlinkSync(`${path}/App.js`)

        fs.copyFileSync(`./assets/App.vue`, `${path}/App.vue`)
    }

    console.log("Vue Native Project Successfully Initialized!")
}