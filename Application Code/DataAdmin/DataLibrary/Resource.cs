namespace DataLibrary
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Resource
    {
        [StringLength(50)]
        public string ID { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        public string Address1 { get; set; }

        [StringLength(255)]
        public string Address2 { get; set; }

        [StringLength(255)]
        public string city { get; set; }

        [StringLength(255)]
        public string State { get; set; }

        [StringLength(255)]
        public string Zip { get; set; }

        [StringLength(255)]
        public string County { get; set; }

        [StringLength(255)]
        public string Phone { get; set; }

        [StringLength(255)]
        public string Fax { get; set; }

        [StringLength(255)]
        public string TTY { get; set; }

        [StringLength(255)]
        public string Tollfree { get; set; }

        [StringLength(255)]
        public string Hotline { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Webpage { get; set; }

        [StringLength(255)]
        public string FacebookName { get; set; }

        [StringLength(255)]
        public string FacebookUrl { get; set; }

        [StringLength(255)]
        public string Twitter { get; set; }

        public string Services { get; set; }

        [StringLength(255)]
        public string Latitude { get; set; }

        [StringLength(255)]
        public string Longitude { get; set; }

        [StringLength(255)]
        public string Accuracy { get; set; }

        [StringLength(255)]
        public string Score { get; set; }

        [StringLength(255)]
        public string AccuracyType { get; set; }
    }
}
