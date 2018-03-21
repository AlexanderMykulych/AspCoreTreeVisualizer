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
	public class GetCategoryController : Controller {
		private CategoryRepository _repository;
		public GetCategoryController(CategoryRepository repository) {
			_repository = repository;
		}
		[HttpGet]
		public IEnumerable<Category> Get() {
			return _repository.GetAll();
		}
		[HttpGet("{id}")]
		public Category Get(String id) {
			return _repository.Get(id);
		}
	}
}