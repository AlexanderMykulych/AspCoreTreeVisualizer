using Microsoft.AspNetCore.Mvc;
using Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Services {

	public abstract class BaseEntityController<T2>: Controller where T2:BaseRepository<T2> {
		protected IDbConnection _dbConnection;
		protected BaseRepository<T2> _repository;

		public BaseEntityController(IDbConnection dbConnection, BaseRepository<T2> repository) {
			_dbConnection = dbConnection;
			_repository = repository;
		}
		[HttpGet]
		public IEnumerable<T2> Get() {
			return _repository.GetAll();
		}
		[HttpGet("{id}")]
		public T2 Get(String id) {
			return _repository.Get(id);
		}
	}
}
