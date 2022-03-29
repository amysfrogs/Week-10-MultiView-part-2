function scatter_plot_aw (x, 
                        y, 
                        markersize, 
                        ColorData,
                        axis_key,
                        title = '', 
                        xLabel = '',
                        yLabel = '',
                        margin = 100)
{
    function data_axis_pad(data, pad = 0.05) {
        return [data[0] - pad * data[0], data[1] + pad * data[1]]
    }

    let xScale = d3.scaleLinear()
        .domain(data_axis_pad(d3.extent(x)))
        .range([0 + margin, 1000 - margin])
    let yScale = d3.scaleLinear()
        .domain(data_axis_pad(d3.extent(y)))
        .range([1000 - margin, 0 + margin])
    let colorScale = d3.scaleLinear()
        .domain(d3.extent(ColorData))
        .range(['steelblue', 'brown'])
    let radiusScale = d3.scaleSqrt()
        .domain(d3.extent(markersize))
        .range([10, 30])
    let axis = d3.select(`#${axis_key}`)

    axis.selectAll('.markers')
        .data(x)
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
            return `translate(${xScale(x[i])}, ${yScale(y[i])})`})
        .append('circle')
        .attr('r', function (d, i) {
            return radiusScale(markersize[i])})
        .style('fill', function (d, i) {
            return colorScale(ColorData[i])})
        .style('opacity', 0.7)
    //x and y axis function
    let xAxis = d3.axisBottom(xScale).ticks(4)
    let yAxis = d3.axisLeft(yScale).ticks(4)
    //add x axis
    axis.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${0}, ${1000 - margin})`)
        .call(xAxis)
    //add y axis
    axis.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${margin}, ${0})`)
        .call(yAxis)
    //labels for axes
    axis.append('g')
        .attr('transform', `translate(${500}, ${1000 - 10})`)
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .text(xLabel)
    axis.append('g')
        .attr('transform', `translate(${35}, ${500}) rotate(270)`)
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .text(yLabel)
    //Title
    axis.append('text')
        .attr('x', 500)
        .attr('y', 80)
        .attr('text-anchor', 'middle')
        .text(title)
        .attr('class', 'plotTitle')
    //Legend
    //let legend = d3.select('#legend')
    axis.append('circle')
        .attr('cx', 800)
        .attr('cy', 50)
        .attr('r', 10)
        .style('fill', colorScale(0))
        .style('opacity', 0.7)
    axis.append('circle')
        .attr('cx', 800)
        .attr('cy', 80)
        .attr('r', 10)
        .style('fill', colorScale(1))
        .style('opacity', 0.7)
    axis.append('circle')
        .attr('cx', 800)
        .attr('cy', 110)
        .attr('r', 10)
        .style('fill', colorScale(2))
        .style('opacity', 0.7)
    axis.append('text')
        .attr('x', 820)
        .attr('y', 50)
        .text('Torgersen')
        .style('font-size', '20px')
        .style('font-family', 'sans-serif')
        .attr('alignment-baseline', 'middle')
    axis.append('text')
        .attr('x', 820)
        .attr('y', 80)
        .text('Biscoe')
        .style('font-size', '20px')
        .style('font-family', 'sans-serif')
        .attr('alignment-baseline', 'middle')
    axis.append('text')
        .attr('x', 820)
        .attr('y', 110)
        .text('Dream')
        .style('font-size', '20px')
        .style('font-family', 'sans-serif')
        .attr('alignment-baseline', 'middle')  
    axis.append('text')
        .attr('x', 820)
        .attr('y', 25)
        .text('Island')
        .style('font-size', '24px')
        .style('font-family', 'sans-serif')
        .style('text-decoration', 'underline')
        .attr('alignment-baseline', 'middle') 
        
    

}