// @codekit-prepend "../components/jquery/jquery.js"
// @codekit-prepend "../components/leaflet/dist/leaflet.js"


var wikiVis = function (options) {

	var defaults = {
		elem: 'map',
		mapHeight: '300px',
		mapWidth: '500px',
		data: ''
	};

	var app = this,
	data = {},
	settings = options || defaults,
	leaflet = {},
	el = $('#'+settings.elem);

	app.addPoint = function(attributes) {
		var marker = L.marker([attributes.lat,attributes.long]).addTo(leaflet);
	}

	app.init = function() {
		// Set leadlet image path or else it will complain.
		L.Icon.Default.imagePath = 'components/leaflet/dist/images';

		// Set the width of our map container
		$(el).width(settings.mapWidth).height(settings.mapHeight);

		// Create a leaflet instance 
		leaflet = L.map(settings.elem, {
			zoom:5,
			center: [51.505, -0.09],
		});

		// Add tilemap.
		L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
		    key: 'fe3ba11f93ba4d2186f54c42e4995976',
		    styleId: 997
		}).addTo(leaflet);

		// Fetch data
		$.getJSON(settings.data).done(function(data) {
			console.log(data);
			data = data;

			// iterate over the children
			$.each(data.children, function(key, value) {

				// build attributes object
				var attributes = {
					lat:this.coordinates.latitude,
					long:this.coordinates.longitude,
					title: this.articleTitle,
					popup: ''
				}

				// create node
				app.addPoint(attributes);
			});

		}).fail(function() {
			console.log( "error" );
		});
	};

	app.init();

	return app;
};