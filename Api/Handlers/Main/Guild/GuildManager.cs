using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;
using Exolix.Json;
using MongoDB.Bson;

namespace Api.Handlers.Main.Guild
{
	public class GuildJoinMessage
	{
		public string Identifier = "";
	}

	public class GuildManager
	{
		public GuildManager(ApiConnection connection)
		{
			connection.OnMessage("guild:join", (raw) =>
			{
				GlobalStorage.CheckLoggedIn(connection, (userIdentifier) =>
				{
					GuildJoinMessage message = JsonHandler.Parse<GuildJoinMessage>(raw);

					// TODO: Check banned list
					GlobalStorage.DataBase?.InsertRecord(GlobalStorage.Name, "GuildMembers", new BsonDocument
					{
						{ "GuildReference", message.Identifier },
						{ "UserIdentifier", userIdentifier }
					});
				});
			});
		}
	}
}
