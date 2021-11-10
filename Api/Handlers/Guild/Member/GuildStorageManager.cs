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
		public GuildMember[] Members = Array.Empty<GuildMember>();
		public GuildDisplay[] Guilds = Array.Empty<GUildDisplay>();
	}

	public class GuildDisplay
    {
		public ObjectId _id = new();
		public string DisplayName = "";
		public string Identifier = "";
    }

	public class GuildStorageManager
	{
		public GuildStorageManager(ApiConnection connection)
		{
			connection.OnMessage("guild:get-all-current", (raw) =>
			{
				GlobalStorage.CheckLoggedIn(connection, (userIdentifier) =>
				{
					GuildMember[] members = GlobalStorage.DataBaseConnection?
						.GetDatabase(GlobalStorage.Name)
						.GetCollection<GuildMember>("GuildMembers")
						.FindSync(Builders<GuildMember>
							.Filter
							.Where((x) => x.UserIdentifier == userIdentifier))
						.ToList().ToArray() ?? Array.Empty<GuildMember>();

					List<GuildDisplay> guilds = new List<GuildDisplay>();

					foreach (var member in members)
                    {

                    }
					
					connection.Send("guild:get-all-current _reply", new GuildGetAllCurrentResponse
					{
						Members = members,
						Guilds = guilds.ToArray()
					});
				});
			});
		}
	}
}
