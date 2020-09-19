const { version } = require("webpack");

const { spawn, exec } = require("child_process");

const args = process.argv.slice(2);
const versionTypes = [
    "major",
    "minor",
    "patch",
    "prerelease"
];

if (versionTypes.indexOf(args[0]) > -1) {
    // valid argument type
    const cmds = [{
        success: "Current Version",
        cmd: "npm --version"
    }, {
        success: `Updated version(${args[0]})`,
        cmd: `npm version ${args[0]}`
    }, {
        success: "Pushing to git",
        cmd: "git push && git push --tags"
    }];
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
