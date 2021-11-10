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
		public string UserName = "";
		public string Password = "";
		public string DisplayName = "";
		public string Email = "";
	}

	public class AccountRegisterSuccessMessage
	{
		public string Token = "";
	}

    public class AccountRegister
    {
		public AccountRegister(ApiConnection connection)
		{
			connection.OnMessage("account:register", (raw) =>
			{
				RegisterNewMessage message = JsonHandler.Parse<RegisterNewMessage>(raw);

				string accountToken = "tkn:" + Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
				Random random = new Random();

				GlobalStorage.DataBaseConnection?.GetDatabase(GlobalStorage.Name).GetCollection<AccountData>("Accounts").InsertOne(new AccountData
				{
					Email = message.Email.ToLower(),
					Password = message.Password,
					UserName = message.UserName.ToLower(),
					DisplayName = message.DisplayName,
					Token = accountToken,
					EmailVerified = false,
					Identifier = "a:" + Guid.NewGuid().ToString()
				});

				connection.Send("account:register _reply:success", new AccountRegisterSuccessMessage
				{
					Token = accountToken
				});
			});
		}
    }
}
