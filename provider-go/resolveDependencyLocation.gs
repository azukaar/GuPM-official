var name = Dependency.name;

function process() {
    if (name.match(/^github/)) {
        if(name.match(/\.git$/)) {
            name = name.replace(/\.git$/, '')
        }
        var realname = name.match(/^github.com\/([\w\.\-\_]+\/[\w\.\-\_]+)/)
        if (Dependency.version === "*.*.*" || Dependency.version.match(/^v0\.0\.0/)) {
            Dependency.version = "master"
        }
        if(Dependency.version.match(/^v[0-9]/i)) {
            Dependency.version = Dependency.version.split('-')[0];
        }
        Dependency.url = 'https://github.com/' + realname[1] + '/archive/' + (Dependency.version || 'master') + '.zip'
    } else if (name.match(/^gopkg.in/)) {
        var payload = httpGet("https://" + name)
        versionMatch = payload.match(/https:\/\/github.com\/([\w\.\-\_]+\/[\w\.\-\_]+)\/tree\/([\w\.\-\_]+)/);

        if (!versionMatch) {
            console.error("Couldn't resolve " + name)
            exit()
        }

        packageName = versionMatch[1]
        packageVersion = versionMatch[2]

        // Dependency.name = 'github.com/' + packageName;
        Dependency.version = packageVersion;
        Dependency.url = 'https://github.com/' + packageName + '/archive/' + packageVersion + '.zip'
    } else if (name.match(/^golang.org/)) {
        if (Dependency.version === "*.*.*" || Dependency.version.match(/^v0\.0\.0/)) {
            Dependency.version = "master"
        }
        if(Dependency.version.match(/^v[0-9]/i)) {
            Dependency.version = Dependency.version.split('-')[0];
        }
        var packageName = Dependency.name.match(/x\/([\w-_]+)$/)
        if (packageName) {
            Dependency.url = 'https://github.com/golang/' + packageName[1] + '/archive/' + (Dependency.version || 'master') + '.zip'
        } else {
            Dependency.url = ""
            console.log("error extracting name in " + Dependency.name)
        }
    } else if (name.match(/golang.org/)) {
        if (Dependency.version === "*.*.*" || Dependency.version.match(/^v0\.0\.0/)) {
            Dependency.version = "master"
        }
        if(Dependency.version.match(/^v[0-9]/i)) {
            Dependency.version = Dependency.version.split('-')[0];
        }
        var packageName = Dependency.name.match(/\/([\w-_]+)$/)
        if (packageName) {
            Dependency.url = 'https://github.com/golang/' + packageName[1] + '/archive/' + (Dependency.version || 'master') + '.zip'
        } else {
            Dependency.url = ""
            console.log("error extracting name in " + Dependency.name)
        }
    } else {
        var payload = httpGet("https://" + name)
        versionMatch = payload.match(/meta\s+name\s*\=\s*\"?go-import\"?\s+content=".*? git\s+https:\/\/([\w\.\-\_]+)\/([\w\.\-\_]+\/[\w\.\-\_]+)/);

        if (!versionMatch) {
            Dependency.url = ""
            console.error("Couldn't resolve " + name)
            exit()
        }

        name = versionMatch[1] + '/' + versionMatch[2]

        process();
    }
}

process();

Dependency;
