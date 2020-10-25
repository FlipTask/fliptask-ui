const { version } = require("webpack");

const { exec } = require("child_process");
const appVersion = require("./version");

const args = process.argv.slice(2);
const versionTypes = [
    "major",
    "minor",
    "patch",
    "prerelease"
];

if (versionTypes.indexOf(args[0]) > -1) {
    const origin = args[1];
    const gitBranch = args[2];
    // valid argument type
    const cmds = [
        {
            success: "Current Version",
            cmd: `node -e "console.log('${appVersion}')"`
        }, {
            success: `Updated version(${args[0]})`,
            cmd: `npm version ${args[0]}`
        },
        {
            success: "Pushing to git",
            cmd: `git push ${origin} ${gitBranch} && git push --tags`
        }
    ];
    for (let i = 0; i < cmds.length; i++) {
        const cmd = cmds[i];
        exec(cmd.cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`Error: ${stderr}`);
                return;
            }
            console.log(`${cmd.success}: ${stdout}`);
        });
    }
} else {
    console.log("\x1b[41m", `Invalid argument. Possible argument types are ${versionTypes.join(", ")}`);
}
