// @codekit-prepend "../components/jquery/jquery.js"
// @codekit-prepend "../components/leaflet/dist/leaflet.js"
// @codekit-prepend "../components/leaflet-dvf/dist/leaflet-dvf.min.js"


// helper functions


var wikiVis = function (options) {

	var defaults = {
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

	function getRandomLatLng() {
		var bounds = leaflet.getBounds(),
			southWest = bounds.getSouthWest(),
			northEast = bounds.getNorthEast(),
			lngSpan = northEast.lng - southWest.lng,
			latSpan = northEast.lat - southWest.lat;

		return new L.LatLng(
				southWest.lat + latSpan * Math.random(),
				southWest.lng + lngSpan * Math.random());
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
		var numNodes = Math.floor(Math.random() * (maxNodes - minNodes));
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
		return JSON.stringify(output);
	}

	app.addPoint = function(attributes) {
		console.log(attributes);
		var coords = attributes.coordinates;
		var options = {};
		options.issues = attributes.issues;
		var marker = new L.RadialChainMarker(coords, options).addTo(leaflet);
	}

	app.init = function() {
		// Set leadlet image path or else it will complain.
		L.Icon.Default.imagePath = 'components/leaflet/dist/images';

		// Set the width of our map container
		$(el).width('100%').height('500px');

		// Create a leaflet instance 
		leaflet = L.map(settings.elem, {
			zoom:3,
			center: [51.505, -0.09],
		});

		// Add tilemap
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

		L.tileLayer(osmUrl, {
		}).addTo(leaflet);

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
				radius: 35,
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
					// console.log('angle is: '+angle);
					var endAngle = (360 / this.options.numSegments) * (i + 1);
					// console.log('end angle is: '+endAngle);

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
					segmentOptions.radiusX = 22;
					segmentOptions.radiusY = 22;
					segmentOptions.barThickness = 13;
					segmentOptions.rotation = 0;
					segmentOptions.key = i;
					segmentOptions.dropShadow = false;
					segmentOptions.gradient = false;
					segmentOptions.value = value;
					
					// console.log(segmentOptions);
					bar = new L.RadialBarMarker(this._latlng, segmentOptions);
					// console.log(bar);
					this._bindMouseEvents(bar);
					
					this.addLayer(bar);
				}
			}
		});

		
		var data = JSON.parse(app.generateRandomChain());
		// console.log(data);

		// Fetch data
		$.getJSON('http://localhost/joshua/wiki-vis/example.json').done(function(stuff) {

			// iterate over the children
			$.each(data.children, function(key, value) {

				// build attributes object d 
				// create node
				app.addPoint(value);
			});

		}).fail(function() {
			console.log( "error getting data." );
		});

	}; //end init()

	app.init();

	return app;
};