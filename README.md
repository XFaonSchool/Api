# Developer Setup
Clone the server and open with the latest version if Visual Studio.
Build the project then open a file exploer. Navigate to `Api/bin/Debug/net6.0` and create a file called `Config.json`

Config.json is to override the default server config, inside we can specifiy a database. Axeri uses a database internaly so lets add a connection address
```json
{
	"DataBase": {
		"ConnectAddress": "Server Address"
	}
}
```

Without config.json all options will be set to default from Exolix.
To set API server port
```json
{
	"Api": {
		"Port": 8080
	}
}
```