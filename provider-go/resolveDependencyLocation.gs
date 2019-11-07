var name = Dependency.name;

if (name.match(/^github/)) {
    var realname = name.match(/^github.com\/([\w\.\-\_]+\/[\w\.\-\_]+)/)
    if (Dependency.version === "*.*.*" || Dependency.version.match(/^v0\.0\.0/)) {
        Dependency.version = "master"
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

    var packageName = Dependency.name.match(/\/([\w-_]+)$/)
    if (packageName) {
        Dependency.url = 'https://github.com/golang/' + packageName[1] + '/archive/' + (Dependency.version || 'master') + '.zip'
    } else {
        Dependency.url = ""
        console.log("error extracting name in " + Dependency.name)
    }
} else {
    console.log(2, name)
    Dependency.url = ""
    console.log("error extracting name in " + Dependency.name)
}

Dependency;
