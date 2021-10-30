using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Handlers.Account
{
	public class AccountData
	{
		public string UserName = "";
		public string PasswordToken = "";
		public string DisplayName = "";
		public int TagNumber = 0001;
		public string Email = "";
		public string[] OtherEmail = new string[0];
	}

	public class Instance
	{
	}
}
