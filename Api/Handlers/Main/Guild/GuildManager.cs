using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;

namespace Api.Handlers.Main.Guild
{
	public class GuildManager
	{
		public GuildManager(ApiConnection connection)
		{
			connection.OnMessage("guild:join", (raw) =>
			{

			});
		}
	}
}
