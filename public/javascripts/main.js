// Disabling autoDiscover, otherwise Dropzone will try to attach twice.
Dropzone.autoDiscover = false;

$(document).ready(function() {

	// Now that the DOM is fully loaded, create the dropzone.
	var dz = new Dropzone('#dropzone', { url: '/upload' });

	dz.on('success', function(file, res) {

		// $('#dropzone').slideUp(800, function(){

		// Initialize imgcrppr with the uploaded file.
		$('#imgcrppr').imgcrppr({
			image_src: '/tmp/' + res.newfilename,
			custom_controls: true,
			controls: {
				zoom: "<div id='ic-slider'></div>",
				rotate: "<button type='button' id='ic-btn-rotate' class='pure-button'><i class='fa fa-repeat'></i> Rotate</button>",
				reset: "<button type='button' id='ic-btn-reset' class='pure-button'><i class='fa fa-times'></i> Reset</button>",
				crop: "<button type='button' id='ic-btn-crop' class='pure-button'><i class='fa fa-check'></i> Crop and Save</button>"
			},

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
						if ( ! res.alreadyCropped) {
							var numCrops = parseInt($('#num-crops').text());
							numCrops++;
							$('#num-crops').html(numCrops);
						}

						console.log('Downloading image');
						window.location = '/download/' + res.filename;

						return;
					}
				});
			}
		});

	// $('#imgcrppr').hide().slideDown(1000);
	$('#imgcrppr').animate({
		    opacity: 1,
		    width: '600px',
		    height: '382px'
		},
		{
			duration:1000,
			complete: function() {
				$('#ic-canvas').append('<div class="ic-success">Happy cropping! <i class="fa fa-smile-o"></i></div>');
			}
		});

	});

});