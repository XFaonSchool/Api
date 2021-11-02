using Api.Handlers.Account;
using Api.Handlers.Main;
using Exolix.ApiHost;
using Exolix.DataBase;
using Exolix.Json;
using Exolix.Terminal;

public class GlobalStorage
{
    public static ApiHost? Api;
	public static DataBaseApi? DataBase;
	public static ServerConfig? Config;
	public static string Name = "Axeri";
}

public class ConfigDataBaseSettings
{
	public string ConnectAddress = new DataBaseApiSettings().ConnectAddress;
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

        DataBaseApi db = GlobalStorage.DataBase = new DataBaseApi(new DataBaseApiSettings
        {
            ConnectAddress = config.DataBase.ConnectAddress
        });

        db.OnReady(() =>
        {
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
        });

        db.Run();
    }
}