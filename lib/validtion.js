module.exports.isValidUrl(str) {	
	var pattern = '^(https?|ftp)://' + 	// protocol
				  '()?' + 	// domain prefix
				  '(()|())' + // domain or ip address
				  '\.()' + // domain suffix				  
				  '(:\d{2-})?' + // port
				  '/',
		regex = new RegExp(pattern);
	return regex.test(str);
}
