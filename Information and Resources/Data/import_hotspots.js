var ElasticsearchCSV = require('elasticsearch-csv');
 
// create an instance of the importer with options 
var esCSV = new ElasticsearchCSV({
    es: { index: 'hack4goodsgf', type: 'other_resources', host: 'localhost:9200' },
    csv: { filePath: 'wifi hot spots - Copy.csv', headers: true }
});
 
esCSV.import()
    .then(function (response) {
        // Elasticsearch response for the bulk insert 
        console.log(response);
    }, function (err) {
        // throw error 
        throw err;
    });