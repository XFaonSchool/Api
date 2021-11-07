using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.ApiHost;
using Exolix.Json;
using MongoDB.Driver;

namespace Api.Handlers.TokenTransport.EndPoint
{
	public class SendEndPointMessage
	{
		public string? Identifier = null;
		public string? Token = null;
	}

	public class SendEndPoint
	{
		public SendEndPoint(ApiConnection connection)
		{
			connection.OnMessage("token-transport:send", (raw) =>
			{
				SendEndPointMessage message = JsonHandler.Parse<SendEndPointMessage>(raw);

				if (message.Identifier != null && message.Token != null)
				{
					var locations = GlobalStorage.DataBaseConnection?
						.GetDatabase(GlobalStorage.Name)
						.GetCollection<TokenTransportLocation>("TokenTransportLocations")
						.Find(Builders<TokenTransportLocation>
							.Filter
							.Where((x) => x.Identifier == message.Identifier))
						.ToList();

					if (locations?.Count > 0)
					{

						return;
					}

					// TODO: Handle non existant ID error
				}
			});
		}
	}
}
