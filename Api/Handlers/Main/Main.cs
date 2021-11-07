using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.Main.Login;
using Exolix.Terminal;
using MongoDB.Driver;

namespace Api.Handlers.Main
{
	public class Main
	{
		public Main()
		{
			GlobalStorage.Api?.OnOpen((connection) =>
			{
				connection.OnClose((closedInstance) =>
				{
					GlobalStorage.DataBaseConnection?
						.GetDatabase(GlobalStorage.Name)
						.GetCollection<OnlineInstance>("OnlineInstances")
						.DeleteOne(Builders<OnlineInstance>.Filter.Where((x) => x.Node == GlobalStorage.Api.ListeningAddress && x.ConnectionIdentifier == closedInstance.Identifier));

					Logger.Info($"Connection closed from '{closedInstance.RemoteAddress}'");
				});

				new AccountLogin(connection);
			});
		}
	}
}
