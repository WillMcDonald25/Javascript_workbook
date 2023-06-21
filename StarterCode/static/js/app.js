//saving the base url as a constant variable
const baseurl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


//reading in the data from the base url
d3.json(baseurl).then(function(data) {
    console.log(data);
});


function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(baseurl).then((data) => {
        let names = data.names;
    names.forEach((name) => {
        dropdownMenu.append("option").text(name).property("value", name);

    });

    let sample = names[0];
    console.log(sample);

    dropdownMenu.on("change", function () {
        let selectedValue = d3.select(this).property("value");
        diffID(selectedValue);
    });

    chart1(sample);
    chart2(sample);
    chart3(sample);
    });
};

function chart1(idsample) {
    d3.json(baseurl).then((data) => {
        let idsampleinfo = data.metadata;
        let value = idsampleinfo.filter(result=> result.id == idsample);
        let valuedata = value[0];
        d3.select("#sample-metadata").html("");
        Object.entries(valuedata).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

function chart2(idsample) {
    d3.json(baseurl).then((data) => {
        let idsampleinfo = data.samples;
        let value = idsampleinfo.filter(result=> result.id == idsample);
        let data1 = value[0];
        let sample_values = data1.sample_values;
        let otu_ids= data1.otu_ids;
        let otu_labels = data1.otu_labels;
        console.log(otu_ids, otu_labels, sample_values);

        let xticks = sample_values.slice(0,10);
        let yticks = otu_ids.slice(0,10);
        let labels = otu_labels.slice(0,10);

        let bartrace = {
            x: xticks,
            y: yticks,
            text: labels,
            type:"bar"
        };

        let layout = {
            title: "OTU bar graph"
        };

        Plotly.newPlot("bar", [bartrace], layout);
    });
};

function chart3(idsample) {
    d3.json(baseurl).then((data) => {
        let idsampleinfo = data.samples;
        let value = idsampleinfo.filter(result=> result.id == idsample);
        let data1 = value[0];
        let sample_values = data1.sample_values;
        let otu_ids= data1.otu_ids;
        let otu_labels = data1.otu_labels;
        
        console.log(otu_ids, otu_labels, sample_values);

       let bubbletrace = {
        x: otu_ids,
        y:sample_values,
        text: otu_labels,
        mode:"markers",
        marker: {
            size:sample_values,
            color:otu_ids,
            colorscale: "Sunset"
        }
       }; 

       let layout = {
        xaxis: {ittle: "OTU ID"}
       };

       Plotly.newPlot("bubble", [bubbletrace], layout)
    });
};

function diffID(value) {
    console.log(value);
    chart1(value);
    chart2(value);
    chart3(value);
};
init();







