using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.TokenTransport.EndPoint;
using MongoDB.Bson;

namespace Api.Handlers.TokenTransport
{
	public class TokenTransportLocation
	{
		public ObjectId _id = new();
		public string Identifier = "";
		public string Node = "";
		public string Connection = "";
	}

	public class TokenTransport
	{
		public TokenTransport()
		{
			GlobalStorage.Api?.OnOpen((connection) =>
			{
				_ = new CreateEndPoint(connection);
			});
		}
	}
}
