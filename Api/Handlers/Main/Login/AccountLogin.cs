using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.Account;
using Exolix.ApiHost;
using Exolix.Json;
using Exolix.Terminal;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Api.Handlers.Main.Login
{
	public class LoginMessage
	{
		public string Token = "";
	}

	public class LoginFailedMessage
	{

	}

	public class LoginSuccessMessage
	{

	}

	public class OnlineInstance
	{
		public ObjectId _id = new ObjectId();
		public string UserIdentifier = "";
		public string Node = "";
		public string ConnectionIdentifier = "";
		public string GuildListener = "";
	}

	public class AccountLogin
	{
		private List<ApiConnection> ConnectionsTryingLogin = new();

		public AccountLogin(ApiConnection connection)
		{
			connection.OnMessage("login", (raw) =>
			{
				if (ConnectionsTryingLogin.Find(x => x.Identifier == connection.Identifier) != null)
				{
					connection.Send("login _reply:already-trying-login", new { });
					return;
				}

				ConnectionsTryingLogin.Add(connection);
				LoginMessage message = JsonHandler.Parse<LoginMessage>(raw);

				List<OnlineInstance>? loggedInRecords = GlobalStorage.DataBaseConnection?
					.GetDatabase(GlobalStorage.Name)
					.GetCollection<OnlineInstance>("OnlineInstances")
					.Find(Builders<OnlineInstance>
						.Filter
						.Where((x) => x.Node == GlobalStorage.Api!.ListeningAddress && x.ConnectionIdentifier == connection.Identifier))
					.ToList();

				if (loggedInRecords?.Count > 0)
				{
					ConnectionsTryingLogin.Remove(connection);
					connection.Send("login _reply:already-logged-in", new { });
					return;
				}

				try
				{
					Instance accountInstance = new Instance(message.Token);
					AccountData? accountData = accountInstance.Data;

					if (accountData != null)
					{
						Console.WriteLine("Insert");
						GlobalStorage.DataBaseConnection?
							.GetDatabase(GlobalStorage.Name)
							.GetCollection<OnlineInstance>("OnlineInstances")
							.InsertOne(new OnlineInstance
								{
									UserIdentifier = accountData.Identifier,
									Node = GlobalStorage.Api!.ListeningAddress,
									ConnectionIdentifier = connection.Identifier
								});

						ConnectionsTryingLogin.Remove(connection);
						DebugLogger.Info("An account logged in from '" + connection.RemoteAddress + "', user identifier '" + accountData.Identifier + "', and connection identifier '" + connection.Identifier + "'");
						connection.Send("login _reply:success", new LoginSuccessMessage { });
					}
				} catch (Exception)
				{
					ConnectionsTryingLogin.Remove(connection);
					connection.Send("login _reply:invalid", new LoginFailedMessage { });
				}
			});
		}
	}
}
