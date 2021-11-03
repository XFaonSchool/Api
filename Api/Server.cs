using Api.Handlers.Account;
using Api.Handlers.Main;
using Api.Handlers.Main.Login;
using Exolix.ApiHost;
using Exolix.Json;
using Exolix.Terminal;
using MongoDB.Bson;
using MongoDB.Driver;

public class GlobalStorage
{
    public static ApiHost? Api;
	public static MongoClient? DataBase;
	public static ServerConfig? Config;
	public static string Name = "Axeri";

	public static void CheckLoggedIn(ApiConnection connection, Action<string> isLoggedIn)
	{
		var instances = DataBase?.GetDatabase(Name).GetCollection<OnlineInstances>("Accounts").Find(Builders<OnlineInstances>.Filter.Where((x) => x.ConnectionIdentifier == connection.Identifier && x.Node == Api!.ListeningAddress)).ToList();

		if (instances?.Count > 0)
		{
			isLoggedIn(instances[0].UserIdentifier);
			return;
		}

		connection.Close();
	}
}
 
public class ConfigDataBaseSettings
{
	public string ConnectAddress = "mongodb://localhost:27017";
}

public class ConfigApiSettings
{
	public int? Port = 1427;
}

public class ServerConfig
{
	public ConfigDataBaseSettings DataBase = new ConfigDataBaseSettings();
	public ConfigApiSettings Api = new ConfigApiSettings();
	public string DataBaseName = "Axeri";
}

class Server
{
    public static void Main(string[] args)
    {
        Logger.Info("Axeri API GateWay Server");
		Logger.Info("Reading configuration file");

		ServerConfig config;

		try
		{
			string configRaw = File.ReadAllText(Path.Join(Directory.GetCurrentDirectory(), "./Config.json"));
			config = JsonHandler.Parse<ServerConfig>(configRaw);
		} catch (Exception)
		{
			config = new ServerConfig();
		}

		GlobalStorage.Config = config;
		GlobalStorage.Name = config.DataBaseName;
        Logger.Info("Connecting to API database");

		GlobalStorage.DataBase = new MongoClient(config.DataBase.ConnectAddress);

        Logger.Info("Starting API gateway server");

        ApiHost api = GlobalStorage.Api = new ApiHost(new ApiHostSettings
        {
            Port = config.Api.Port
        });

        api.OnReady(() =>
        {
            Logger.Success("Server is ready");

			new Account();
			new Main();

            api.OnOpen((connection) =>
            {
                Logger.Info($"New connection opened from '{connection.RemoteAddress}'");
            });
        });

        api.Run();
    }
}