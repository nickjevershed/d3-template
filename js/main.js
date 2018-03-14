//Guardian-specific responsive iframe function

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

	width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;
   

	d3.select("#graphicContainer svg").remove();

	var svg = d3.select("#graphicContainer").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr("id", "svg")
				.attr("overflow", "hidden");					

	var features = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

} // end init

var q = d3.queue()
        .defer(d3.csv, "data/thing-data.csv")
        .defer(d3.json, "data/au-states.json")
        .awaitAll(function(error, results) {
			init(results[0],results[1])
			var to=null
			var lastWidth = document.querySelector("#graphicContainer").getBoundingClientRect()
			window.addEventListener('resize', function() {
				var thisWidth = document.querySelector("#graphicContainer").getBoundingClientRect()
				if (lastWidth != thisWidth) {
					window.clearTimeout(to);
					to = window.setTimeout(function() {
						    makeMap(results[0],results[1])
						}, 500)
				}
			})
        });
