using System;
using System.Collections.Generic;
using System.Data;
using Models;
using Dapper;

namespace Repositories {
	public class PointTypeRepository: BaseRepository<PointType> {
		public PointTypeRepository(IDbConnection dbConnection): base(dbConnection) {
			_tableName = "TsiPointType";
		}
	}
}
