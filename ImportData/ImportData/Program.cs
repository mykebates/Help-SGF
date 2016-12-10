using Nest;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ImportData
{
    public class SearchClient
    {
        private string _ES_REPO = "";
        private string _ES_SERVER = "";
        private ElasticClient _Server;

        public string ES_REPO { get { return _ES_REPO; } }
        public string ES_SERVER { get { return _ES_SERVER; } }
        public ElasticClient Server { get { return _Server; } }

        public SearchClient()
        {
            _ES_REPO = ConfigurationManager.AppSettings["ES_REPO"] ?? "hack4goodsgf";
            _ES_SERVER = ConfigurationManager.AppSettings["ES_SERVER"] ?? "http://localhost:9200";
            var node = new Uri(_ES_SERVER);
            _Server = new ElasticClient(new Nest.ConnectionSettings(node).DefaultIndex(_ES_REPO));

        }
    }
    class Program
    {
        protected static int NumSent;
        static void Main(string[] args)
        {


            var client = new SearchClient();

            string fileData = System.IO.File.ReadAllText(@"C:\inetpub\domains\Help SGF\Information and Resources\Data\wifi_hotspots.json");

            IList<OtherResource> resources = JsonConvert.DeserializeObject<IList<OtherResource>>(fileData);
            foreach(var resource in resources)
            {
                resource.location = new GeoPoint();
                resource.location.lat = resource.lat;
                resource.location.lon = resource.lon;

            }

            var pages = (resources.Count / 250) + (resources.Count % 250 > 0 ? 1 : 0);

            for (int i = 0; i < pages; i++)
            {

                IList<OtherResource> docsToIndex = new List<OtherResource>();
                foreach (var asset in resources.Skip(250 * i).Take(250).ToList())
                {
                    var docToIndex = new OtherResource();
                    docToIndex.resource_type = "wifi";
                    docToIndex.name = asset.name;
                    docToIndex.lat = asset.lat;
                    docToIndex.lon = asset.lon;
                    docToIndex.location = asset.location;

                    docsToIndex.Add(docToIndex);

                }

                Interlocked.Exchange(ref NumSent, 0);
                var tasks = new List<Task>();


                var t = client.Server.IndexManyAsync<OtherResource>(docsToIndex, client.ES_REPO)
                   .ContinueWith(tt =>
                   {
                       Interlocked.Add(ref NumSent, 1024);
                   });
                tasks.Add(t);
                Task.WaitAll(tasks.ToArray());
            }




        }
    }

    [ElasticsearchType(Name = "other_resources")]
    public class OtherResource
    {
        public string name { get; set; }
        public string resource_type { get; set; }
        [Number(NumberType.Double, Name = "lat")]

        public double lat { get; set; }
        [Number(NumberType.Double, Name = "lon")]
        public double lon { get; set; }
        [GeoPoint(Name="location")]
        public GeoPoint location { get; set; }

    }


    public class GeoPoint
    {
        [Number(NumberType.Double, Name = "lat")]
        public double lat { get; set; }
        [Number(NumberType.Double, Name = "lon")]
        public double lon { get; set; }
    }
}
