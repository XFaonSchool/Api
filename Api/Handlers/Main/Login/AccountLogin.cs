using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.Account;
using Exolix.ApiHost;
using Exolix.Json;

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

	public class AccountLogin
	{
		private ApiConnection Connection;

		public AccountLogin(ApiConnection connection)
		{
			Connection = connection;

			connection.OnMessage("login", (raw) =>
			{
				LoginMessage message = JsonHandler.Parse<LoginMessage>(raw);
				Instance accountInstance = new Instance(message.Token);

				if (accountInstance.Data != null)
				{
					connection.Send<LoginSuccessMessage>("login _reply:success", new LoginSuccessMessage
					{

					});
					return;
				}

				connection.Send<LoginFailedMessage>("login _reply:failed", new LoginFailedMessage
				{

				});
			});
		}
	}
}
