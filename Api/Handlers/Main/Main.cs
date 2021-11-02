using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Handlers.Main
{
	public class Main
	{
		public Main()
		{
			GlobalStorage.Api?.OnOpen((connection) =>
			{
				
			});
		}
	}
}
