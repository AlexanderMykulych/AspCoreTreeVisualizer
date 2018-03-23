using Dapper;
using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories
{
	public class RoleRepository: BaseRepository<Role> {
		public RoleRepository(IDbConnection dbConnection): base(dbConnection){
			_tableName = "SysAdminUnit";
		}

		public override IEnumerable<Role> GetAll() {
			string queryBody = $"SELECT * FROM \"{_tableName}\"" +
								"WHERE \"SysAdminUnitTypeValue\" = 0 OR \"SysAdminUnitTypeValue\" = 6";
			return _dbConnection.Query<Role>(queryBody);
		}
		public override Role Get(string id) {
			string queryBody = $"SELECT * FROM \"{_tableName}\"" +
								"WHERE \"SysAdminUnitTypeValue\" = 0 OR \"SysAdminUnitTypeValue\" = 6"+
								$"AND \"Id\" = '{id}'";
			var result = _dbConnection.Query<Role>(queryBody).AsList();
			return result.Any() ? result.First() : null;
		}
	}
}
