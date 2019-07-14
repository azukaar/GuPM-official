if(fileExists("gupm.json")) {
    console.error("A project already exist in this project. Aborting.")
    exit()
}

var name = waitForInput("Please enter the name of the project: ")
var description = waitForInput("Enter a description: ")
var author = waitForInput("Enter the author: ")
var license = waitForInput("Enter the license (ISC): ")

if(name == "") {
    console.error("Name cannot be empty. Try again.")
    exit()
}

var result = {
    name: name,
    description: description,
    author: author,
    license: license || "ISC",
    wrapInstallFolder: "src",
    dependencies: {
        defaultProvider: "go"
    },
    cli: {
        aliases: {
            start: "build/bin"
        }
    }
}


writeJsonFile("gupm.json", result)
writeFile(".gupm_rc.gs", 'env("GOPATH", run("go", ["env", "GOROOT"]) + ":" + pwd() + "/go_modules" + ":" + pwd() + "/gupm_modules")')
writeFile("build.gs", 
'removeFiles(["build"]);\n' +
'var goArgs = ["build", "-o", "build/bin"]\n' +
'goArgs = goArgs.concat(dir("src/*.go"))\n' +
'exec("go", goArgs);\n')

mkdir('src')

writeFile("src/index.go", 
"package main\n" +
'import "fmt"\n\n' +
"func main() {\n" +
'fmt.Println("Hello GuPM!")\n'+
"}\n"
)

readme = "# "+name + "\n";
readme += "# Installation\n";
readme += "You need [GuPM](https://github.com/azukaar/GuPM) with the [provider-go](https://github.com/azukaar/GuPM-official#provider-go) plugin to run this project.\n";
readme += "```\n";
readme += "g make\n";
readme += "```\n";
readme += "# Add dependencies from a go project\n";
readme += "```\n";
readme += "g i newPackage\n";
readme += "```\n\n";
readme += "# Build and start\n";
readme += "```\n";
readme += "g build\n";
readme += "g start\n";
readme += "```\n\n";

writeFile("readme.md", readme)