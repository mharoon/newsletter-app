using Autofac;
using Autofac.Integration.Mvc;
using Newsletter.DAL.Infrastructure;
using Newsletter.DAL.Repositories;
using Newsletter.Service;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;

namespace Newsletter.WebAngular.App_Start
{
    public class AppInit
    {
        public static void Run()
        {
            SetAutofacContainer();
            //AutoMapperConfiguration.Configuration();
        }

        private static void SetAutofacContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerRequest();
            builder.RegisterType<DbFactory>().As<IDbFactory>().InstancePerRequest();


            //Services Depency Injection 
            builder.RegisterAssemblyTypes(typeof(SubscribersService).Assembly)
               .Where(t => t.Name.EndsWith("Service"))
               .AsImplementedInterfaces().InstancePerRequest();
            builder.RegisterAssemblyTypes(typeof(SourceTypeService).Assembly)
              .Where(t => t.Name.EndsWith("Service"))
              .AsImplementedInterfaces().InstancePerRequest();

            // Repositories Dependecy Injection
            builder.RegisterAssemblyTypes(typeof(SubscribersRepository).Assembly)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces().InstancePerRequest();

            builder.RegisterAssemblyTypes(typeof(SourceTypeRepository).Assembly)
              .Where(t => t.Name.EndsWith("Repository"))
              .AsImplementedInterfaces().InstancePerRequest();

            

            IContainer container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}