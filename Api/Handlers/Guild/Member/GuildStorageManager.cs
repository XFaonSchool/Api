using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.Account;
using Exolix.ApiHost;
using MongoDB.Driver;
using Exolix.Terminal;

namespace Api.Handlers.Guild.Member
{
	public class GuildGetAllCurrentResponse
	{
		public GuildMember[] Guilds = Array.Empty<GuildMember>();
	}

	public class GuildStorageManager
	{
		public GuildStorageManager(ApiConnection connection)
		{
			connection.OnMessage("guild:get-all-current", (raw) =>
			{
				GlobalStorage.CheckLoggedIn(connection, (userIdentifier) =>
				{
					GuildMember[] guilds = GlobalStorage.DataBaseConnection?
						.GetDatabase(GlobalStorage.Name)
						.GetCollection<GuildMember>("GuildMembers")
						.FindSync(Builders<GuildMember>
							.Filter
							.Where((x) => x.UserIdentifier == userIdentifier))
						.ToList().ToArray() ?? Array.Empty<GuildMember>();

					Logger.Info("Fetched all guilds");
					connection.Send("guild:get-all-current _reply", new GuildGetAllCurrentResponse
					{
						Guilds = guilds
					});
				});
			});
		}
	}
}
