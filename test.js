const { execSync } = require("child_process");

(async () => {
    try {
        const proc = await execSync('yarn -v')
    } catch (error) {
        console.log('Kindly install yarn');
    }
})();