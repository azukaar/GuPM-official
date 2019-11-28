console.log("Creating a new Javascript project. Select the option fitting for your project:");
var template = waitForMenu([
    "I create a Javascript project or a Web Apps, and will NOT publish it on NPM [Use gupm.json, import existing package.json if any] (recommanded)",
    "I create a Javascript library that I WILL publish on NPM [Use package.json, import existing package.json if any]"
]);

if(fileExists("gupm.json")) {
    console.error("A project already exist in this project. Aborting.")
    exit()
}

if(template === 2) {
    var name;
    var description; 
    var author;
    var license;

    if(fileExists("package.json")) {
        console.log("Found package.json... Importing.");
        var config = readJsonFile('package.json');
        name = config.name;
        description = config.description; 
        author = config.author;
        license = config.license;
    } else {
        name = waitForInput("Please enter the name of the project: ");
        description = waitForInput("Enter a description: ");
        author = waitForInput("Enter the author: ");
        license = waitForInput("Enter the license (ISC): ");
    }

    if(name == "") {
        console.error("Name cannot be empty. Try again.")
        exit()
    }
    
    var result = {
        name: name,
        description: description,
        author: author,
        license: license || "ISC"
    }
    
    writeJsonFile("package.json", result) 

    result["cli"] = {
        "defaultProviders": {
            "install": "npm",
            "make": "npm"
        }
    }

    writeJsonFile("gupm.json", result)
    
    readme = "# "+name + "\n";
    readme += "# Installation\n";
    readme += "You need [GuPM](https://github.com/azukaar/GuPM) with the [provider-npm](https://github.com/azukaar/GuPM-official#provider-npm) plugin to run this project.\n";
    readme += "```\n";
    readme += "g make\n";
    readme += "```\n";
    readme += "# Add dependencies\n";
    readme += "```\n";
    readme += "g i newPackage\n";
    readme += "```\n\n";

    if(fileExists("readme.md")) {
        writeFile("readme_GUPM.md", readme)
    } else {
        writeFile("readme.md", readme)
    }
}
else {
    var config;
    var name;
    var description; 
    var author;
    var license;
    var version;
    var dependencies;
    var devDependencies;
    var bin;
    var files;
    var scripts;

    if(fileExists("package.json")) {
        console.log("Found package.json... Importing.");
        config = readJsonFile('package.json');
        name = config.name;
        version = config.version;
        description = config.description; 
        author = config.author;
        license = config.license;
        devDependencies = config.devDependencies;
        dependencies = config.dependencies;
        bin = config.bin;
        files = config.files;
        scripts = config.scripts;
    } else {
        name = waitForInput("Please enter the name of the project: ");
        description = waitForInput("Enter a description: ");
        author = waitForInput("Enter the author: ");
        license = waitForInput("Enter the license (ISC): ");
    }

    if(name == "") {
        console.error("Name cannot be empty. Try again.")
        exit()
    }
    
    var result = {
        name: name,
        description: description,
        author: author,
        version: version || "0.0.1",
        license: license || "ISC",
        dependencies: {
            defaultProvider: "npm",
            default: {}
        },
        cli: {
            aliases: {}
        },
        binaries: {
            
        },
        publish: {
            source: [],
            destination: "docs/repo", 
        }
    }

    if(dependencies) {
        for(n in dependencies) {
            var v = dependencies[n];
            result.dependencies.default["npm://" + n] = v;
        }
    }

    if(devDependencies) {
        for(n in devDependencies) {
            var v = devDependencies[n];
            result.dependencies.default["npm://" + n] = v;
        }
    }

    if(scripts) {
        for(n in scripts) {
            var v = scripts[n];
            result.cli.aliases[n] = v;
        }
    }

    if(files) {
        for(n in files) {
            var v = files[n];
            result.publish.source[n] = v;
        }
    }

    if(bin) {
        if(typeof bin === 'string') {
            result.binaries[name] = bin;
        } else {
            for(n in bin) {
                var v = bin[n];
                result.binaries[n] = v;
            }
        }
    }
    
    if(config) {
        delete config.dependencies;
        delete config.devDependencies;
        delete config.bin;
        delete config.files;
        delete config.scripts;
        delete config.description;
        writeJsonFile("package.json", config)
    }

    writeJsonFile("gupm.json", result)
    
    readme = "# "+name + "\n";
    readme += "# Installation\n";
    readme += "You need [GuPM](https://github.com/azukaar/GuPM) with the [provider-npm](https://github.com/azukaar/GuPM-official#provider-npm) plugin to run this project.\n";
    readme += "```\n";
    readme += "g make\n";
    readme += "```\n";
    readme += "# Add dependencies fron npm\n";
    readme += "```\n";
    readme += "g i newPackage\n";
    readme += "```\n\n";

    if(fileExists("readme.md")) {
        writeFile("readme_GUPM.md", readme)
    } else {
        writeFile("readme.md", readme)
    }
}