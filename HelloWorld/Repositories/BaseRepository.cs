using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Repositories {
	public class BaseRepository<T> where T : class {
		protected string _tableName;
		protected IDbConnection _dbConnection;
		public string TableName {
			get { return _tableName; }
		}
		public BaseRepository(IDbConnection dbConnection) {
			_dbConnection = dbConnection;
		}

		public virtual IEnumerable<T> GetAll() {
			string queryBody = $"SELECT * FROM \"{_tableName}\"";
			return _dbConnection.Query<T>(queryBody);
		}
		public virtual  T Get(string id) {
			string queryBody = $"SELECT * FROM \"{_tableName}\"" +
								$"WHERE \"Id\" = '{id}'";
			var result = _dbConnection.Query<T>(queryBody).AsList();
			return result.Any() ? result.First() : null;
		}

	}
}