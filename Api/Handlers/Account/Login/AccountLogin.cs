using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;
using Exolix.Json;
using MongoDB.Driver;

namespace Api.Handlers.Account.Login
{
	public class LoginDetails
	{
		public string EmailUserName = "";
		public string Password = "";
	}

	public class LoginSuccessResponse
	{
		public string Token = "";
	}

	public class LoginErrorResponse
	{
		public string EmailUsername = "";
	}

    public class AccountLogin
    {
		public AccountLogin(ApiConnection connection)
		{
			connection.OnMessage("account:login-get-token", (raw) =>
			{
				LoginDetails message = JsonHandler.Parse<LoginDetails>(raw);

				if (message.EmailUserName.Contains("@"))
				{
					// TODO: For Email
					return;
				}

				var userAccount = GlobalStorage.DataBaseConnection?.GetDatabase(GlobalStorage.Name).GetCollection<AccountData>("Accounts").Find(Builders<AccountData>.Filter.Where((x) => x.UserName == message.EmailUserName)).ToList();

				if (userAccount?.Count == 1)
				{
					// TODO: Handle encryption
					if (userAccount[0].Password == message.Password)
					{
						connection.Send<LoginSuccessResponse>("account:login-get-token _reply:success", new LoginSuccessResponse
						{
							Token = userAccount[0].Token
						});
						return;
					}

					connection.Send<LoginErrorResponse>("account:login-get-token _reply:bad-auth", new LoginErrorResponse
					{
						EmailUsername = message.EmailUserName
					});
					return;
				}

				connection.Send<LoginErrorResponse>("account:login-get-token _reply:does-not-exist", new LoginErrorResponse
				{
					EmailUsername = message.EmailUserName
				});
			}); 
		}
	}
}
