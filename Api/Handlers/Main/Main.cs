using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.Main.Guild;
using Api.Handlers.Main.Login;

namespace Api.Handlers.Main
{
	public class Main
	{
		public Main()
		{
			GlobalStorage.Api?.OnOpen((connection) =>
			{
				new AccountLogin(connection);
				new GuildManager(connection);
			});
		}
	}
}
