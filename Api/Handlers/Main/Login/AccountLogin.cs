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
		private ApiConnection Connection;

		public AccountLogin(ApiConnection connection)
		{
			Connection = connection;

			connection.OnMessage("login", (raw) =>
			{
				LoginMessage message = JsonHandler.Parse<LoginMessage>(raw);
				try
				{
					Instance accountInstance = new Instance(message.Token);
					AccountData? accountData = accountInstance.Data;

					if (accountData != null)
					{
						GlobalStorage.DataBaseConnection?.GetDatabase(GlobalStorage.Name).GetCollection<OnlineInstance>("OnlineInstances").InsertOne(new OnlineInstance
						{
							UserIdentifier = accountData.Identifier,
							Node = GlobalStorage.Api!.ListeningAddress,
							ConnectionIdentifier = connection.Identifier
						});

						Logger.Success($"Account login from '{connection.RemoteAddress}'");
						connection.Send("login _reply:success", new LoginSuccessMessage { });
					}
				} catch (Exception)
				{
					connection.Send("login _reply:failed", new LoginFailedMessage { });
				}
			});
		}
	}
}
