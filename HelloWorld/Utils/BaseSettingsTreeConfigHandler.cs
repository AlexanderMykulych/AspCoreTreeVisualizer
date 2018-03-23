using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Models;
using Newtonsoft.Json;


namespace Utils {
	public class BaseSettingsTreeConfigHandler {
		private Graph _graph;
		private IServiceProvider _serviceProvider;
		public BaseSettingsTreeConfigHandler(IServiceProvider serviceProvider, Graph graph) {
			_graph = graph;
			_serviceProvider = serviceProvider;
		}
		public void UpdateGraphConfig() {
			var jsonBody = TransformToExternalFormat();
		}
		public string TransformToExternalFormat() {
			var externalConfig = String.Empty;

			externalConfig = Newtonsoft.Json.JsonConvert.SerializeObject(_graph);
			
			return externalConfig;
		}
	}
}
