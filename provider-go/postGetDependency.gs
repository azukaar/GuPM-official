// Provider : name of provider (npm)
// Name : name of downloaded package
// Version : version of downloaded package
// Url : URL of downloaded package
// Path  : Future path of downloaded package
// Result : binary downloaded

if (Result.trim() == "Not Found" || Result.trim() == "404: Not Found") {
    console.error("Dependency not found")
    console.error(Url)
    console.error(Name + "@" + Version)
    exit()
} else {
    var folder;
    if(Url.match(/\.zip$/)) {
        folder = unzip(Result);
    } else if(Url.match(/\.tar\.gz$/)) {
        folder = untar(Result);
    }
    var firstChildrenName = Object.keys(folder.Children)[0];
    var firstChildren = folder.Children[firstChildrenName];
    
    saveFileAt(firstChildren, Path);   
    saveLockDep(Path); 
}

Path;
