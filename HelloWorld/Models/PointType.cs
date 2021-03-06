﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Utils;
using Newtonsoft.Json;

namespace Models {
	public class PointType {
		public string Id {
			get; set;
		}
		[Column("TsiName")]
		public string Name {
			get; set;
		}
		[JsonProperty(PropertyName = "value")]
		public PointTypeEnum pointTypeEnum{
			get;set;
		}
	}
}
