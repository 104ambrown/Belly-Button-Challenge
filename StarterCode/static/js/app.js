console.log("beginning");
// Plotly Belly Button Biodiversity Homework
// writing a function to initialize all of the above code
function init() {
    d3.json("StarterCode/data/samples.json").then((data) => {
        // populating dropdown with names
        data.names.forEach((name) => {
            d3.select("#selDataset").append("optionChanged").text(name).property("value");
        });
        plotThis(data.names[0]);
        getData(data.names[0]);
    });
console.log("init")
// Writing a function to pull the data in
function getData(bbData){
    d3.json("StarterCode/data/samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata);

        // Filtering belly button data by sample_values and ID
        var resultsArray = metadata.filter(info => info.id.toString() == bbData);
        console.log(resultsArray);
        //var results = resultsArray[0]
        var panel = d3.select("#bbInfo-metadata");
        console.log(panel);
        // Clearing existing metadata
        panel.html("");
        // Adding each key value pair to panel
        Object.entries(resultsArray).forEach((key, value) => {
            panel.append("h5").text(`${key}: ${value}`);
        });
    });
};
console.log("getData");

// basic function of pulling data in for the plots
function plotThis(bbData) {{
    d3.json("StarterCode/data/samples.json").then((bbData) => {
        console.log(bbData);
        // Using ID to filter wash frequency
        var washFrequency = data.metadata.filter(wfreq => wfreq.id.toString() === bbData)[0];
        washFrequency = washFrequency.wfreq;
        console.log("Washing frequency: " + washFrequency);
        // filter samples by id
        var samples = data.samples.filter(sample => sample.id.toString() === bbData)[0];
        console.log(samples);
        // top ten samples
        var topTen = (samples.sample_values.slice(0, 10)).reverse();
        console.log("Top Ten Bacteria samples found: " + topTen);
        // top ten otu ids
        var topTenOTUs = (samples.otu_ids.slice(0, 10)).reverse();
        console.log(topTenOTUs);
        var otuId = topTenOTUs.map(number => "OTU " + number)
        console.log("OTU IDs: " + otuId);
        // declaring label variable
        var labels = samples.otu_labels.slice(0, 10).reverse();
        console.log("labels: " + labels)


        // declaring bar chart variable
        var chartOfBars = {
            x: samples,
            y: otuId,
            text: labels,
            type: "bar",
            orientation: "h",
        };
        console.log(chartOfBars);
        // declaring variable for bar chart data
        var barChartData = [chartOfBars];
        console.log(barChartData);
        // generating bar chart
        Plotly.newPlot("bar", barChartData);
        // declaring bubble chart variable
        var chartOfBubbles = {
            x: samples.otu_ids,
            y: samples.samples,
            mode: "markers",
            marker: {
                size: samples.topTen,
                color: samples.otuIDs},
            text: samples.otu_labels
        };
        console.log(chartOfBubbles);
        // declaring variable for the bubble chart layout
        var chartOfBubblesLayout = {
            xaxis:{title: "OTU ID"},
            height:600,
            width: 1200
        };
        console.log(chartOfBubblesLayout);
        // declaring variable for bubblechart data
        var bubbleChartData = [chartOfBubbles];
        console.log(bubbleChartData);
        // generating bubble chart
        Plotly.newPlot("bubble", bubbleChartData, chartOfBubblesLayout);
    })};
}};
    console.log("plotThis");
;