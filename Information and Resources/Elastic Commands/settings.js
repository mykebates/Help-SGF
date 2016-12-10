{
	"settings": {
		"index": {
			"analysis": {
				"filter": {
					"custom_synonym_filter": {
						"type": "synonym",
						"synonyms_path": "analysis/hack4good.txt"
					},
					"custom_snowball_filter": {
						"type": "snowball",
						"language": "English"
					}
				},
				"analyzer": {
					"custom_analyzer": {
						"filter": ["lowercase", "custom_synonym_filter", "custom_snowball_filter"],
						"type": "custom",
						"tokenizer": "standard"
					}
				}
			},
			"number_of_shards": "5",
			"number_of_replicas": "2"
		}
	}
}