d3.select('body')
  // .append('svg').attr('width', 400).attr('height', 400).attr('id', 'chart')

let sel = d3.select('#chart').append('g').attr('transform', 'translate(50, 30)')
let yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([100, 0])

  // <svg id="chart" width=400 height=400>
d3.csv("./data.csv").then( (forage) => {
    console.log(forage)
    /* let xScale = d3.scaleBand()
        .domain(forage.map(d => d.kind)) // in coordinates of the data
        .range([10, 10 + forage.length*20]) // in pixels
        .round(true) */

    let legend = {'water': '#333399', 'brush': '#aa6633'}
    // display a color legend (-> html?)
    /* sel.selectAll('text') // grabs the first two tick labels :(
       .data(['water', 'brush'])
       .text(d => d)
       .attr('x', 200)
       .attr('y', (d,i) => -40 - i*10)
       .style('fill', d => legend[d]) */

    // the actual bar chart
    sel.append('g')
      .selectAll('rect')
      .data(forage)
      .enter()
          .append('rect')
          // .text('hello world')
          .attr('x', d => 10 + 20*d.id)
          .attr('y', d => yScale(d.amount)) // 100 - d[1]
          .attr('width', 15)
          .attr('height', d => 2*d.amount)
          .style('fill', d => { return legend[d.want] })

/*          .append('text')
          .attr('x', d => 10 + 20*d.id)
          .attr('y', d => yScale(d.amount) - 10)
          .text(d => {return {'camel': '🐪', 'deer': '🦌'}[d.kind]} ) */

    let xLabels = sel.append('g')
       .selectAll('text')
       .data(forage)

    xLabels
       .enter()
            .append('text')
            .attr('transform', d => `translate(${10 + 20*d.id}, 115)`) // , rotate(-30)
            .attr('x', 0)
            .attr('y', 0)
            .text(d => { return {'camel': 'C', 'deer': 'D'}[d.kind] } )

    // FIXME: should grab the first two x axis labels and overwrite them, but doesn't
    xLabels 
       .selectAll('text')
       .data(['Deer', 'Camel'])
       .text(d => d)
       .attr('transform', 'translate(-20 -20) rotate(-30)')
//       .style('fill', d => legend[d])
})

sel.append('g')
//    .attr('transform', 'translate(10, 100)')
   .call(d3.axisLeft(yScale).ticks(5))
sel.append('text')
   .attr('transform', 'translate(-30, 50) rotate(270)')
      .text('amount consumed')
      .style("text-anchor", "middle")

  // <text x="10" y="10">hello world</text>

