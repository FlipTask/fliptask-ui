const loadDependency = async (type, dep, moduleObj) => {
    try {
        const res = await require(`./${type}/${dep}`);
        global[dep] = typeof (res) === "function" ? await res(moduleObj) : await res;
        moduleObj[dep] = global[dep];
        console.info(`[INFO] Dependency [${dep}] loaded from [${type}]`);
        return global[dep];
    } catch (e) {
        console.error(`[Error] Unable to load ${dep}\n`, e);
    }
};
const configuration = {
    config: [
        "Express"
    ]
};
const loadConfig = async () => {
    const moduleObj = {};
    const typeList = Object.keys(configuration);
    for (let i = 0; i < typeList.length; i++) {
        const type = typeList[i];
        console.log(`[#################################******** Loading ${type} *********#################################]`);
        for (let j = 0; j < configuration[type].length; j++) {
            const name = configuration[type][j];
            loadDependency(type, name, moduleObj);
        }
    }
};

const loadApp = async () => {
    await loadConfig();
};

module.exports = {
    loadApp
};
