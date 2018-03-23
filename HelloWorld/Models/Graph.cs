using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models {
	public class Graph {
		public string Name {
			get; set;
		}
		public List<Point> Points {
			get;set;
		}
		public List<Dependency> Dependencies {
			get; set;
		}
		public List<ExternalDependency> ExternalDependencies {
			get {
				if ((Dependencies.Count != 0) && (Points.Count != 0)) {
					return GetExternalDependencies();
				} else {
					return new List<ExternalDependency>();
				}
			}
		}
		public List<ExternalDependency> GetExternalDependencies() {
			return Points.Select<Point, ExternalDependency>(point => {
				var externalDependency = new ExternalDependency();
				externalDependency.PointName = point.Label;
				externalDependency.PointId = point.Id;
				Dependencies.ForEach(item => {
					if (item.Start.Id.Equals(point.Id)) {
						var influencePoint = item.End.Clone() as Point;
						influencePoint.Values = item.Values;
						influencePoint.PointRoles  = item.PointRoles;
						externalDependency.Influences.Add(influencePoint);
					}
});
				Dependencies.ForEach(item => {
					if (item.End.Id.Equals(point.Id)) {
						var dependsonPoint = item.Start.Clone() as Point;
						dependsonPoint.Values = item.Values;
						dependsonPoint.PointRoles = item.PointRoles;
						externalDependency.Dependson.Add(dependsonPoint);
					}
				});
				return externalDependency;
			}).ToList();
		}
	}
}
