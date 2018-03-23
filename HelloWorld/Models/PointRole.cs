using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Models {
	public class PointRole {
		public string Id {
			get;set;
		}
		public Role Role {
			get;set;
		}
		[Column("TsiIsRequired")]
		public bool IsRequired {
			get; set;
		}
		public PointValue DefaultPointValue {
			get;set;
		}
	}
}
