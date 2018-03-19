﻿using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Repositories {
	public class BaseRepository<T> where T: class {
		protected string _tableName;
		protected IDbConnection _dbConnection;
		public BaseRepository(IDbConnection dbConnection) {
			_dbConnection = dbConnection;
		}

		public IEnumerable<T> GetAll() {
			string queryBody = $"SELECT * FROM \"{_tableName}\"";
			return _dbConnection.Query<T>(queryBody);
		}
		public T Get(string id) {
			string queryBody = $"SELECT * FROM \"{_tableName}\"" +
								$"WHERE \"Id\" = '{id}'";
			var result = _dbConnection.Query<T>(queryBody).AsList();
			return result.Any() ? result.First() : null;
		}

	}
}