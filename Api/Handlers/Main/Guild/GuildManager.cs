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

	public class GuildMember
	{
		public ObjectId _id = new ObjectId();
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
						List<GuildMember> bannedMember = GlobalStorage.DataBase?.FetchRecords<GuildMember>(GlobalStorage.Name, "GuildBannedMembers", new string[,]
						{
							{ "GuildReference", message.Identifier },
							{ "UserIdentifier", userIdentifier }
						}) ?? new List<GuildMember>();

						if (bannedMember.Count > 0)
						{
							connection.Send<GuildJoinStatusMessage>("guild:join _reply:banned", new GuildJoinStatusMessage
							{
								Identifier = message.Identifier
							});
							return;
						}

						// TODO: Check if the user is already in
						List<GuildMember> guildMember = GlobalStorage.DataBase?.FetchRecords<GuildMember>(GlobalStorage.Name, "GuildMembers", new string[,]
						{
							{ "UserIdentifier", userIdentifier },
							{ "GuildReference", message.Identifier }
						}) ?? new List<GuildMember>();

						if (guildMember.Count > 0)
						{
							connection.Send<GuildJoinStatusMessage>("guild:join _reply:member-already-exists", new GuildJoinStatusMessage
							{
								Identifier = message.Identifier
							});
							return;
						}

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
				});
			});
		}
	}
}
