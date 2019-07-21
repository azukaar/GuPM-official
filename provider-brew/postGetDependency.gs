// Provider : name of provider (npm)
// Name : name of downloaded package
// Version : version of downloaded package
// Url : URL of downloaded package
// Path  : Future path of downloaded package
// Result : binary downloaded

var BREW = _DIRNAME + "/gupm_modules/github.com/Homebrew/brew/bin/brew" 
var COMMAND = ["install", Name]
var DEST = _DIRNAME + "/gupm_modules/github.com/Homebrew/brew/Cellar"
Path = DEST + "/" + Name + "/" + Version

console.log(run(BREW, COMMAND))

saveLockDep(Path);

Path;
