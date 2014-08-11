// helper functions

function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }

    path.attr("x1", startX);
    path.attr("y1", startY);
    path.attr("x2", endX);
    path.attr("y2", endY);
}

function connectElements(svg, path, startElem, endElem) {
    var svgContainer= $("#simple-map");


    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + 0.5*startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  + 0.5*startElem.outerHeight() - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);

}

// Array remove prototype.
Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (item) {
        var removeCounter = 0;

        for (var index = 0; index < this.length; index++) {
            if (this[index] === item) {
                this.splice(index, 1);
                removeCounter++;
                index--;
            }
        }
        return removeCounter;
    }
});

function getRandomLatLng() {

    var lat = (Math.random()*180).toFixed(3);
    var posorneg = Math.floor(Math.random());
    if (posorneg == 0) {
        lat = lat * -1;
    }

	// LATITUDE -90 to +90

    var lon = (Math.random()*90).toFixed(3);
    var posorneg = Math.floor(Math.random());
    if (posorneg == 0) {
        lon = lon * -1;
    }

	return new L.LatLng(
		lat,
		lon
	);
}

function generateRandomChain() {
	var output = {};
	var minNodes = 3;
	var maxNodes = 10;

	// set up

	output.chainID = Math.floor(Math.random()*100000);
	output.issuesMap = ["Working Conditions","Human Rights","Environmental Damage","Conflict","Animal welfare","Child labour","Forced Labour ","Tax Avoidance","Other"]
	output.chainURL = 'http://wikichains.oii.ox.ac.uk/chains/'+output.chainID;
	output.chainName = 'Chain Example';
	output.children = [];
	output.edges = [];

	//generate nodes
	var numNodes = Math.floor(Math.random() * 10)+1;

	for (i=0; i<numNodes; i++) {
		var node = {};
		node.id = Math.floor(Math.random()*100000);
		node.title = 'Article '+node.id;
		node.type = Math.floor(Math.random()*6);
		node.url = 'http://wikichains.oii.ox.ac.uk/article/'+node.id;
		node.coordinates = getRandomLatLng();
		output.children.push(node);
	}

	//generate issues
	$.each(output.children, function(index, value) {
		value.issues = [];
		var numIssues = Math.floor(Math.random()*9);

		for (i=0; i<numIssues; i++) {
			foundit:
			while(true) {
				thisIssue = Math.floor(Math.random()*output.issuesMap.length);
				if (value.issues.indexOf(thisIssue)==-1) {
					value.issues.push(thisIssue);
					var x = i+1;
					break foundit;
				} else {
				}		
			}
		}			
	});

	//generate edges
	for (i=0; i<(output.children.length-1); i++) {
		var edge = {};
		edge.from = i;
		edge.to = i+1;
		output.edges.push(edge);
	};

	return JSON.stringify(output);
}



// Colours

var colors = {
	blue: '#0000ff',
	gold: '#C99A2E',
	red: 'Tomato'
}

