using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;
using Exolix.Json;
using Exolix.Terminal;
using MongoDB.Bson;

namespace Api.Handlers.Account.Register
{
	public class RegisterNewMessage
	{
		public string? UserName = null;
		public string? Password = null;
		public string? DisplayName = null;
	}

    public class AccountRegister
    {
		public AccountRegister(ApiConnection connection)
		{
			connection.OnMessage("account:register", (raw) =>
			{
				RegisterNewMessage message = JsonHandler.Parse<RegisterNewMessage>(raw);
				
				if (message.UserName != null && message.DisplayName != null && message.Password != null)
				{
					Logger.Info("Usrn: " + message.UserName + " DsplNme: " + message.DisplayName);
					return;
				}
			});
		}

		private Instance CreateAccount(RegisterNewMessage message)
		{
			GlobalStorage.DataBase?.InsertRecord(GlobalStorage.Name, "Accounts", new BsonDocument
			{
				{ "UserName", message.UserName },
				{ "", "" }
			});

			return new Instance();
		}
    }
}
