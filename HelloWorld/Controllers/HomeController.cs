using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HelloWorld.Models;
using Microsoft.AspNetCore.Hosting;

namespace HelloWorld.Controllers
{
    public class HomeController : Controller
    {
		private IHostingEnvironment _env;

		public HomeController(IHostingEnvironment env)
		{
			_env = env;
		}
		public IActionResult Index()
        {
			//return Content(_env.WebRootPath);
			return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult CharTree(string id)
        {
            return View();
        }
    }
}
