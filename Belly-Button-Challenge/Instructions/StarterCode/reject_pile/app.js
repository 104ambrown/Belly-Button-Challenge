// Plotly Belly Button Biodiversity Homework
// Writing a skeleton function to pull the data in
function getData(sample){
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        //console.log(metadata);
        // Filtering belly button data by sample_values and ID
        var resultsArray = metadata.filter(sampleObject => 
            sampleObject.id == sample);
        var panel = d3.select("#sample-metadata");
        // Clearing existing metadata
        panel.html("");
        // Adding each key value pair to panel
        Object.entries(resultsArray).forEach(([key, value]) => {
            panel.append("h5").text(key[0]: value[1]);
        });
    });

// Writing a function to build the bar and bubble charts using d3.json to retrieve the somple data
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        // console.log(data)
        var washFreq = data.metadat.filter((wf => wf.id.toString() === sample[0]))

        var samples= data.samples;
        var resultsArray = samples.filter(sampleObject => 
        sampleObject.id == sample);
        var result = resultsArray[0]
        var id = result.otu_ids;
        var labels = result.otu_labels;
        var values = result.sample_values;

// selecting bar and bubble chart data//
    var bubbleData = [
        {
            x: id,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
            color: id,
            size: values,
        }
    }]
    var bubbleLayout = {
        margin: {t: 0 },
        xaxis: {title: "OTU ID" },
        hovermode: "closest",
        };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    var barData = [
        {
            y:id.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
            x:values.slice(0,10).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
    ];
    var barLayout = {
        title: "10 most popular Bacteria Cultures",
        margin: { t:30, l:150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
})
}
// Building a bubble chart //
    


// Function to build the gauge chart
// used https://htmlcolorcodes.com/color-picker/        
var arrgaugeColorPallette = ["#fffff", "#b0ffb5", "#7Aff82","#4FEE58", "#4FEEA8", "#4FE5EE", "#4F95EE", "#584FEE", "#A84FEE"]

function constrGaugeChrt(sample) {
    console.log("sample", sample);
    d3.json("samples.json").then(data => {
        var objects = data.metadata;
        //console.log("objects", objects);
        var matchSampleObject = objects.filter(sampleData =>
            sampleData["id"] === parseInt(sample));
            //console.log("constrGaugeChrt matchSampleObject", matchSampleObject);
        buildAGauge(matchSampleObject[0]);
    });
}
function buildAGauge(data) {
    console.log("buildAGauge", data);
    if(data.wfreq === null){
        data.wfreq = 0;
    }
    let degree = parseInt(data.wfreq) * (180/10);
    // Calculating meter point
    let degrees = 180 - degree;
    let radius = .5;
    let radians = degrees * Math.PI / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);

    let mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        xPath = String(x),
        space = " ",
        yPath = String(y),
        pathEnd = " Z";
    let path = mainPath.concat(xPath, space, yPath, pathEnd);

    let trace = [{ type: "scatter",
        x:[0], 
        y:[0],
            marker: {size: 50, color: "#923DE9"},
            showlegend: false,
            name: "Wash Frequency",
            text: data.wfreq,
            hoverinfo: "text+name"},
        { values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        rotation: 90,
        text:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textInfo: "text",
        textPosition: "inside",
        textFont:{
            size: 14,
            },
        marker: {colors:[...gaugeColorPallette]},
        labels:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverInfo: "text",
        hole: .5,
        type: "pie",
        showlegend: false
    }];
    let layout = {
        shapes:[{
            type: "path",
            path: path,
            fillColor: "#923DE9",
            line: {
                color: "#923DE9"
            }
        }],

    title: "<b>Belly Button Washing Frequency</b> <br> <b>Scrubs per Week</b>",
    height: 500,
    width: 500,
    x_axis: {zeroline:false, showTickLabels:false,
                showgrid:false, range:[-1, 1]},
    y_axis: {zeroline:false, showTickLabels:false,
                showgrid:false, range:[-1, 1]},
    };
    
    Plotly.newPlot("gauge", trace, layout, {responsive: true});
}

// basic function of pulling data in for the dropdown menu
function init() {
var selector = d3.select("#selDataset");
d3.json("samples.json").then((data)=> {
    var id = data.names;
    id.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
    const firstSample = id[0];
    getData(firstSample);
    buildCharts(firstSample);
    buildAGauge(firstSample)
    });
    }

function optionChange(newSample) {
getData(newSample);
buildCharts(newSample);
buildAGauge(newSample);
}

// Initializing the dashboard
init();