# cloudfiles-upload

Upload files and folders (recursively) to Rackspace Cloud Files.

## Installation

```sh
npm install -g cloudfiles-upload
```

## How to use (CLI)

```sh
# Upload folder recursively
cloudfiles-upload -u $RACKSPACE_USERNAME -k $RACKSPACE_API -r LON -f ./files -c my-container -o remotefiles/path/

# Upload single file
cloudfiles-upload -u $RACKSPACE_USERNAME -k $RACKSPACE_API -r LON -f ./myfile.txt -c my-container -o remotefiles/path/myfile.txt
```

### Options

```sh
-u --username Rackspace username
-k --apiKey Rackspace API Key
-c --container Cloud Files container
-f --file file/directory path
-r --region Cloud Files Region
-o --output Output file path
```

# Features

- **ES6/ESNext** - Write _ES6_ code and _Babel_ will transpile it to ES5 for backwards compatibility
- **Test** - _Mocha_ with _Istanbul_ coverage
- **Lint** - Preconfigured _ESlint_ with _Airbnb_ config
- **CI** - _TravisCI_ configuration setup
- **Minify** - Built code will be minified for performance
