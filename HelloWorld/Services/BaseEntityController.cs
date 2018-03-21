using Microsoft.AspNetCore.Mvc;
using Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Services {

	public abstract class BaseEntityController<T1,T2>: Controller 
														where T1:BaseRepository<T2>
														where T2:class { 
		protected T1 _repository;

		public BaseEntityController(T1 repository) {
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
