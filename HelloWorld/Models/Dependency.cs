using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models {
	public class Dependency {
		public String Id {
			get; set;
		}
		[Column("TsiStartPointId")]
		public Point Start {
			get;set;
		}
		[Column("TsiEndPointId")]
		public Point End {
			get; set;
		}
		public String GraphId {
			get; set;
		}
		public List<PointValue> Values {
			get; set;
		}
		public List<PointRole> PointRoles {
			get; set;
		}
	}
	
	
}
