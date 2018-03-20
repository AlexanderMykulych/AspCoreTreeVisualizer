using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace HelloWorld.Services {
	[Route("api/[controller]")]
	public class GetCharacteristicController : Controller {
		private IDbConnection _dbConnection;
		private CharacteristicRepository _repository;

		public GetCharacteristicController(CharacteristicRepository repository) {
			//_dbConnection = dbConnection;
			_repository = repository;
		}
		[HttpGet]
		public IEnumerable<Characteristic> Get() {
			//CharacteristicRepository characteristicRepository = new CharacteristicRepository(_dbConnection);
			return _repository.GetAll();
		}
		[HttpGet("{id}")]
		public Characteristic Get(String id) {
			//CharacteristicRepository characteristicRepository = new CharacteristicRepository(_dbConnection);
			return _repository.Get(id);
		}
	}
}
