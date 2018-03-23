using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
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
using Utils;

namespace HelloWorld {
	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }
		
		public void ConfigureServices(IServiceCollection services) {
			var connectionString = Configuration["OracleConnectionString"];
			services.AddSingleton<IDbConnection>(context => new OracleConnection(connectionString));
			services.AddSingleton<CharacteristicRepository>();
			services.AddSingleton<CategoryRepository>();
			services.AddSingleton<BaseRepository<CharacteristicLookupValue>>();
			services.AddSingleton<RoleRepository>();
			services.AddTransient(provider => {
				return new Func<string, BaseRepository<CharacteristicLookupValue>>(tableName => new CharacteristicLookupValueRepository(
					provider.GetService<IDbConnection>(), tableName));
			});
			services.AddTransient(provider => {
				return new Func<Graph, Utils.BaseSettingsTreeConfigHandler>(graph => new BaseSettingsTreeConfigHandler(
					provider, graph));
			});
			services.AddSwaggerGen(c => {
				c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
			});
			services.AddMvc();
		}
		
		public void Configure(IApplicationBuilder app, IHostingEnvironment env) {

			var jsonBody = File.ReadAllText(@"C:\Users\I.Chernyushok\Downloads\Telegram Desktop\tree.json");
			//JsonParser parser = new JsonParser();
			//parser.Convert(jsonBody);

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
