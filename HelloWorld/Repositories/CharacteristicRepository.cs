using Dapper;
using Models;
using Repositories;
using System.Collections.Generic;
using System.Data;

namespace Repositories {
	public class CharacteristicRepository : BaseRepository<Characteristic> {
		public CharacteristicRepository(IDbConnection dbConnection) : base(dbConnection) {
			_tableName = "TsiCaseCharacteristic";
		}


	}
}