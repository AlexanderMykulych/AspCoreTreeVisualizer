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
		private BaseRepository<CharacteristicLookupValue> _repository;
		public CharacteristicLookupValueController(BaseRepository<CharacteristicLookupValue> repository) {
			_repository = repository;
		}

		[HttpGet("{tableName}")]
		public IEnumerable<CharacteristicLookupValue> Get(String tableName) {
			return _repository.GetAll(tableName);
		}
	}
}
