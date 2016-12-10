using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DataAdmin.Startup))]
namespace DataAdmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
