using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repositories;
using Models;

namespace HelloWorld.Services {
	[Route("api/[controller]")]
	public class CharacteristicLookupValueController {
		private Func<string, BaseRepository<CharacteristicLookupValue>> _repositoryProvider;

		public CharacteristicLookupValueController(Func<string, BaseRepository<CharacteristicLookupValue>> repositoryProvider) {
			_repositoryProvider = repositoryProvider;
		}

		[HttpGet("{tableName}")]
		public IEnumerable<CharacteristicLookupValue> Get(String tableName) {
			return _repositoryProvider(tableName).GetAll();
		}
	}
}
