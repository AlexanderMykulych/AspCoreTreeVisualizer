using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models {
	public class Point {
		public Characteristic Characteristic {
			get;set;
		}
		public PointType PointType {
			get;set;
		}
		public bool IsRequired {
			get;set;
		}
		public Category Category {
			get;set;
		}
		public PointValue DefaultPointValue {
			get;set;
		}
	}
}
