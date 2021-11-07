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
	public class EndPointCreatedResponse {
		public string Identifier = "";
	}

	public class CreateEndPoint
	{
		public CreateEndPoint(ApiConnection connection)
		{
			connection.OnMessage("token-transport:create-end-point", (raw) =>
			{
				IFindFluent<TokenTransportLocation, TokenTransportLocation>? locations = GlobalStorage.DataBaseConnection?
					.GetDatabase(GlobalStorage.Name)
					.GetCollection<TokenTransportLocation>("TokenTransportLocations")
					.Find(Builders<TokenTransportLocation>
						.Filter
						.Where((x) => x.Node == GlobalStorage.Api!.ListeningAddress && x.Connection == connection.Identifier));

				if (locations?.CountDocuments() > 0)
				{
					connection.Send<object>("token-transport:create-end-point _reply:end-point-exists", new { });
					return;
				}

				string endPointIdentifier = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();

				GlobalStorage.DataBaseConnection?
					.GetDatabase(GlobalStorage.Name)
					.GetCollection<TokenTransportLocation>("TokenTransportLocations")
					.InsertOne(new TokenTransportLocation
					{
						Identifier = endPointIdentifier,
						Node = GlobalStorage.Api!.ListeningAddress,
						Connection = connection.Identifier
					});

				connection.Send<EndPointCreatedResponse>("token-transport:create-end-point _reply:success", new EndPointCreatedResponse
				{
					Identifier = endPointIdentifier
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
