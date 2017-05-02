# em-session-identity-cookie

[![Greenkeeper badge](https://badges.greenkeeper.io/eventEmitter/em-session-identity-cookie.svg)](https://greenkeeper.io/)

manages cookies on http requests, is a middleware for em-sesion-manager. cookies contain only the sessoin id which is created from 20 bytes hex encoded true random data.

# installation

	npm install em-session-identity-cookie

# usage

	var CookieIdentity = require( "em-session-identity-cookie" );

	var mySessionIds = new CookieIdentity( {
		  host: 	"eventemitter.com"  	// optional, cookie is only set on responses for this host
		, path: 	"/" 					// optional
		, secure: 	true					// optional
		, httpOnly: true					// optional
		, ttl: 		3600 * 24 * 365 * 20 	// optional, cookies are valid 20 years. not set = cookie gets deleted when the browser is closed
	} );


	sessionManager.setIdentityManager( mySessionIds );