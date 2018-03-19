using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Models;
using Repositories;
using Microsoft.AspNetCore.Mvc;


namespace Services {
	[Route("api/[controller]")]
	public class GetAllPointTypeController : Controller{
		private IDbConnection _dbConnection;
		public GetAllPointTypeController(IDbConnection dbConnection) {
			_dbConnection = dbConnection;
		}
		[HttpGet]
		public IEnumerable<PointType> Get() {
			PointTypeRepository pointTypeRepository = new PointTypeRepository(_dbConnection);
			return pointTypeRepository.GetAll();
		}
	}
}
