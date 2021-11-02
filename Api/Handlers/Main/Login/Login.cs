using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;
using Exolix.Json;

namespace Api.Handlers.Main.Login
{
	public class LoginMessage
	{
		public string Token = "";
	}

	public class Login
	{
		private ApiConnection Connection;

		public Login(ApiConnection connection)
		{
			Connection = connection;

			connection.OnMessage("login", (raw) =>
			{
				LoginMessage message = JsonHandler.Parse<LoginMessage>(raw);
			});
		}
	}
}
