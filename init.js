const prompts = require('prompts');
const { execSync } = require("child_process");
const { replaceContents } = require('./utils');
const fs = require('fs');

module.exports = async (path) => {
    const { default: ora } = await import('ora');
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

    try {
        const proc = await execSync('yarn -v')
    } catch (error) {
        console.log('Kindly install yarn using "npm i -g yarn"');
        process.exit(1)
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
        const installingExpoOra = ora('Initializing Expo Project...').start();
        const expoInit = execSync(`expo init ${path}`, {
            stdio: 'inherit'
        })
        installingExpoOra.succeed('Expo Project Initialized');
        // expoInit.on('close', code => {
        //     if (code !== 0) {
        //         console.log('expo-cli not installed globally. Please install it globally with `npm install -g expo-cli');
        //     }
        // })
    } else {
        const initializingRN = ora('Initializing React Native Project...').start();
        const reactNativeInit = execSync("npx react-native init --version react-native@0.63", {
            stdio: 'ignore'
        })
        initializingRN.succeed('React Native Project Initialized');
        // reactNativeInit.on('close', code => {
        //     if (code !== 0) {
        //         console.log('Unexpected error. Please try again.');
        //     }
        // })
    }

    const initalizingVueNative = ora('Initializing Vue Native in Project...').start();

    execSync(`cd ${path} && yarn add vue-native-core vue-native-scripts vue-native-helper`, {
        stdio: 'ignore'
    })

    initalizingVueNative.succeed('Vue Native Initialized');

    fs.copyFileSync(`${__dirname}/assets/vueTransformerPlugin.js`, `${path}/vueTransformerPlugin.js`)

    fs.copyFileSync(`${__dirname}/assets/metro.config.js`, `${path}/metro.config.js`)


    if (installRouter.continue) {
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