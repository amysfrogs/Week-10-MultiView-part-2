function bar_plot_aw(Values,
                    bins_count,
                    axis_key,
                    title = '',
                    xLabel = '',
                    yLabel = '',
                    margin = 50
)
{
    let axis = d3.select(`#${axis_key}`)
    let height = parseInt(axis.attr('height'));
    let width = parseInt(axis.attr('width'))-margin;

    let valMax = d3.max(Values)

    //make linear scale for xAxis
    let xScale = d3.scaleLinear()
        .domain(d3.extent(Values))
        .range([margin, width]);
    //make bins and the values for each bin
    let histogram = d3.histogram()
        .domain(xScale.domain())
        .value(function(d) {return d})
        .thresholds(bins_count);

    let bins = histogram(Values);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) {return d.length;})])
        .range([height, 0]);

    
    //pass the bins and plot them
    axis.selectAll('.bars')
        .data(bins)
        .enter()
        .append('g')
        .attr('class', 'bars')
        .attr('transform', function (d) {
            return `translate(${xScale(d.x1)}, ${yScale(d.length)})`;})
        .append('rect')
        .attr('width', function (d) {
            return ((width-margin)/(bins_count)*0.6);})
        .attr('height', function (d) {
            return height - yScale(d.length);})
        .style('fill', '#509ec8')
}

function h_bar_plot_aw(Values,
                        bins_count,
                        axis_key,
                        title = '',
                        xLabel = '',
                        yLabel = '',
                        margin = 80
)
{
    let axis = d3.select(`#${axis_key}`)
    let height = parseInt(axis.attr('height'))-margin;
    let width = parseInt(axis.attr('width'));

    let yScale = d3.scaleLinear()
        .domain(d3.extent(Values))
        .range([height, margin])

    let histogram = d3.histogram()
        .value(function (d) {return d})
        .domain(yScale.domain())
        .thresholds(bins_count);

    let bins = histogram(Values);

    let xScale = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) {return d.length})])
        .range([0, width])

    axis.selectAll('.bars')
        .data(bins)
        .enter()
        .append('g')
        .attr('class', 'bars')
        .attr('transform', function (d, i) {
            return `translate(${0}, ${yScale(d.x1)})`;})
        .append('rect')
        .attr('width', function (d) {
            return xScale(d.length);})
        .attr('height', function(d) {return ((height - margin)/bins_count)*0.6})
        .style('fill', '#509ec8')
}