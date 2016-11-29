d3.loadData = function() {
	        var loadedCallback = null;
	        var toload = {};
	        var data = {};
	        var loaded = function(name, d) {
	          delete toload[name];
	          data[name] = d;
	          return notifyIfAll();
	        };
	        var notifyIfAll = function() {
	          if ((loadedCallback != null) && d3.keys(toload).length === 0) {
	            loadedCallback(data);
	          }
	        };
	        var loader = {
	          json: function(name, url) {
	            toload[name] = url;
	            d3.json(url, function(d) {
	              return loaded(name, d);
	            });
	            return loader;
	          },
	          csv: function(name, url) {
	            toload[name] = url;
	            d3.csv(url, function(d) {
	              return loaded(name, d);
	            });
	            return loader;
	          },
	          onload: function(callback) {
	            loadedCallback = callback;
	            notifyIfAll();
	          }
	        };
	        return loader;
			};	