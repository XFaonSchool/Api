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
	public static MongoClient? DataBaseConnection;
	public static ServerConfig? Config;
	public static IMongoDatabase? DataBase;
	public static string Name = "Axeri";

	public static void CheckLoggedIn(ApiConnection connection, Action<string> isLoggedIn)
	{
		List<OnlineInstance>? instances = DataBaseConnection?.GetDatabase(Name).GetCollection<OnlineInstance>("Accounts").Find(Builders<OnlineInstance>.Filter.Where((x) => x.ConnectionIdentifier == connection.Identifier && x.Node == Api!.ListeningAddress)).ToList();

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
    public static void Main()
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

		GlobalStorage.DataBaseConnection = new MongoClient(config.DataBase.ConnectAddress);
		GlobalStorage.DataBase = GlobalStorage.DataBaseConnection.GetDatabase(GlobalStorage.Name);

		GlobalStorage.DataBaseConnection?
			.GetDatabase(GlobalStorage.Name)
			.GetCollection<OnlineInstance>("OnlineInstances")
			.DeleteMany(Builders<OnlineInstance>.Filter.Where((x) => true));

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