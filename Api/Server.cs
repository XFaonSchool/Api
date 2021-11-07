using Api.Handlers.Account;
using Api.Handlers.Guild;
using Api.Handlers.Main;
using Api.Handlers.Main.Login;
using Api.Handlers.TokenTransport;
using Exolix.ApiHost;
using Exolix.Json;
using Exolix.Terminal;
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
		List<OnlineInstance>? instances = DataBaseConnection?
			.GetDatabase(Name)
			.GetCollection<OnlineInstance>("OnlineInstances")
			.Find(Builders<OnlineInstance>
				.Filter
				.Where((x) => 
					x.ConnectionIdentifier == connection.Identifier && x.Node == Api!.ListeningAddress)
				)
			.ToList();

		if (instances?.Count > 0)
		{
			DebugLogger.Info("User passed checks for being logged in from connection address '" + connection.RemoteAddress + "', account identifier '" + instances[0].UserIdentifier + "', connection identifier '" + connection.Identifier + "'");
			isLoggedIn(instances[0].UserIdentifier);
			return;
		}

		connection.Close();
		DebugLogger.Warning("A user was expected to be logged in for the message but was not, server closed connection from '" + connection.RemoteAddress + "'");
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
		Logger.SetTimeStampsMode(true);
		DebugLogger.SetDebugLogFile();
		DebugLogger.SetDebugLogOverFlowSize(50000);

        Logger.Info("Axeri API GateWay Server");
		Logger.Info("Reading configuration file");

		ServerConfig config;

		try
		{
			DebugLogger.Info($"Looking for server config at {Path.Join(Directory.GetCurrentDirectory(), "./ Config.json")}");
			string configRaw = File.ReadAllText(Path.Join(Directory.GetCurrentDirectory(), "./Config.json"));
			config = JsonHandler.Parse<ServerConfig>(configRaw);

			Logger.Success("Server config found");
			DebugLogger.Success($"server config found at {Path.Join(Directory.GetCurrentDirectory(), "./ Config.json")}");
		} catch (Exception)
		{
			DebugLogger.Warning($"No server config found at path {Path.Join(Directory.GetCurrentDirectory(), "./ Config.json")}");
			Logger.Warning("No server config detected, using default config instead");
			config = new ServerConfig();
		}

		GlobalStorage.Config = config;
		GlobalStorage.Name = config.DataBaseName;
        Logger.Info("Connecting to API database");
		DebugLogger.Info("Starting to connect to API database");

		GlobalStorage.DataBaseConnection = new MongoClient(config.DataBase.ConnectAddress);
		GlobalStorage.DataBase = GlobalStorage.DataBaseConnection.GetDatabase(GlobalStorage.Name);

		DebugLogger.Success("Connected to API database");
		Logger.Success("Connected to API database");

        Logger.Info("Starting API gateway server");
		DebugLogger.Info("Starting API gateway server");

		ApiHost api = GlobalStorage.Api = new ApiHost(new ApiHostSettings
		{
			Port = config.Api.Port,
			PeerAuth = new ApiPeerAuth
			{
				Key1 = "1",
				Key2 = "1"
			},
			PeerNodes = new List<ApiPeerNode>
			{
				new ApiPeerNode
				{
					Key1 = "1",
					Key2 = "1",
					Port = config.Api.Port
				}
			}
		});

		GlobalStorage.DataBaseConnection?
			.GetDatabase(GlobalStorage.Name)
			.GetCollection<OnlineInstance>("OnlineInstances")
			.DeleteMany(Builders<OnlineInstance>.Filter.Where((x) => x.Node == "ws://0.0.0.0:" + config.Api.Port));

		GlobalStorage.DataBaseConnection?
			.GetDatabase(GlobalStorage.Name)
			.GetCollection<OnlineInstance>("TokenTransportLocations")
			.DeleteMany(Builders<OnlineInstance>.Filter.Where((x) => x.Node == "ws://0.0.0.0:" + config.Api.Port));

		api.OnReady(() =>
        {
            Logger.Success($"Server is ready at listening address '{api.ListeningAddress}'");
			DebugLogger.Info($"Server started listening on address '${api.ListeningAddress}'");

			_ = new Account();
			_ = new Main();
			_ = new Guild();
			_ = new TokenTransport();

            api.OnOpen((connection) =>
            {
                Logger.Info($"New connection opened from '{connection.RemoteAddress}'");
				DebugLogger.Info($"New client connected from '{connection.RemoteAddress}'");
            });
        });

        api.Run();
    }
}