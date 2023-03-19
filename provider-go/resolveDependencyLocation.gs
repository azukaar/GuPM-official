var name = Dependency.name;


function process() {
    if (name.match(/^github/)) {
        if(name.match(/\.git$/)) {
            name = name.replace(/\.git$/, '')
        }

        var realname = name.match(/^github.com\/([\w\.\-\_]+\/[\w\.\-\_]+)/)

        if (Dependency.version === "*.*.*" || Dependency.version.match(/^v0\.0\.0/) || Dependency.version == "master") {
            Dependency.version = "master"
            Dependency.url = 'https://github.com/' + realname[1] + '/archive/master.zip'
        } else {
            if(Dependency.version.match(/^v[0-9\.]+\-/i)) {
                var splitVer = Dependency.version.split('-');
                if(splitVer.length > 2) {
                    Dependency.version = splitVer[2];
                }
            }

            if(name != 'github.com/' + realname[1]) {
                var tn = name.split(realname[1] + '/')[1]
                
                if(tn.match(/\/v[0-9]+$/)) {
                    tn = tn.split('/v')[0]
                } else if(tn.match(/^v[0-9]+$/)) {
                    tn = ''
                }

                Dependency.version = tn + '/' + Dependency.version
            }

            if(Dependency.version.match(/^[0-9a-z]+$/)) {
                Dependency.url = 'https://github.com/' + realname[1] + '/archive/'+Dependency.version+'.zip'
            } else {
                Dependency.url = 'https://github.com/' + realname[1] + '/archive/refs/tags/' + Dependency.version + '.zip'    
            }
        }
    } else if (name.match(/googlesource/)) {
        var urlBuild = 'heads'

        if (Dependency.version === "*.*.*" || Dependency.version.match(/^v0\.0\.0/)) {
            Dependency.version = "master"
        }
        
        if(Dependency.version.match(/^v[0-9]/i)) {
            urlBuild = 'tags'
        }
        Dependency.url = 'https://' + name + '/+archive/refs/' + urlBuild + '/' + Dependency.version + '.tar.gz'

    } else if (name.match(/gopkg.in/)) {
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
    } else {
        var payload = httpGet("https://" + name)
        versionMatch = payload.match(/meta\s+name\s*\=\s*\"?go-import\"?\s+content="([\w\.\-\_\/]+)\s+git\s+https:\/\/([\w\.\-\_\/]+)/);

        if (versionMatch) {
            packageName = versionMatch[1]
            name = name.replace(versionMatch[1], versionMatch[2])
        } else {
            versionMatch = payload.match(/\<h2 class\=\"go\-textLabel\"\>Repository\<\/h2\>\n\s+.*\n\s+\n\s*\<a href\=\"https:\/\/([\w\.\-\_\/]+)/);
            if(versionMatch) {
                name = versionMatch[1]
            } else {
                Dependency.url = ""
                console.error("Couldn't resolve package from " + name)
                exit()
            }
        }
        
        process();
    }
}

process();

Dependency;
