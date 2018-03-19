using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace HelloWorld.Services
{
	[Route("api/[controller]")]
	public class GetCategoryController : Controller {
		private IDbConnection _dbConnection;
		public GetCategoryController(IDbConnection dbConnection) {
			_dbConnection = dbConnection;
		}
		[HttpGet]
		public IEnumerable<Category> Get() {
			CategoryRepository categoryRepository = new CategoryRepository(_dbConnection);
			return categoryRepository.GetAll();
		}
		[HttpGet("{id}")]
		public Category Get(String id) {
			CategoryRepository categoryRepository = new CategoryRepository(_dbConnection);
			return categoryRepository.Get(id);
		}
	}
}
