using Dapper;
using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace HelloWorld.Services {
	public class CharacteristicRepository : BaseRepository<Characteristic> {
		public CharacteristicRepository(IDbConnection dbConnection) : base(dbConnection) {
			_tableName = "TsiCaseCharacteristic";
		}
		public override IEnumerable<Characteristic> GetAll() {
			string queryBody = "SELECT \"Characteristic\".*, \"CharacteristicType\".* FROM \"TsiCaseCharacteristic\" \"Characteristic\"" +
								"JOIN \"TsiCharType\" \"CharacteristicType\" ON \"CharacteristicType\".\"Id\" = \"Characteristic\".\"TsiCaseCharTypeId\"";
			return _dbConnection.Query<Characteristic, CharacteristicType, Characteristic>(
				queryBody,
				(characteristic, type) => {
					characteristic.CharacteristicType = type.Name;
					return characteristic;
				}
			);
		}
		public override Characteristic Get(string id) {
			string queryBody = "SELECT \"Characteristic\".*, \"CharacteristicType\".* FROM \"TsiCaseCharacteristic\" \"Characteristic\"" +
								"JOIN \"TsiCharType\" \"CharacteristicType\" ON \"CharacteristicType\".\"Id\" = \"Characteristic\".\"TsiCaseCharTypeId\"" +
								$"WHERE \"Characteristic\".\"Id\" = '{id}'";
			var result = _dbConnection.Query<Characteristic, CharacteristicType, Characteristic>(
				queryBody,
				(characteristic, type) => {
					characteristic.CharacteristicType = type.Name;
					return characteristic;
				}).AsList();
			return result.Any() ? result.First() : null;
		}
	}
}