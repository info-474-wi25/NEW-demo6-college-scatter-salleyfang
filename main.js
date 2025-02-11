// 1: CREATE BLANK SVG
// Set dimensions and margins for the scatter plot
const margin = { top: 50, right: 30, bottom: 60, left: 100 },
      width = 800 - margin.left - margin.right, // Actual chart width
      height = 600 - margin.top - margin.bottom; // Actual chart height

// Create the SVG container, setting the full width and height including margins
const svgScatter = d3.select("#scatterPlot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)  // Total width with margins
    .attr("height", height + margin.top + margin.bottom)  // Total height with margins
    .append("g") // Append a `g` element to position the chart content correctly within the SVG
    .attr("transform", `translate(${margin.left},${margin.top})`);  // Offset by the top and left margins

// 2: LOAD...
d3.csv("colleges.csv").then(data => {
    // 2: ... AND REFORMAT DATA
    data.forEach(d => {
        // plus sign turns string into number
        d["earnings"] = +d["Median Earnings 8 years After Entry"];
        d["debt"] = +d["Median Debt on Graduation"];
    })

    console.log(data);
    // console.log(
    //     "Data type of 'earnings':",
    //     typeof data[0]["earnings"] // number
    // )

    // 3: SET AXES SCALES
    let xScatter = d3.scaleLinear() // x var is earnings
        .domain([0, d3.max(data, d => d.earnings)])
        .range([0, width]);

    let yScatter = d3.scaleLinear() // y var is debt
        .domain([0, d3.max(data, d => d.debt)])
        .range([height, 0]); // THINK BACKWARDS FOR Y - start high, decrease after

    // 4: PLOT POINTS
    svgScatter.attr("class", "scatter") // CLASS MUST BE AT TOP OF CHAIN!!
        .selectAll("circle")
        .data(data)
        .enter() // enter all points NOT labeled circle
        .append("circle")
        .attr("cx", d => xScatter(d.earnings))
        .attr("cy", d => yScatter(d.debt))
        .attr("r", 5);

    // 5: AXES
    // Add x-axis
    svgScatter.append("g") // <g> groups SVG shapes together
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScatter));
    
    // Add y-axis
    svgScatter.append("g")
        .call(d3.axisLeft(yScatter));

    // 6: ADD LABELS
    // Add title
    svgScatter.append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .text("Median Earnings 8 Years After Entry vs. Median Debt Upon Graduation");
    
    // Add x-axis label
    svgScatter.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle") // center text
        .attr("x", width / 2) // center horizontally on chart
        .attr("y", height + margin.bottom - 5) // position below x-axis
        .text("Median Earnings ($)");
    
    // Add y-axis label
    svgScatter.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)") // rotate text for vertical alignment
        .attr("y", (-margin.left / 2) - 5) // position slightly away from axis
        .attr("x", -height / 2) // center vertically
        .text("Median Debt ($)"); 
    

    // [optional challenge] 7: ADD TOOL-TIP
    // Follow directions on this slide: https://docs.google.com/presentation/d/1pmG7dC4dLz-zfiQmvBOFnm5BC1mf4NpG/edit#slide=id.g32f77c1eff2_0_159
    //Your code...
});
