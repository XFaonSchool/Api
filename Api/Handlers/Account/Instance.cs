using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exolix.DataBase;
using MongoDB.Bson;

namespace Api.Handlers.Account
{
	public class OtherEmail
	{
		public string Email = "";
		public bool Verified = false;
	}

	public class AccountData
	{
		public ObjectId _id = new ObjectId();
		public string UserName = "";
		public string Password = "";
		public string DisplayName = "";
		public string Email = "";
		public OtherEmail[]? OtherEmails = null;
		public string Token = "";
		public string Identifier = "";
		public Boolean EmailVerified = false;
	}

	public class Instance
	{
		public AccountData? Data = null;

		public Instance(string? token = null, string? identifier = null)
		{
			List<AccountData> data = GlobalStorage.DataBase?.FetchRecords<AccountData>(GlobalStorage.Name, "Accounts", new string[,]
			{
				{ (token != null ? "Token" : "Identifier"), (token != null ? token : identifier ?? "1a") }
			}, new QueryFetchOptions { 
				Limit = 1
			}) ?? new List<AccountData>();

			if (data.Count == 1)
			{
				Data = data[0];
				return;
			}

			throw new Exception("The account does not exist");
		}
	}
}
