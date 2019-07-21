var version = Dependency.version;
var payload = httpGetJson('https://formulae.brew.sh//api/formula/'+Dependency.name+'.json');
Dependency.version = payload['versions']["stable"];
Dependency.url = "NO URL"
Dependency;
