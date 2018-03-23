using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models {
	public class ExternalDependency {
		public ExternalDependency() {
			Influences = new List<Point>();
			Dependson = new List<Point>();
		}
		public String PointId {
			get; set;
		}
		public String PointName {
			get; set;
		}
		public List<Point> Influences {
			get;set;
		}
		public List<Point> Dependson {
			get; set;
		}
	}
}
