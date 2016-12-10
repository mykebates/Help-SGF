{
    "properties": {
		"name":			{ "type": "string", "analyzer":"custom_analyzer" },
		"resource_id":  { "type": "string" },
		"address1":		{ "type": "string", "analyzer":"custom_analyzer"  },
		"address2":		{ "type": "string", "analyzer":"custom_analyzer"  },
		"city":			{ "type": "string", "analyzer":"custom_analyzer"  },
		"state":		{ "type": "string", "analyzer":"custom_analyzer"  },
		"zip":			{ "type": "string", "analyzer":"custom_analyzer"  },
		"county":		{ "type": "string", "analyzer":"custom_analyzer"  },
		"phone":		{ "type": "string" },
		"fax":			{ "type": "string" },
		"tty":			{ "type": "string" },
		"tollfree":		{ "type": "string" },
		"hotline":		{ "type": "string" },
		"email":		{ "type": "string" },
		"webpage":		{ "type": "string" },
		"facebookname":	{ "type": "string" },
		"facebookurl":	{ "type": "string" },
		"twitter":		{ "type": "string" },
		"services":  	{ "type": "string", "analyzer":"custom_analyzer" },
        "location":		{"type": "geo_point"},
        "restriction":  {"type": "string" }
    }
}