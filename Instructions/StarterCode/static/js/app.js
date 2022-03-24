// Plotly Belly Button Biodiversity Homework
// Writing a skeleton function to pull the data in
function getData(sample){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        //console.log(metadata);
        // Filtering belly button data by sample_values and ID
        var resultsArray = metadata.filter(info => info.id == sample);
        var result = resultsArray[0]
        var panel = d3.select("#sample-metadata");
        // Clearing existing metadata
        panel.html("");
        // Adding each key value pair to panel
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
};

// Writing a function to build the  bar and bubble charts using d3.json to retrieve the somple data
function buildCharts(sample) {
d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultsArray = metadata.filter(info => info.id == sample);
    var result = resultsArray[0]
    var ids = result.otu_labels;
    var values = result.sample_values;

// building a bar chart //
    var barData = [
        {
            y:ids.slice(0,10).map(otu => `OTU ${otuID}`).reverse(),
            x:values.slice(0,10).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
    ];
    var barLayout = {
        title: "10 most popular Bacteria Cultures",
        margin: { t:30, 1:150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
});
}
// Building a bubble chart //
var bubbleLayout = {
    margin: {t: 0 },
    xaxis: {title: "OTU ID" },
    hovermode: "closest",
    };
var bubbleData = [
{
    x: ids,
    y: values,
    text: labels,
    mode: "markers",
    marker: {
        color: ids,
        size: values,
        }
    }
];
Plotly.newPlot("bubble", bubbleData, bubbleLayout);

// Function to build the gauge chart
// used https://htmlcolorcodes.com/color-picker/        
var gaugeColorPallette = ["#fffff", "#B0FFB5", "#7Aff82","#4FEE58", "#4FEEA8", "#4FE5EE", "#4F95EE", "#584FEE", "#A84FEE"


function buildAGauge(data {
    console.log("buildAGauge", data);
    if(data.wfreq === null){
        data.wfreq = 0;
    }
    let degree = parseInt(data.wfreq) * (180/10);
    // Calculating meter points
    let degrees = 180 - degree;
    let radius = .5;
    let radians = degrees * Math.PI / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        xPath = String(x),
        space = ' ',
        yPAth = String(y),
        pathEnd = ' Z';
    let path = mainPath.concat(xPath, space, yPath, pathEnd);
    let trace = [{ type: "scatter",
        x:[0], y:[0],
        marker: {size: 50, color: "923DE9"},
        showlegend: false,
        name: "Wash Frequency",
        text: data.wfreq,
        hoverinfo: "text+name"},
        {values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textInfo: "text",
        textPosition: "inside",
        textFont:{
            size: 14,},
        marker: {colors:[...gaugeColorPallette]},
        labels:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverInfo: "text",
        hole: .5,
        type: "pie",
        showlegend: false
}];

// basic function of pulling data in for the dropdown menu
function initialize() {
var selection = d3.select("#selDataset");
    d3.json("samples.json").then((data)=> {
        var sampleIDs = data.names;
        sampleIDs.forEach((sample) => {
            selection
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        const firstSample = sampleIDs[0];
        getData(firstSample);
        buildCharts(firstSample);
        build

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
        var chartOfBars = {x: samples, y: otuID, text: labels, type:"bar", orientation: "h",};
        // declaring variable for bar chart data
        var chartOfBarsData = [chartOfBars];
        // generating bar chart
        Plotly.newPlot("bar". chartOfBarsData);


        // declaring bubble chart variable
        var chartOfBubbles = {x: sample.otu_ids, y: sample.samples, mode: "markers", marker: {size: sample.samples, color: sample.otuIDs}, tesxt: samples.otu_labels};
        // declaring variable for the bubble chart layout
        var chartOfBubblesLayout = {xaxis:{title: "OTU ID"}, height:600, width: 1200};
        // declaring variable for bubblechart data
        var chartOfBubblesData = [chartOfBubbles];
        // generating bubble chart
        Plotly.newPlot("bubble", chartOfBubblesData, chartOfBubblesLayout);

// writing a function to initialize all of the above code
function initialize() {
    d3.json("samples.json").then((data) => {
        // populating dropdown with names
        data.names.forEach((name) => {
            d3.select("#selDataset").append("option").text(name).proprty("value");
        });
        plotThis(data.names[0]);
        demographic(data.names[0]);
    });
};
initialize();

// writing a function when an event occurs
function eventChange(bbData){
    plotThis(bbData);
    demographic(bbData);
}})};
