using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HelloWorld.WebApiTest
{
	[Route("api/[controller]")]
	public class CharacteristicController : Controller
	{
		// GET: api/<controller>
		[HttpGet("{text}")]
        public DictResult Get(string text)
        {
			return new DictResult()
			{
				Results = Enumerable.Range(1, 2000)
				.Select(x => x.ToString())
				.Where(x => x.Contains(text))
				.Select(x => new DictValue
				{
					Id = x,
					Text = x
				})
			};
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
    }
}
