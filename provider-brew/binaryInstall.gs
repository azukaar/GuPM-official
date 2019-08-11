mkdir('.bin')

function installDir(files) {
    for(f in files) {
        var dirName = files[f];
        var binFiles = readDir(Source+"/"+dirName+"/bin")
        
        for(b in binFiles) {
            bname = binFiles[b]
            createSymLink("../gupm_modules/"+dirName+"/bin/"+bname,  Destination + '/' + bname)
        }
    }
}


var files = readDir(Source)
installDir(files)