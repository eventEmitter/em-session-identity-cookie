

	var   Webservice 	= require( "../ee-webservice" )
		, Identity 		= require( "./" );



	var service = new Webservice( {
		http: {
			  interface: 	Webservice.Webserver.IF_ANY 
			, port: 		12001
		}
	} );



	var i = new Identity();

	service.use( { request: function( request, response, next ){

		i.set( request, response, function( identiy, sid ){
			console.log( sid );
		} );


		response.send();
	} } );



	service.listen();