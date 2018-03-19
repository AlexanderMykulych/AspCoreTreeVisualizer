using Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories {
	public class CategoryRepository : BaseRepository<Category> {
		public CategoryRepository(IDbConnection dbConnection) : base(dbConnection) {
			_tableName = "TsiServiceCallCategory";
		}
	}
}
