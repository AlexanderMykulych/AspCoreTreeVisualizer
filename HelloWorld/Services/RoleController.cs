using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Services {
	[Route("api/[controller]")]
	public class RoleController: BaseEntityController<RoleRepository,Role> {
		public RoleController(RoleRepository repository): base(repository){ }
	}
}
