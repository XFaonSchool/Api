using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.Guild.Member;
using Exolix.Terminal;

namespace Api.Handlers.Guild
{
	public class Guild
	{
		public Guild()
		{
			Logger.Info("P");
			GlobalStorage.Api?.OnOpen((connection) =>
			{
				Logger.Info("L");
				_ = new GuildJoinManager(connection);
			});
		}
	}
}
