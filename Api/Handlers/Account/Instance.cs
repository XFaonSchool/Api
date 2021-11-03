using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Api.Handlers.Account
{
	public class OtherEmail
	{
		public string Email = "";
		public bool Verified = false;
	}

	public class AccountData
	{
		public ObjectId _id = new();
		public string UserName = "";
		public string Password = "";
		public string DisplayName = "";
		public string Email = "";
		public OtherEmail[]? OtherEmails = null;
		public string Token = "";
		public string Identifier = "";
		public bool EmailVerified = false;
	}
	 
	public class Instance
	{
		public AccountData? Data = null;

		public Instance(string auth, bool useIdentifier = false)
		{
			List<AccountData>? data;

			if (useIdentifier)
			{
				data = GlobalStorage.DataBaseConnection?
					.GetDatabase(GlobalStorage.Name)
					.GetCollection<AccountData>("Accounts")
					.Find(Builders<AccountData>.Filter.Where((x) => x.Token == auth))
					.Limit(1)
					.ToList();
			}
			else
			{
				data = GlobalStorage.DataBaseConnection?
					.GetDatabase(GlobalStorage.Name)
					.GetCollection<AccountData>("Accounts")
					.Find(Builders<AccountData>.Filter.Where((x) => x.Token == auth))
					.Limit(1)
					.ToList();
			}

			if (data?.Count == 1)
			{
				Data = data[0];
				return;
			}

			throw new Exception("The account does not exist");
		}
	}
}
