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
