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
                resource.geo_point = new GeoPoint();
                resource.geo_point.lat = resource.lat;
                resource.geo_point.lon = resource.lon;

            }

            var pages = (resources.Count / 250) + (resources.Count % 250 > 0 ? 1 : 0);

            for (int i = 0; i < pages; i++)
            {

                IList<OtherResource> docsToIndex = new List<OtherResource>();
                foreach (var asset in resources.Skip(250 * i).Take(250).ToList())
                {
                    var docToIndex = new OtherResource();
                    docToIndex.name = asset.name;
                    docToIndex.lat = asset.lat;
                    docToIndex.lon = asset.lon;
                    docToIndex.geo_point = asset.geo_point;

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

    [ElasticsearchType(Name = "other_resource")]
    public class OtherResource
    {
        public string name { get; set; }
        public float lat { get; set; }
        public float lon { get; set; }
        public GeoPoint geo_point { get; set; }

    }

    public class GeoPoint
    {
        public float lat { get; set; }
        public float lon { get; set; }
    }
}
