using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Models {
	public class PointType {
		public string Id {
			get; set;
		}
		[Column("TsiName")]
		public string Name {
			get;set;
		}
	}
}
