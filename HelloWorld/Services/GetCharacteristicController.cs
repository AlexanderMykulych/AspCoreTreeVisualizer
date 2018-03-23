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
		private CharacteristicRepository _repository;

		public GetCharacteristicController(CharacteristicRepository repository) {
			_repository = repository;
		}
		[HttpGet]
		public IEnumerable<Characteristic> Get() {
			return _repository.GetAll().Take(20);
		}
		[HttpGet("{id}")]
		public Characteristic Get(String id) {
			return _repository.Get(id);
		}
	}
}
