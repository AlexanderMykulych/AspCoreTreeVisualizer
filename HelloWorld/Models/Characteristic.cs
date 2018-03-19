using System.ComponentModel.DataAnnotations.Schema;

namespace Models {
	public class Characteristic {
		public string Id {
			get;set;
		}
		[Column("TsiName")]
		public string Name {
			get;set;
		}
		[Column("TsiCaseCharTypeId")]
		public string CharacteristicTypeId {
			get;set;
		}
		[Column("TsiLookupName")]
		public string LookupName {
			get;set;
		}
	}
}