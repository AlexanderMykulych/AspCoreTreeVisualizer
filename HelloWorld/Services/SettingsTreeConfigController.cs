using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Models;
using Utils;

namespace Services {
	[Route("api/[controller]")]
	public class SettingsTreeConfigController:Controller {
		private Func<Graph, BaseSettingsTreeConfigHandler> _handlerProvider;

		public SettingsTreeConfigController(Func<Graph, BaseSettingsTreeConfigHandler> handlerProvider) {
			_handlerProvider = handlerProvider;
		}
		//[HttpPost]
		//public void Post(string graphConfig) {
		//	var handler = _handlerProvider(JsonConvert.DeserializeObject<Graph>(graphConfig));
		//}
		[HttpPost]
		public void Post([FromBody]Graph graphConfig) {
			var handler = _handlerProvider(graphConfig);
			handler.UpdateGraphConfig();
		}
	}
}
