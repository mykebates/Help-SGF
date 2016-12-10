using System;
using System.Collections.Generic;
using System.Linq;

using Hack4GoodSGF.data;
using System.Data;
using System.Data.Entity;

namespace Hack4GoodSGF.main
{
    public class DataService : IDisposable
    {
        protected Hack4GoodSGFEntities db;

        public DataService()
        {
            db = new Hack4GoodSGFEntities();
        }

        public IList<Resource> GetResources()
        {
            return db.Resources.ToList();
        }

        public IList<Tag> GetTags()
        {
            return db.Tags.ToList();
        }

        public void SaveResource(Resource item)
        {
            db.Resources.Attach(item);
            
            db.SaveChanges();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
