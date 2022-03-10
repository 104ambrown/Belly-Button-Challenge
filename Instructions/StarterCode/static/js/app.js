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
        var washFrequency = data.metadata.filter(wfreq => wfreq.id.toString() === bbData)[0];
        wfreq = wfreq.washFrequency;
        console.log("Washing frequency: " + washFrequency);
        // filter samples by id
        var samples = data.samples.filter(sample => sample.id.toString() === bbData)[0];
        // top ten samples
        var topTen = (samples.sample_values.slice(0, 10)).reverse();
        console.log("Top Ten Bacteria samples found: " + topTen);
        // top ten otu ids
        var topTenOTUs = (samples.otu_ids.slice(0, 10)).reverse();
        var otuId = otu.map(number => "OTU " + number)
        console.log("OTU IDs: " + otuID);
        // declaring label variable
        var labels = samples.otu_labels.slice(0, 10).revers();
        console.log("labels: " + labels);


        // declaring bar chart variable
        var chartOfBars = {x: samples, y: otuID, text: labels, type="bar", orientation: "h",};
        // declaring variable for bar chart data
        var chartOfBarsData = [chartOfBars];
        // generating bar chart
        Plotly.newPlot("bar". chartOfBarsData);


        // declaring bubble chart variable
        var chartOfBubbles = {x: sample.otu_ids, y: sample.samples, mode: "markers", marker: {size: sample.samples, color: sample.otuIDs}, tesxt: samples.otu_labels};
        // declaring variable for the bubble chart layout
        var chartOfBubblesLayout + {xaxis:{title: "OTU ID"}, height:600, width: 1200};
        // declaring variable for bubblechart data
        var chartOfBubblesData = [chartOfBubbles];
        // generating bubble chart
        Plotly.newPlot("bubble", chartOfBubblesData, chartOfBubblesLayout)
    }};
};