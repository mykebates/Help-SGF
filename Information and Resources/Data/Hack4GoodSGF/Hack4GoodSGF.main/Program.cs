using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hack4GoodSGF.data;
using Newtonsoft.Json;

namespace Hack4GoodSGF.main
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var service = new DataService())
            {
                System.Diagnostics.Debugger.Launch();
                var tags = service.GetTags();
                var resources = service.GetResources().Select(S => new ResourceWithTags()
                {
                    Resource = S,
                    Tags = GetTags(tags)
                }).ToList();

                string json = JsonConvert.SerializeObject(resources);
                var i = 2;
            }
        }

        static String[] GetTags(IList<Tag> tags)
        {
            Random random = new Random();
            
            int randomNumber = random.Next(1, tags.Count());
            IList<String> list = new List<String>();

            for (var i = 0; i < randomNumber; i++)
            {
                int seed = random.Next(0, tags.Count() - 1);
                list.Add(tags[seed].Name);
            }

            return list.Distinct().ToArray();
        }

    }

    class ResourceWithTags
    {
        public Resource Resource { get; set; }
        public String[] Tags { get; set; }
    }
}
