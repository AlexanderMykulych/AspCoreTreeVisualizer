using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using DapperAttributeMapping;
using HelloWorld.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Models;
using Oracle.ManagedDataAccess.Client;
using Repositories;
using Swashbuckle.AspNetCore.Swagger;

namespace HelloWorld {
	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			var connectionString = Configuration["OracleConnectionString"];
			services.AddSingleton<IDbConnection>(context => new OracleConnection(connectionString));
			services.AddSingleton<CharacteristicRepository>();
            services.AddSingleton<CategoryRepository>();
            services.AddSingleton<BaseRepository<CharacteristicLookupValue>>();
            services.AddSwaggerGen(c => {
				c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
			});
			services.AddMvc();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
			TypeMapper.Initialize("Models");
			var provider = new FileExtensionContentTypeProvider();
			provider.Mappings[".ts"] = "application/x-typescript";
			if (env.IsDevelopment()) {
				app.UseBrowserLink();
				app.UseDeveloperExceptionPage();
			} else {
				app.UseExceptionHandler("/Home/Error");
			}

			app.UseSwagger();

			app.UseSwaggerUI(c => {
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
			});

			app.UseStaticFiles(new StaticFileOptions {
				ContentTypeProvider = provider
			});

			app.UseMvc(routes => {
				routes.MapRoute(
					name: "default",
					template: "{controller=Home}/{action=Index}/{id?}");
			});
		}
	}
}