// Full Map
var wikiVis = function (options) {

	var defaults = {
		simple: false,
		elem: 'map',
		mapHeight: '500px',
		mapWidth: '100%',
		data: undefined
	};

	var app = this,
	settings = options || defaults,
	data = settings.data;
	leaflet = {},
	el = $('#'+settings.elem);
	var markers = [];

	app.drawData = function() {
		// iterate over the children
		$.each(data.children, function(key, value) {
			// build attributes object d 
			// create node
			app.addPoint(value);
		});

		$.each(data.edges, function(key, value) {
			var from = data.children[value.from].coordinates;
			var to = data.children[value.to].coordinates;
			app.addEdge(from,to);	

		});
	}

	app.addPoint = function(attributes) {
		var coords = attributes.coordinates;
		var options = {};
		options.issues = attributes.issues;
		var marker = new L.RadialChainMarker(coords, options).addTo(leaflet);
		var marker = new L.Marker(coords, {radius: 5,zIndexOffset:1000}).addTo(leaflet);
	}

	app.addEdge = function(from,to) {
		var bounds = leaflet.getBounds(),
			southWest = bounds.getSouthWest(),
			northEast = bounds.getNorthEast(),
			lngSpan = northEast.lng - southWest.lng,
			latSpan = northEast.lat - southWest.lat;

		var coords = [from,to];
		var options = {
			color: colors.red,
			weight: 4,
		};

		var arcedPolyline = new L.ArcedPolyline(coords,options).addTo(leaflet);
	}

	app.init = function() {

		console.log('init: simple settings == false');
		// Set leadlet image path or else it will complain.
		L.Icon.Default.imagePath = 'components/leaflet/dist/images';

		// Set the width of our map container
		console.log('setting width of container:')
		console.log($(el));
		$(el).width(settings.mapWidth).height(settings.mapHeight);

		var layer = new L.StamenTileLayer("toner-lite");

		// Create a leaflet instance 
		leaflet = L.map(settings.elem, {
			zoom:3,
			center: [51.505, -0.09],
		});

		leaflet.addLayer(layer);

		// Create a custom marker class
		L.RadialChainMarker = L.ChartMarker.extend({
			initialize: function (centerLatLng, options) {
				L.Util.setOptions(this, options);
				L.ChartMarker.prototype.initialize.call(this, centerLatLng, options);
			},

			// Global options
			options: {
				weight:	1,
				opacity: 1,
				color: '#000',
				fill: false,
				radius: 45,
				rotation: 360.0,
				numSegments: 9,
				offset: 0,
				barThickness: 20, // make this less than radius to create donut
				maxDegrees: 360.0, 
				iconSize: new L.Point(50, 40), //size of hover popup
				backgroundStyle: {
					fill: true,
					fillColor: '#707070',
					fillOpacity: 1,
					opacity: 1,
					color: '#505050'
				},
				colors: L.ColorBrewer.Qualitative.Set1[9],
			},

			_loadComponents: function() {
				var value, minValue, maxValue;
				var startAngle = 0;
				var lastAngle = 0;
				var maxDegrees = this.options.maxDegrees || 360.0;
				var radiusX = this.options.radiusX || this.options.radius;
				var radiusY = this.options.radiusY || this.options.radius;
				var data = this.options.issues;
				var barThickness = this.options.barThickness || 4;
				var colors = this.options.colors;
				

				// Iterate through the data values
				for(i = 0; i < 9; i++) {
					value = i+1;
					var angle = (360 / this.options.numSegments) * i; //angle of segment = angle per seg * current seg
					var endAngle = (360 / this.options.numSegments) * (i + 1);

					var segmentOptions = {};
					
					segmentOptions.startAngle = angle;
					segmentOptions.endAngle = endAngle;
					if(data.indexOf(i)!=-1) {
						segmentOptions.fillColor = colors[i];
						// segmentOptions.fillColor = '#ff0000';
					} else {
						segmentOptions.fillColor = 'rgba(0,0,0,0)';
					}
					segmentOptions.opacity = 1;
					segmentOptions.fillOpacity = 1;
					segmentOptions.weight = 1;
					segmentOptions.color = 'rgba(0,0,0,0)';
					segmentOptions.fill = true;
					segmentOptions.offset = 2;
					segmentOptions.radiusX = 40;
					segmentOptions.radiusY = 40;
					segmentOptions.barThickness = 23;
					segmentOptions.rotation = 0;
					segmentOptions.key = i;
					segmentOptions.dropShadow = false;
					segmentOptions.gradient = false;
					segmentOptions.value = value;
					
					bar = new L.RadialBarMarker(this._latlng, segmentOptions);
					
					this.addLayer(bar);
				}
			}
		});

	}; //end init()

	app.init();
	app.drawData();


	return app;
};

// Simple vis

