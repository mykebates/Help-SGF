{
    "properties": {
	    "id":					{ "type":"string", 	"index":"not_analyzed"},
		"name":				{ "type": "string", "analyzer":"custom_analyzer" },
		"resource_type":  	{ "type": "string" },
        "geo_point":		{ "type": "geo_point" }
    }
}