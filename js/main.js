iframeMessenger.enableAutoResize();

function init(data) {

	console.log("data", data);
	var isMobile;
	var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	if (windowWidth < 610) {
			isMobile = true;
	}	

	if (windowWidth >= 610){
			isMobile = false;
	}

	var width = document.querySelector("#graphicContainer").getBoundingClientRect().width
	var height = width*0.6;					
	var margin = {top: 0, right: 0, bottom: 0, left:0};

	var svg = d3.select("#graphicContainer").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr("id", "svg")
				.attr("overflow", "hidden");					

	var features = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

} // end init

d3.loadData()
    .csv('things',"data/thing-data.csv")
    .json('states',"data/au-states.json")
    .onload(function(data) {
    	init(data);
    	var lastWidth = document.querySelector("#ratio-graph").getBoundingClientRect().width
    	window.addEventListener('resize', function() {
	    	var thisWidth = document.querySelector("#graphicContainer").getBoundingClientRect().width
		    if (lastWidth != thisWidth) {
		      window.clearTimeout(to);
		      to = window.setTimeout(init(data), 500)
		    }
  		})

});

