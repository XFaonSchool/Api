using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;
using MongoDB.Driver;

namespace Api.Handlers.TokenTransport.EndPoint
{
	public class CreateEndPointMessage { }

	public class CreateEndPoint
	{
		public CreateEndPoint(ApiConnection connection)
		{
			connection.OnMessage("token-transport:create-end-point", (raw) =>
			{
				GlobalStorage.DataBaseConnection?
					.GetDatabase(GlobalStorage.Name)
					.GetCollection<TokenTransportLocation>("TokenTransportLocations")
					.InsertOne(new TokenTransportLocation
					{
						Identifier = Guid.NewGuid().ToString(),
						Node = GlobalStorage.Api!.ListeningAddress,
						Connection = connection.Identifier
					});
			});

			connection.OnClose((closedConnection) =>
			{
				GlobalStorage.DataBaseConnection?
					.GetDatabase(GlobalStorage.Name)
					.GetCollection<TokenTransportLocation>("TokenTransportLocations")
					.DeleteOne(Builders<TokenTransportLocation>
						.Filter
						.Where((x) => x.Node == GlobalStorage.Api!.ListeningAddress && x.Connection == closedConnection.Identifier));
			});
		}
	}
}
