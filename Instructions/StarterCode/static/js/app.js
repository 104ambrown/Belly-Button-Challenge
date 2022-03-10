// Plotly Belly Button Biodiversity Homework
// Writing a function to pull the data in
function getData(bbData){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        //console.log(metadata);

        
        // Filtering belly button data by sample_values and ID
        var resultsArray = metadata.filter(info => info.id.toString() == bbData);
        var results = resultsArray[0]
        var panel = d3.select("#bbInfo-metadata");
        // Clearing existing metadata
        panel.html("");
        // Adding eac hkey value pair to panel
        Object.entries(resultsArray).forEach((key, value) => {
            panel.append("p").text(`${key}: ${value}`);
        });
    });
};

// basic function of pulling data in for the plots
function plotThis(bbData) {
    d3.json("samples.json").then((data)=> {
        //console.log(data);

        // Using ID to filter wash frequency
        var washFrequency = data.metadata.filter(wf.id.toString() === bbData)[0];
        washFrequency = washFrequency.washFrequency;
        //console.log("Washing frequency: " + wasFrequency);
}


// Washing Frequency gauge
function washFreqGauge(bbData) {
    d3.json("samples.json").then((data)=> {
        var objects = data.metadata;
        var gaugeArray = metadata.filter(info => info.id.toString() == bbInfo);
        var gaugeResults = gaugeArray[0]
        var survey = d3.select("#bbInfo-metadata");
        survey.html("");
        Object.entries(gaugeArray).forEach((key, value) => {
            survey.append("h6").text(`${key}: ${value}`);
        });
}
    });
}
