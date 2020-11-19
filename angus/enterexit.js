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

/*
  jsonCats_Monday = [];
  jsonDogs_Monday = [];
  jsonPets_Monday = [];
*/
  dataToSVG(jsonCats_Sunday, jsonDogs_Sunday, jsonPets_Sunday);
 
  let CURRENT_DAY = "Sunday";

  svg.on("click", () => { 

    if (CURRENT_DAY == "Sunday") {

      dataToSVG(jsonCats_Monday, jsonDogs_Monday, jsonPets_Monday); 
      CURRENT_DAY = "Monday"
    } else {
      dataToSVG(jsonCats_Sunday, jsonDogs_Sunday, jsonPets_Sunday);
      CURRENT_DAY = "Sunday";
    }

  } ) ;




  function dataToSVG(jsonCats, jsonDogs, jsonPets)  {

    let circles = svg.selectAll("circle")
      .data(jsonCats)
      .join(
         enter => enter //when we are seeing new CAT data for the first time
     
        .append("circle") //append a circle shape for each data point, and set various attributes based on the data
        .attr("fill", d3.color("rgba(0,255,0,0.5)")  )
        .attr("cx", d => { return margin + (d.Cuteness * xinc); })
        .attr("cy", d => { return canvasH - (margin + (d.Size * yinc)); })
        .attr("r", 30) 
        .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
        .attr("stroke-width", 3)
        .attr("opacity", 0)
       
        
        .call(enter => enter.transition() //FADE in the first time
           .duration("1000")
           .attr("opacity", 1))
        ,
        

        update => update 
        .call(update => update.transition() //MOVE to new position
          .duration("1000")
          .attr("cx", d => { return margin + (d.Cuteness * xinc); })
          .attr("cy", d => { return canvasH - (margin + (d.Size * yinc)); })
          .attr("r", 30)
        ),
      


        exit => exit //REMOVE
         .attr("fill","red")
         .call(exit => exit.transition()
            .duration("1000")
            .attr("opacity", 0)
            .remove()
         )
        
      );

   
  

    let rects = svg.selectAll("rect")
      .data(jsonDogs)
      .join(

        enter => enter //when we are seeing new DOG data for the first time
       
        .append("rect") //append a rect shape for each data point, and set various attributes based on the data
        .attr("fill", d3.color("rgba(0,0,255,0.5)")  )
        .attr("x", d => { return -30 + margin + (d.Cuteness * xinc); })
        .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)); })
        .attr("width", d => { return 60; }) 
        .attr("height", d => { return 60; }) 
        .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
        .attr("stroke-width", 3)
        .attr("opacity", 0)

        .call(enter => enter.transition()
           .duration("1000")
           .attr("opacity", 1))

        ,

      
        
       update => update

        .call(update => update.transition()
          .duration("1000")
          .attr("x", d => { return -30 + margin + (d.Cuteness * xinc); })
          .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)); })
        ),
      
    
        exit => exit
       
        .attr("fill","red")
         .call(exit => exit.transition()
            .duration("1000")
            .attr("opacity", 0)
            .remove()
         )
      );




      let text = svg.selectAll("text")
        .data(jsonPets);

      text.join(

        enter => enter
        .append("text")
        .attr("text-anchor","middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .attr("x", d => { return -30 + margin + (d.Cuteness * xinc) + 30; })
        .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)) + 80; })

        .attr("opacity", 0)

        .call(enter => enter.transition()
           .duration("1000")
           .attr("opacity", 1))

        .text(d => {return d.Name}),

        
        update => update
         .attr("opacity", 0)
        .call(update => update.transition()
        .duration("1000")
        .attr("x", d => { return -30 + margin + (d.Cuteness * xinc) + 30; })
        .attr("y", d => { return -30 + canvasH - (margin + (d.Size * yinc)) + 80; })
            .attr("opacity", 1)
        .text(d => {return d.Name})
        ),

        
        exit => exit

        .call(exit => exit.transition()
        .duration(1000)
          .attr("opacity", 0))
        .remove()
        
      );
  


      }



}
