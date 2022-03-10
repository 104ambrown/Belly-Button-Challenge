// Plotly Belly Button Biodiversity Homework
// Writing a function to pull the data in
function getData(bbInfo){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        //console.log(metadata);

        
        // Filtering belly button data by sample_values and ID
        var resultsArray = metadata.filter(info => info.id.toString() == bbInfo);
        var results = resultsArray[0]
        var survey = d3.select("#bbInfo-metadata");
        survey.html("");
        Object.entries(resultsArray).forEach((key, value) => {
            survey.append("h6").text(`${key}: ${value}`);
        });
    })
}

