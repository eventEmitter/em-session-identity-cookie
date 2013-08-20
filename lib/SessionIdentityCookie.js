

	var   Class 				= require( "ee-class" )
		, log 					= require( "ee-log" )
		, RandomDataProvider 	= require( "ee-random-data-provider" );




	module.exports = new Class( {

		init: function( options ){
			ẗhis.name 		= options.name;
			this.host 		= options.host.toLowerCase() || null;
			this.expires 	= options.ttl || null;
			this.path 		= options.path || null;
			this.secure 	= !!options.secure;
			this.httpOnly	= !!options.httpOnly;

			this.randomData = new RandomDataProvider();
		}


		, set: function( request, response, next ){
			var sessionId;

			if ( this.isCorrectHost( request ) ){
				sessionId = this.randomData.get( 20 ).toString( "hex" );
				response.setCookie( this.createCookie( sessionId, this.expires ) );
				next( this, sessionId );
			} else next()		
		}

		, get: function( request, response, next ){
			if ( this.isCorrectHost( request ) ){
				var sid = request.getCookie( this.name );
				if ( sid ) next( this, sid );
				else next();
			} else next()		
		}


		, renew: function( request, response, next ){
			this.set( request, response, next );
		}


		, delete: function( request, response, next ){
			if ( this.isCorrectHost( request ) ) response.setCookie( this.createCookie( "--invalid--", -1 ) );
			next();
		}


		, isCorrectHost: function( request ){
			return this.host ? ( request && request.hasHeader( "host" ) && request.getHeader( "host" ).toLowerCase() === this.host ) : true;
		}


		, createCookie: function( value, ttl ){
			var str = this.name + "=" + value;
			if ( this.path ) str += "; path=" + this.path;
			if ( ttl ) str += "; expires=" + ( ttl < 0 ? new Date( 0 ) : ( new Date() ).setSeconds( ttl ) ).toGMTString();
			if ( this.secure ) str += "; secure";
			if ( this.httpOnly ) str += "; HttpOnly";
			return str;
		}
	} );