using Models;
using System;
using System.Collections.Generic;
using System.Data;
using Dapper;

namespace Repositories {
    public class PointRepository : BaseRepository<Point> {
        public PointRepository(IDbConnection dbConnection) : base(dbConnection) {
            _tableName = "TsiPoint";
        }
        public bool Save(Point point) {
            //var queryBody = $"INSERT INTO {_tableName}
            //_dbConnection.Execute
            return true;
        }
    }
}
