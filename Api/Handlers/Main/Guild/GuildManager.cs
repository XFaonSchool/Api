using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;
using Exolix.Json;
using Exolix.Terminal;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Api.Handlers.Main.Guild
{
	public class GuildJoinMessage
	{
		public string? Identifier = null;
	}

	public class GuildJoinStatusMessage
	{
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
						List<GuildMember>? bannedMember = GlobalStorage.DataBaseConnection?
							.GetDatabase(GlobalStorage.Name)
							.GetCollection<GuildMember>("GuildBannedMembers")
							.Find(Builders<GuildMember>.Filter.Where((x) => x.GuildReference == message.Identifier && x.UserIdentifier == userIdentifier))
							.ToList();

						if (bannedMember?.Count > 0)
						{
							connection.Send<GuildJoinStatusMessage>("guild:join _reply:banned", new GuildJoinStatusMessage
							{
								Identifier = message.Identifier
							});
							return;
						}

						List<GuildMember>? guildMember = GlobalStorage.DataBaseConnection?
							.GetDatabase(GlobalStorage.Name)
							.GetCollection<GuildMember>("GuildMembers")
							.Find(Builders<GuildMember>.Filter.Where((x) => x.GuildReference == message.Identifier && x.UserIdentifier == userIdentifier))
							.ToList();

						if (guildMember?.Count > 0)
						{
							connection.Send("guild:join _reply:member-already-exists", new GuildJoinStatusMessage
							{
								Identifier = message.Identifier
							});
							return;
						}

						GlobalStorage.DataBaseConnection?
							.GetDatabase(GlobalStorage.Name)
							.GetCollection<GuildMember>("GuildMembers")
							.InsertOne(new GuildMember
							{
								GuildReference = message.Identifier,
								UserIdentifier = userIdentifier
							});

						connection.Send<GuildJoinStatusMessage>("guild:join _reply:success", new GuildJoinStatusMessage
						{
							Identifier = message.Identifier
						});
						return;
					}
				});
			});
		}
	}
}
