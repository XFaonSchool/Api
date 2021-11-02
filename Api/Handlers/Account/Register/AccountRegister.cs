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
		public string? Email = null;
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
				
				if (message.Email != null && message.UserName != null && message.DisplayName != null && message.Password != null)
				{
					string accountToken = new TimeOnly().ToString();
					int uuidLength = 5;
					char[] chars = "!@#435asd$%^&4as45_+45-=123442klmasdfgt548ufgdf45435asdnop423567890':;,./<def423g>?~`".ToCharArray();
					string uuid = "";
					Random random = new Random();

					Action<bool> buildUuid = (bool append) =>
					{
						if (append)
						{
							uuid += '-';
						}

						for (int index = 0; index < uuidLength; index++)
						{
							uuid += chars[random.Next(0, uuidLength - 1)];
						}
					};

					buildUuid(false);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);
					buildUuid(true);

					GlobalStorage.DataBase?.InsertRecord(GlobalStorage.Name, "Accounts", new BsonDocument
					{
						{ "Email", message.Email },
						{ "Password", message.Password },
						{ "UserName", message.UserName },
						{ "DisplayName", message.DisplayName },
						{ "Token", accountToken },
						{ "EmailVerified", false },
						{ "Identifier", "a:" + uuid }
					});

					connection.Send<AccountRegisterSuccessMessage>("account:register _reply:success", new AccountRegisterSuccessMessage
					{
						Token = accountToken
					});
					return;
				}
			});
		}
    }
}