var simpleWikiVis = function (options) {

	var defaults = {
		elem: 'simple-map',
		mapWidth: '100%',
		data: undefined
	};

	var app = this,
	settings = options || defaults,
	data = settings.data;
	el = $('#'+settings.elem);
	$(el).width(settings.mapWidth);

	var nodeIDs = [];
	var step = 0;
	var row = new Array();

	app.drawData = function() {

		// based on the edge data, select and apply a background image
		$.each(row, function(rowKey, rowValue) {
			// create a row container
			$('.row-container').append('<div class="row"></div>');

			var newRowHeight = $('.grid').outerHeight() * $('.row').length;
			if (newRowHeight < 100) {
				newRowHeight = 100;
			}
			$('#svg1, .simple-map').css({height:newRowHeight});
			var topPos = newRowHeight * -1;
			$('.row').css({top:topPos});

			// iterate through the items in the current row and add them to the above container
			$.each(row[rowKey], function(frameKey, frameValue) {

				var newRowWidth = $('.row:last').outerWidth()+$('.grid').outerWidth();
				$('.row:last').css({width:newRowWidth});
				if($('#svg1').outerWidth() < newRowWidth) {
					$('#svg1').css({width:newRowWidth});
				}

				if (frameValue != 0) {
					// var fileName = 'img/simple-bgs/'+frameValue[0].mask.join('')+'.png';
					$('.row:last').append('<div class="grid"><div class="circle" id="'+frameValue[0].id+'"></div><div class="article-text">'+frameValue[0].id+'</div></div>');
			
				} else {
					$('.row:last').append('<div class="grid"></div>');
				}		
			});

		});

		$.each(data.edges, function(edgeKey, edgeValue) {

			var edge = document.createElementNS('http://www.w3.org/2000/svg', 'line');

			var $edge = $(edge).attr({});

			$("#svg1").append($edge);
			var from = data.children[edgeValue.from].id;
			var to = data.children[edgeValue.to].id;
			connectElements($("#svg1"), $(edge), $("#"+from),   $("#"+to));
		});

	}

	app.init = function() {
		console.log('init');

		console.log('init: simple settings == true');
		// find the nodeIDs we have in this chain.
		$.each(data.children, function(key, value) {
			nodeIDs.push(value.id);
		});

		// find the root node(s) - nodes that no other node links to.
		var baseIDs = nodeIDs;


		$.each(data.edges, function(key, value) {
			baseIDs.remove(data.children[value.to].id);
		});

		// set current nodes as root nodes
		// current nodes contains the next 'frame' of nodes
		var currentNodes = baseIDs;
		var currentRow = 0;
		var unfinished = true;
		var frame = 0;

		while (unfinished) {

			var nextCurrentNodes = [];

			if (currentNodes.length > 0 ) {
				$.each(currentNodes, function(nodeKey, nodeValue) {
					// iterate through the current nodes

					if (row[currentRow] instanceof Array) {

					} else {
						row[currentRow] = new Array();
						for (var i = 0; i < data.children.length; i++) {
							row[currentRow].push(0);
						}							
					}
	
					if (row[currentRow][frame] instanceof Array) {

					} else {
						row[currentRow][frame] = new Array();	
					}
					

					row[currentRow][frame].push({
							id: nodeValue,
							key: nodeKey
						});

					var currentIndex = row[currentRow][frame].length-1;


					// we increment the current row at the end of each iteration

					nextCurrentNodes = [];

					$.each(data.edges, function(edgeKey, edgeValue) {

						// iterate over the edges, looking for the current node.

						if (data.children[edgeValue.from].id == nodeValue) {
							// current node is linking to someone. we don't know where this node is going to be though. so we do nothing!
							// ...except add the nodes we are linking to into the currentNode array, and increment the counter.
							nextCurrentNodes.push(data.children[edgeValue.to].id);

						} 

					});
					
					currentRow++;

				});	//end each current nodes
				
				// set current nodes to the nodes linked to by these nodes
				currentNodes = nextCurrentNodes;

				// reset current row
				currentRow = 0;
				frame++;

			} else {
				unfinished = false;
			}// end if current nodes is greater than 0

		} // end while unfinished

	}; //end init()

	app.init();
	app.drawData();


	return app;
};






