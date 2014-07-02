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

var wikiVis = function (options) {

	var defaults = {
		simple: false,
		elem: 'map',
		mapHeight: '500px',
		mapWidth: '100%',
		data: ''
	};

	var app = this,
	data = {},
	settings = options || defaults,
	leaflet = {},
	el = $('#'+settings.elem);

	var colors = {
		blue: '#0000ff',
		gold: '#C99A2E'
	}

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


	app.generateRandomChain = function() {
		console.log("generating json....");
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
		 console.log('Creating '+numNodes+' nodes.');

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
		 console.log("Generating issues...");
		$.each(output.children, function(index, value) {
			value.issues = [];
			var numIssues = Math.floor(Math.random()*9);
			 console.log('Child '+index+' will have '+numIssues+' issues.');

			for (i=0; i<numIssues; i++) {
				foundit:
				while(true) {
					thisIssue = Math.floor(Math.random()*output.issuesMap.length);
					if (value.issues.indexOf(thisIssue)==-1) {
						value.issues.push(thisIssue);
						var x = i+1;
						 console.log('Issue '+x+" is "+thisIssue);
						break foundit;
					} else {
						 console.log(thisIssue+' already added.');
					}		
				}
			}			
		});

		//generate edges
		 console.log('generating edges...');
		for (i=0; i<(output.children.length-1); i++) {
			var edge = {};
			edge.from = i;
			edge.to = i+1;
			 console.log('adding edge:');
			 console.log(edge);
			output.edges.push(edge);
		};

		 console.log("Finished generating chain.");
		 console.log(output);
		return JSON.stringify(output);
	}

	app.addPoint = function(attributes) {
		 console.log(attributes);
		var coords = attributes.coordinates;
		var options = {};
		options.issues = attributes.issues;
		var marker = new L.RadialChainMarker(coords, options).addTo(leaflet);
		var marker = new L.Marker(coords, {radius: 5,zIndexOffset:1000}).addTo(leaflet);
	}

	app.addEdge = function(from,to) {
		 console.log("adding edge.");
		var bounds = leaflet.getBounds(),
			southWest = bounds.getSouthWest(),
			northEast = bounds.getNorthEast(),
			lngSpan = northEast.lng - southWest.lng,
			latSpan = northEast.lat - southWest.lat;

		var coords = [from,to];
		var options = {
			color: colors.gold,
			weight: 4,
		};

		 console.log(coords);
		var arcedPolyline = new L.ArcedPolyline(coords,options).addTo(leaflet);
		 console.log(arcedPolyline);
	}

	app.init = function() {

		// Are we creating a simple map or a full one?
		if (settings.simple) {

			// $(el).append('<div class="simple-map-container"></div>');

				var imageMask = [0,0,0,0,0,0];
				var multi = [];
				var nodeIDs = [];
				var step = 0;
				var row = new Array();
				// row[0] = new Array(0,0,0,0,0,0,0);
				// row[1] = new Array(0,0,0,0,0,0,0);
				// row[2] = new Array(0,0,0,0,0,0,0);
				// row[3] = new Array(0,0,0,0,0,0,0);			

			// find the nodeIDs we have in this chain.
			$.each(data.children, function(key, value) {
				nodeIDs.push(value.id);
			});

			// find the root node(s) - nodes that no other node links to.
			var baseIDs = nodeIDs;

			 console.log("setting base IDs to node IDs:");
			 console.log(baseIDs);

			$.each(data.edges, function(key, value) {
				 console.log(value);
				 console.log('removing node:'+data.children[value.to].id);
				baseIDs.remove(data.children[value.to].id);
				 console.log(baseIDs);
			});

			// set current nodes as root nodes
			// current nodes contains the next 'frame' of nodes
			var currentNodes = baseIDs;
			var currentRow = 0;
			var unfinished = true;
			var frame = 0;

			 console.log('currentNodes:');
			 console.log(currentNodes);
			while (unfinished) {
				 console.log('Starting unfinished loop.')



				var nextCurrentNodes = [];

				if (currentNodes.length > 0 ) {
					$.each(currentNodes, function(nodeKey, nodeValue) {
						// iterate through the current nodes
						 console.log("I have "+currentNodes.length+ " nodes to iterate over. Numer "+nodeKey);
						 console.log("Current node is: "+nodeValue);
						 console.log("current row is "+currentRow);
						 console.log("frame is: "+frame);

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
								mask: new Array(0,0,0,0,0,0)
							});

						var currentIndex = row[currentRow][frame].length-1;


						// we increment the current row at the end of each iteration

						nextCurrentNodes = [];



						$.each(data.edges, function(edgeKey, edgeValue) {

							// iterate over the edges, looking for the current node.

							 console.log('nodeValue: '+nodeValue+' edge from: '+data.children[edgeValue.from].id+ " edge to: "+data.children[edgeValue.to].id);
							if (data.children[edgeValue.from].id == nodeValue) {
								// current node is linking to someone. we don't know where this node is going to be though. so we do nothing!
								// ...except add the nodes we are linking to into the currentNode array, and increment the counter.
								nextCurrentNodes.push(data.children[edgeValue.to].id);
								 console.log('Found edge from this node to another. Adding to next current nodes:'+data.children[edgeValue.to].id);
								 console.log(nextCurrentNodes);

							} else if (data.children[edgeValue.to].id == nodeValue) {
								// we are being linked to. 

								// find which row the node that linked to this one is on. depending on that, set the mask.
								// don't forget to also update the linking node's mask because we now know which row the target will be on.
								
								// iterate over the rows and return when we find the row containing the previous node

								var previousRow = 0;
								 console.log("finding row of linking node.");
								for (var i = 0; i < row.length; i++) {
									 console.log("iterating over rows. Row number: "+i+" of "+row.length);
									 console.log("length of this row is "+row[i].length);

									for (var j=0;j< row[i].length; j++) {
						
										 console.log(row[i][j][0]);
										if (row[i][j][0] !== undefined && row[i][j][0].id == data.children[edgeValue.from].id) {
											 console.log('looking within row. Im looking for the value '+data.children[edgeValue.from].id+" to match "+row[i][j][0].id);
											previousRow = i;
											 console.log("prev row found: "+previousRow);
											break;
										}										
									}

								}
								 console.log("Found edge linking to this node. Node origin of edge is: "+data.children[edgeValue.from].id+". Its row is: "+previousRow);
								if (previousRow == 0) {
									if (currentRow == 0) {
										 console.log('// same row so left 001000');
										row[currentRow][frame][0].mask[2] = 1;


										 console.log('// linking node gets right 000100');
										row[previousRow][frame-1][0].mask[3] = 1;
									} else if (currentRow == 1) {
										 console.log('// above us so top left 100000');
										row[currentRow][frame][0].mask[0] = 1;

										 console.log('// linking node gets bottom right 000001');
										row[previousRow][frame-1][0].mask[5] = 1;
									}
								} else if (previousRow == 1) {
									if (currentRow == 0) {
										 console.log('// below us so bottom left 000010');
										row[currentRow][frame][0].mask[4] = 1;

										 console.log('// linking node gets top right 010000');
										row[previousRow][frame-1][0].mask[1] = 1;
									} else if (currentRow ==1) {
										 console.log('// same row so left 001000');
										row[currentRow][frame][0].mask[2] = 1;

										 console.log('// linking node gets right 000100');
										row[previousRow][frame-1][0].mask[3] = 1;
									}
								}

								 console.log('Row masks have been modified. Row is now:');
								 console.log(row);

							}

						});
						
						currentRow++;

					});	//end each current nodes
					
					// set current nodes to the nodes linked to by these nodes
					currentNodes = nextCurrentNodes;

					// reset current row
					 console.log('resetting current Row');
					currentRow = 0;
					frame++;

				} else {
					 console.log('current nodes = 0. finishing loop');
					unfinished = false;
				}// end if current nodes is greater than 0

			} // end while unfinished


			// based on the edge data, select and apply a background image
			$.each(row, function(rowKey, rowValue) {
			 console.log('iterating rows. row no: '+rowKey);
				// create a row container
				$('.row-container').append('<div class="row"></div>');

				var newRowHeight = $('.grid').outerHeight() * $('.row').length;
				$('#svg1').css({height:newRowHeight});
				var topPos = newRowHeight * -1;
				$('.row').css({top:topPos});

				// iterate through the items in the current row and add them to the above container
				$.each(row[rowKey], function(frameKey, frameValue) {


						var newRowWidth = $('.row:last').outerWidth()+$('.grid').outerWidth();
						$('.row:last').css({width:newRowWidth});
						if($('#svg1').outerWidth() < newRowWidth) {
							$('#svg1').css({width:newRowWidth});
						}

					
					 console.log(frameValue);
					if (frameValue != 0) {
						 console.log(frameValue);
						var fileName = 'img/simple-bgs/'+frameValue[0].mask.join('')+'.png';
						$('.row:last').append('<div class="grid"><div class="circle" id="'+frameValue[0].id+'"></div><div class="article-text">'+frameValue[0].id+'</div></div>');

						// $(".grid").last().css( "background-image", 'url(' + fileName + ')' );					
					} else {
						$('.row:last').append('<div class="grid"></div>');
					}		
				});

			});

			$.each(data.edges, function(edgeKey, edgeValue) {

							
				var edge = document.createElementNS('http://www.w3.org/2000/svg', 'line');

				var $edge = $(edge).attr({strokeWidth:4,stroke: 'red'});

				$("#svg1").append($edge);
				var from = data.children[edgeValue.from].id;
				var to = data.children[edgeValue.to].id;
				console.log(from);
				connectElements($("#svg1"), $(edge), $("#"+from),   $("#"+to));
			});

		// end simple map
		} else {
			// Set leadlet image path or else it will complain.
			L.Icon.Default.imagePath = 'components/leaflet/dist/images';

			// Set the width of our map container
			$(el).width('100%').height('500px');

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
					 console.log("passed: "+options);
					 console.log(this);
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
					 console.log('data = '+data);
					var barThickness = this.options.barThickness || 4;
					var colors = this.options.colors;
					

					// Iterate through the data values
					for(i = 0; i < 9; i++) {
						 console.log("iterating through each segment. i = "+i);
						value = i+1;
						 console.log("value = "+value);
						var angle = (360 / this.options.numSegments) * i; //angle of segment = angle per seg * current seg
						 console.log('angle is: '+angle);
						var endAngle = (360 / this.options.numSegments) * (i + 1);
						 console.log('end angle is: '+endAngle);

						var segmentOptions = {};
						
						segmentOptions.startAngle = angle;
						segmentOptions.endAngle = endAngle;
						if(data.indexOf(i)!=-1) {
							 console.log(i+" is in "+data);
							segmentOptions.fillColor = colors[i];
							// segmentOptions.fillColor = '#ff0000';
						} else {
							 console.log("no issue in this segment.");
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
						
						 console.log(segmentOptions);
						bar = new L.RadialBarMarker(this._latlng, segmentOptions);
						 console.log(bar);
						
						this.addLayer(bar);
					}
				}
			});

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

		} //end settings.simple

	}; //end init()

	// data = JSON.parse(app.generateRandomChain());
	// console.log(data);
	// Fetch data
	$.getJSON('http://localhost/joshua/wiki-vis/sample.json').done(function(json) {
		data = json;

		app.init();
	}).fail(function() {
		 console.log( "error getting data." );
	});

	return app;
};