// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

$(document).ready(function() {

	// Now that the DOM is fully loaded, create the dropzone.
	var dz = new Dropzone('#dropzone', { url: '/upload' });

	dz.on('success', function(file, res) {

		// Initialize imgcrppr with the uploaded file.
		$('#imgcrppr').imgcrppr({
			image_src: '/tmp/' + res.newfilename,
		});
		
	});


});