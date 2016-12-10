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
            ImportShelters();
            ImportOtherResources();
        }


        private static void ImportShelters()
        {

            var client = new SearchClient();

            string fileData = System.IO.File.ReadAllText(@"C:\inetpub\domains\Help SGF\Information and Resources\Data\Hack4GoodSGF\real direcoty.json");

            IList<ShelterRecordWithTags> resources = JsonConvert.DeserializeObject<IList<ShelterRecordWithTags>>(fileData);
            foreach (var resource in resources)
            {
                resource.Resource.Location = new GeoPoint();
                resource.Resource.Location.lat = resource.Resource.Latitude;
                resource.Resource.Location.lon = resource.Resource.Longitude;
                resource.Resource.Restriction = resource.Tags;


            }

            var pages = (resources.Count / 250) + (resources.Count % 250 > 0 ? 1 : 0);

            for (int i = 0; i < pages; i++)
            {

                IList<Resource> docsToIndex = new List<Resource>();
                foreach (var asset in resources.Skip(250 * i).Take(250).ToList())
                {
                    var docToIndex = asset.Resource;
                    docsToIndex.Add(docToIndex);
                }


                Interlocked.Exchange(ref NumSent, 0);
                var tasks = new List<Task>();


                var t = client.Server.IndexManyAsync<Resource>(docsToIndex, client.ES_REPO)
                   .ContinueWith(tt =>
                   {
                       Interlocked.Add(ref NumSent, 1024);
                   });
                tasks.Add(t);
                Task.WaitAll(tasks.ToArray());
            }
        }

        private static void ImportOtherResources() {

            var client = new SearchClient();

            string fileData = System.IO.File.ReadAllText(@"C:\inetpub\domains\Help SGF\Information and Resources\Data\wifi_hotspots.json");

            IList<OtherResource> resources = JsonConvert.DeserializeObject<IList<OtherResource>>(fileData);
            foreach (var resource in resources)
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




    public class ShelterRecordWithTags {
        public Resource Resource { get; set; }
        public IList<string> Tags { get; set; }
    }



    [ElasticsearchType(Name="shelter")]
    public class Resource
    {
        [String(Name = "id")]
        public string ID { get; set; }
        [String(Name = "name")]
        public string Name { get; set; }
        [String(Name = "address1")]
        public string Address1 { get; set; }
        [String(Name = "address2")]
        public string Address2 { get; set; }
        [String(Name = "city")]
        public string City { get; set; }
        [String(Name = "state")]
        public string State { get; set; }
        [String(Name = "zip")]
        public string Zip { get; set; }
        [String(Name = "county")]
        public string County { get; set; }
        [String(Name = "phone")]
        public string Phone { get; set; }
        [String(Name = "fax")]
        public string Fax { get; set; }
        [String(Name = "tty")]
        public string TTY { get; set; }
        [String(Name = "tollfree")]
        public string Tollfree { get; set; }
        [String(Name = "hotline")]
        public string Hotline { get; set; }
        [String(Name = "email")]
        public string Email { get; set; }
        [String(Name = "webpage")]
        public string Webpage { get; set; }
        [String(Name = "facebookname")]
        public string FacebookName { get; set; }
        [String(Name = "facebookurl")]
        public string FacebookUrl { get; set; }
        [String(Name = "twitter")]
        public string Twitter { get; set; }
        [String(Name = "services")]
        public string Services { get; set; }
        [Number(NumberType.Double, Name = "lat")]
        public double Latitude { get; set; }
        [Number(NumberType.Double, Name = "lon")]
        public double Longitude { get; set; }
        [GeoPoint(Name = "location")]
        public GeoPoint Location { get; set; }
        [String(Name = "restriction")]
        public IList<string> Restriction { get; set; }

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
