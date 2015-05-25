// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

$(document).ready(function() {

	// Now that the DOM is fully loaded, create the dropzone.
	var dz = new Dropzone('#dropzone', { url: '/upload' });

	dz.on('success', function(file, res) {

		// Initialize imgcrppr with the uploaded file.
		$('#imgcrppr').imgcrppr({
			image_src: '/tmp/' + res.newfilename,

			// Process the image using Ajax request to /process.
			callback: function(cropdata) {

				$.ajax({
					url: '/process',
					method: 'GET',
					data: {
						'filename': res.newfilename,
						'x': cropdata.x,
						'y': cropdata.y,
						'scalewidth': cropdata.scale_width,
						'scale_height': cropdata.scale_height,
						'cropwidth': cropdata.crop_width,
						'cropheight': cropdata.crop_height,
						'rotatedeg': cropdata.rotate_deg
					}
				})
				.success(function(res) {
					// Image processing finished, download image.
					if (res.filename != 'undefined') {
						console.log('Downloading image');
						window.location = '/download/' + res.filename;

						return;
					}
				});
			}
		});
		
	});

});