var win = Titanium.UI.currentWindow;
win.backgroundColor = '#FFF';

var uploaded_id = 0;


var imageView = Titanium.UI.createImageView({
//	image: Titanium.App.Properties.getString("meme_image"),
	image: Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, Titanium.App.Properties.getString("meme_image"))
});
var tmp = imageView.toImage();

Titanium.UI.currentWindow.add(imageView);

var image_scale = tmp.height/tmp.width;
var tall = (image_scale > 1);



Titanium.include('labels.js');
Titanium.include('save_upload.js');