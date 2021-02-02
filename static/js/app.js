function getPlots(id) {
    // read samples data using D3
    d3.json("samples.json").then(sampleData =>{

        // console.log 
        console.log(sampleData)

        // assign variables
        var samIds = sampleData.samples[0].otu_ids;
        var samValues = sampleData.samples[0].sample_values.slice(0,10).reverse();
        var samLabels = sampleData.samples[0].otu_labels.slice(0,10);
        var labels = sampleData.samples[0].otu_labels.slice(0,10);

        // determine top 10 otu ids for plots
        var samTen =(sampleData.samples[0].otu_ids.slice(0,10)).reverse();
        var samTenIds = samTen.map(x => "OTU" + x);

        // console.log
        console.log(`OTU Ids: ${samTenIds}`);
        console.log(`Otu_lablels: ${labels}`);

        // create trace for chart
        var trace1 ={
            x: samValues,
            y: samTenIds,
            text: labels,
            marker: {
                color: 'green'},
            type: "bar",
            orientation: "h",
            };

        // assign variable
        var barData = [trace1];

        // set up bar chart
        var barLayout = {
            title: " Top 10 Cultures (OTUs)",
            yaxis: {
                tickmode:"linear",
            },
            margin: {
                l:50,
                r:50,
                t:50,
                b:15
            }
        };

        // render horizontal bar plot
        Plotly.newPlot("bar", barData, barLayout);

        // create trace for bubble chart
        var trace2 ={
            x: sampleData.samples[0].otu_ids,
            y: sampleData.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampleData.samples[0].sample_values,
                color: sampleData.samples[0].otu_ids,
            },
            text: sampleData.samples[0].otu_labels
        };

        // assign variable
        var bubbleData = [trace2]

        // set up bubble chart
        var bubbleLayout = {
            xaxis:{title: "Culture Id"}
        };

        // render bubble chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

function getSampleInfo(id) {
    // read json file with D3
    d3.json("samples.json").then((data) => {
        
        // assign variable
        var metaData = data.metadata;

        // filter by id
        var metaDataFiltered = metaData.filter(meta => meta.id.toString() === id)[0];

        // select sample metadata with D3
        var selectData = d3.select("#sample-metadata");

        // empty info
        selectData.html("");

        // append data
        Object.entries(metaDataFiltered).forEach((key) => {
            selectData.append("h6").text(key[0].toUpperCase() + ": " + "\n");
        });
    });
}

function optionChanged(id) {

    // call functions to render data and charts
    getPlots(id);
    getSampleInfo(id);
}

function init() {

    // select Dataset with D3
    var selectDataset = d3.select("#selDataset");

    // read json file with D3
    d3.json("samples.json").then((data) => {
    
        // append id to dropdown menu
        data.names.forEach(function(name) {
            selectDataset.append("option").text(name).property("value");
        });

        // call functions to render data and charts
        getPlots(data.names[0]);
        getSampleInfo(data.names[0]);
    });
}

// initialize dashboard
init();
