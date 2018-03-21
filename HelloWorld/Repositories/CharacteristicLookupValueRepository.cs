using HelloWorld.Models;
using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories {
	public class CharacteristicLookupValueRepository : BaseRepository<CharacteristicLookupValue> {
		public CharacteristicLookupValueRepository(IDbConnection dbConnection) : base(dbConnection) { }
	}
}
