using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models {
	public class PointValue {
		[Column("TsiIntValue")]
		public int IntValue {
			get;set;
		}
		[Column("TsiFloatValue")]
		public double FloatValue {
			get; set;
		}
		[Column("TsiBooleanValue")]
		public bool BooleanValue {
			get; set;
		}
		[Column("TsiDateTimeValue")]
		public DateTime DateTimeValue {
			get;set;
		}
		[Column("TsiDateValue")]
		public DateTime DateValue {
			get;set;
		}
		[Column("TsiGuidValue")]
		public string GuidValue {
			get;set;
		}
		public string PointId {
			get; set;
		}
	}
}