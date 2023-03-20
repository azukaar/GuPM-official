Dependency.dependencies = [];

var goMod = null;

if(fileExists(Dependency.path + '/go.mod')) {
    goMod = readFile(Dependency.path + '/go.mod');

}

else if(fileExists(Dependency.path + '/vendor.mod')) {
    goMod = readFile(Dependency.path + '/vendor.mod');
    removeFiles(Dependency.path + '/vendor/')
}


if(goMod != null) {
    var requires = goMod.match(/require\s\(\n?([\s\w\_\-\.\/\+\n]+)\n?\)/)

    if(requires != null) {
        requires = requires[1].split(/\n/);


        for(r in requires) {
            var require = requires[r];
            if(require != "") {
                if(require.split(" ").length>1) {
                    Dependency.dependencies.push({
                        provider: 'go',
                        name: require.split(" ")[0].trim(),
                        version: require.split(" ")[1].trim()
                    })
                }
            }
        }
    }
}

Dependency;
