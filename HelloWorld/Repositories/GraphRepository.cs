﻿using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Repositories {
	public class GraphRepository : BaseRepository<Graph> {
		public GraphRepository(IDbConnection dbConnection, PointRepository pointRepository, DependencyRepository dependencyRepository) : base(dbConnection) { }
		public void Save(Graph graph) {

		}
	}
}
