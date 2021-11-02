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
		public string? Identifier = null;
	}

	public class GuildJoinStatusMessage {
		public string Identifier = "";
	}

	public class GuildBannedMembers
	{
		public string GuildReference = "";
		public string UserIdentifier = "";
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

					if (message.Identifier != null)
					{
						List<GuildBannedMembers> bannedMember = GlobalStorage.DataBase?.FetchRecords<GuildBannedMembers>(GlobalStorage.Name, "GuildBannedMembers", new string[,]
						{
							{ "GuildReference", message.Identifier },
							{ "UserIdentifier", userIdentifier }
						}) ?? new List<GuildBannedMembers>();

						if (bannedMember.Count > 0)
						{
							connection.Send<GuildJoinStatusMessage>("guild:join _reply:banned", new GuildJoinStatusMessage
							{
								Identifier = message.Identifier
							});
							return;
						}

						// TODO: Check if the user is already in

						GlobalStorage.DataBase?.InsertRecord(GlobalStorage.Name, "GuildMembers", new BsonDocument
						{
							{ "GuildReference", message.Identifier },
							{ "UserIdentifier", userIdentifier }
						});

						connection.Send<GuildJoinStatusMessage>("guild:join _reply:success", new GuildJoinStatusMessage {
							Identifier = message.Identifier
						});
						return;
					}

					connection.Send<GuildJoinStatusMessage>("guild:join _reply:failed", new GuildJoinStatusMessage
					{
						Identifier = message.Identifier
					});
				});
			});
		}
	}
}
