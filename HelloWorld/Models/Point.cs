using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models {
	public class Point: ICloneable {
		public string Id {
			get; set;
		}
		public Characteristic Characteristic {
			get;set;
		}
		public PointType PointType {
			get;set;
		}
		public bool IsRequired {
			get;set;
		}
		public PointValue DefaultValue {
			get;set;
		}
		public string Label {
			get;set;
		}
		public List<PointValue> Values {
			get; set;
		}
		public List<PointRole> PointRoles {
			get; set;
		}

		public object Clone() {
			return new Point() {
				Id = this.Id,
				Characteristic = this.Characteristic,
				PointType = this.PointType,
				IsRequired = this.IsRequired,
				DefaultValue = null,
				Label = this.Label,
				Values = new List<PointValue>(),
				PointRoles = new List<PointRole>()
			};
		}
	}
}
