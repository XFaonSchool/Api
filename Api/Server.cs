using Exolix.ApiHost;
using Exolix.DataBase;
using Exolix.Json;
using Exolix.Terminal;

public class GlobalStorage
{
    public static ApiHost? Api;
}

public class ConfigDataBaseSettings
{
	public string ConnectAddress = new DataBaseApiSettings().ConnectAddress;
}

public class ConfigApiSettings
{
	public int? Port = new ApiHostSettings().Port;
}

public class ServerConfig
{
	public ConfigDataBaseSettings DataBase = new ConfigDataBaseSettings();
	public ConfigApiSettings Api = new ConfigApiSettings();
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

        Logger.Info("Connecting to API database");

        DataBaseApi db = new DataBaseApi(new DataBaseApiSettings
        {
            ConnectAddress = config.DataBase.ConnectAddress
        });

        db.OnReady(() =>
        {
			db.FetchRecords<UwuGamer>("Axeri", "Accounts", new string[,]
			{
				{
					"displayName",
					"XFaon"
				}
			})?.ForEach((rec) =>
			{
				Logger.Info(rec.email);
			});

            Logger.Info("Starting API gateway server");

            ApiHost api = GlobalStorage.Api = new ApiHost(new ApiHostSettings
            {
                Port = 9080
            });

            api.OnReady(() =>
            {
                Logger.Success("Server is ready");

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