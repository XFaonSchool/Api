using Exolix.ApiHost;
using Exolix.Terminal;

public class GlobalStorage
{
    public static ApiHost? Api;
}

class Server
{
    public static void Main(string[] args)
    {
        Logger.Info("Axeri API GateWay Server");
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
    }
}