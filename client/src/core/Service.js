define(
    "core/Service",
    [
	"core/Locator"
    ],
    
    function (Locator) {
	
	function Service(){
	    
	}
	
	Service.prototype.getWidRoute = function(wid, cb){
	    var req = {};
	    req.url = "http://localhost:8080/route?wid="+wid;
            req.dataType = "json";
            req.success = function(data, status, jqXHR){
		cb(data);
            };
            $.ajax(req);
	};
	
	return Service;
	
    });
