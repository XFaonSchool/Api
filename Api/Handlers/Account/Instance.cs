using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
	}
}
