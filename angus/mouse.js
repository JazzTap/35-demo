function init(elements) {


  let canvasW = 700;
  let canvasH = 400;

  let margin = 50;
  let w = canvasW - (margin * 2);
  let h = canvasH - (margin * 2);
  let xinc = w / 10;
  let yinc = h / 10;

  let svg = d3.select("body").append("svg")
    .attr("width", canvasW)
    .attr("height", canvasH)
    .style("background-color", d3.color("rgba(255, 0, 0, 0.5)") )
    ;



 


  let jsonCats;
  let jsonDogs;
  let jsonPets;


  let jsonCats_Sunday = elements.filter( e => {  return e.Type == "cat" && e.Day == "Sunday";  } );
  let jsonDogs_Sunday = elements.filter( e => {  return e.Type == "dog" && e.Day == "Sunday";  } );
  let jsonPets_Sunday = elements.filter( e => {  return e.Day == "Sunday";  } );

  let jsonCats_Monday = elements.filter( e => {  return e.Type == "cat" && e.Day == "Monday";  } );
  let jsonDogs_Monday = elements.filter( e => {  return e.Type == "dog" && e.Day == "Monday";  } );
  let jsonPets_Monday = elements.filter( e => {  return e.Day == "Monday";  } );

  jsonCats = jsonCats_Sunday;
  jsonDogs = jsonDogs_Sunday;
  jsonPets = jsonPets_Sunday;

 /*
  jsonCats = jsonCats_Monday;
  jsonDogs = jsonDogs_Monday;
  jsonPets = jsonPets_Monday;
*/

  

  let circles = svg.selectAll()
    .data(jsonCats)
    .enter() //when we are seeing new CAT data for the first time
      .append("circle") //append a circle shape for each data point, and set various attributes based on the data
        .attr("fill", d3.color("rgba(0,255,0,0.5)")  )
        .attr("cx", d => { return margin + (d.Cuteness * xinc); })
        .attr("cy", d => { return canvasH - (margin + (d.Size * yinc)); })
        .attr("r", 30) 
        .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
        .attr("stroke-width", 3)

        .on("mouseover", handleMouseOver_Circle)
        .on("mouseout", handleMouseOut_Circle);
    ;   
    
  

  let rects = svg.selectAll()
    .data(jsonDogs)
    .enter() //when we are seeing new DOG data for the first time
      .append("rect") //append a rect shape for each data point, and set various attributes based on the data
        .attr("fill", d3.color("rgba(0,0,255,0.5)")  )
         .attr("x", d => { return -30 + margin + (d.Cuteness * xinc); })
        .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)); })
        .attr("width", d => { return 60; }) 
        .attr("height", d => { return 60; }) 
        .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
        .attr("stroke-width", 3)

        .on("mouseover", handleMouseOver_Rect)
        .on("mouseout", handleMouseOut_Rect);
    ;    


  
  
  function handleMouseOver_Circle(d, i) {  

    d3.select(this).transition()
      .duration("200")
      .attr("fill", "white")
      .attr("r", 50)
  }  

  function handleMouseOut_Circle(d, i) {  

    d3.select(this).transition()
      .duration("1000")
      .attr("fill", "rgba(0,255,0,0.5)")
      .attr("r", 30);
  }   


  function handleMouseOver_Rect(d, i) {  

    d3.select(this).transition()
      .duration("200")
      .attr('fill', 'white')
     .attr("width", 90)
     .attr("height", 90)
      .attr("x", d => { return -15 -30 + margin + (d.Cuteness * xinc); })
        .attr("y", d => { return -15 -30 + canvasH - (margin + (d.Size * yinc)); })
   
  }  

  function handleMouseOut_Rect(d, i) {  

    d3.select(this).transition()
      .duration('1000')
      .attr('fill', d3.color("rgba(0,0,255,0.5)") )
      .attr("width", 60)
     .attr("height", 60)  
      .attr("x", d => { return -30 + margin + (d.Cuteness * xinc); })
        .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)); })

    
      
      
  }   


  let text = svg.selectAll()
    .data(jsonPets)
    .enter();


  text
    .append("text")
    .attr("text-anchor","middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .attr("fill", "black")
   .attr("x", d => { return -30 + margin + (d.Cuteness * xinc) + 30; })
    .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)) + 80; })
    .text(d => {return d.Name});

  text 
    .append("text")
    .attr("text-anchor","middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .attr("x", d => { return -30 + margin + (d.Cuteness * xinc) + 30; })
    .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)) + 35; })
    .text(d => {return d.Cuteness})





  const xText = svg.append("text")
    .attr("x",  canvasW / 2)
    .attr("y", canvasH - 10)
    .attr("text-anchor","middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .attr("fill", "black")
    .text("Cuteness of Pet");

  const yText = svg.append("text")
    .attr("text-anchor","middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .attr("fill", "black")
    .attr("transform", "translate(10,"+(canvasH/2)+") rotate(90)")
    .text("Size of Pet");




}
