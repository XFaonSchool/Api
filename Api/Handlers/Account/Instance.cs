using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Handlers.Account
{
	public class OtherEmail
	{
		public string Email = "";
		public bool Verified = false;
	}

	public class AccountData
	{
		public string UserName = "";
		public string Password = "";
		public string DisplayName = "";
		public string Email = "";
		public List<OtherEmail> OtherEmails = new List<OtherEmail>();
	}

	public class Instance
	{
	}
}
