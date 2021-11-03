using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Handlers.Account.Login;
using Api.Handlers.Account.Register;

namespace Api.Handlers.Account
{
    public class Account
    {
		public Account()
		{
			GlobalStorage.Api?.OnOpen((connection) =>
			{
				_ = new AccountLogin(connection);
				_ = new AccountRegister(connection);
			});
		}
    }
}
