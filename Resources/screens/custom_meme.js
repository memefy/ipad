var win = Titanium.UI.currentWindow;
win.setBackgroundColor('#FFF');

Titanium.App.Properties.setString("meme_category_id", 0);
Titanium.App.Properties.setString("selected_meme_row", 1);



		// select category
		var close = Ti.UI.createButton({
			title: 'Done',
			right: 75
		});

		var catpopover = Ti.UI.iPad.createPopover({
    		width:400, 
		    height: 230,
	    	title: "Select meme",
    		rightNavButton:close
		});	
		
		
		
var imageView = Titanium.UI.createImageView({
	backgroundColor:'#FFF'
});

win.add(imageView);


var image_scale = 1;
var tall = true;


Titanium.include('labels.js');
Titanium.include('save_upload.js');

var popoverView;
var arrowDirection;

var left_btns = Titanium.UI.createButtonBar({
    labels:['Image', 'Category'],
    backgroundColor:'#336699',
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR
});

if (Titanium.Platform.osname == 'ipad')
{
	// photogallery displays in a popover on the ipad and we
	// want to make it relative to our image with a left arrow
	arrowDirection = Ti.UI.iPad.POPOVER_ARROW_DIRECTION_LEFT;
	popoverView = left_btns;
}


Titanium.UI.currentWindow.leftNavButton = left_btns;
	
left_btns.addEventListener('click',function(e){

	// select image
	if(e.index == 0){

		catpopover.hide();
		Titanium.Media.openPhotoGallery({
		
			success:function(event)
			{
				//var cropRect = event.cropRect;
				var image = event.media;

				// set image view
				Ti.API.debug('Our type was: '+event.mediaType);
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
				{
					imageView.image = image;

					tmp = imageView.toImage();
					
					image_scale = tmp.height/tmp.width;
					Titanium.API.info(tmp.height + ' v ' + tmp.width);

					tall = (image_scale > 1);
					
					left_btns.fireEvent('click', {index: 1});
					
					Titanium.App.Properties.setString("saved", "");
					bb1.labels = ['Upload'];//, 'Settings', 'Help'];			
				}
				else
				{
		
				}
		
			},
			cancel:function()
			{
		
			},
			error:function(error)
			{
			},
//			allowEditing:false,
			popoverView:popoverView,
			arrowDirection:arrowDirection,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	} else if(e.index == 1){
		
 
		close.addEventListener('click', function() {
			catpopover.hide({animated:true});
		});


	
		var picker = Ti.UI.createPicker({selectionIndicator:true});

		var column = Ti.UI.createPickerColumn();
		var itemList = Titanium.UI.currentWindow.memes;

		var custom_id = 0;
		for (var c = 0; c < itemList.length; c++){
			var thisItem = itemList[c];

			column.addRow(Ti.UI.createPickerRow({title:thisItem.title,meme_id:thisItem.id}));
			if(thisItem.title == 'Custom'){
				Titanium.App.Properties.setString("selected_meme_row", c);
			}
		}

		picker.add(column);
		
		// preselect what was previously selected
		picker.setSelectedRow(0, Titanium.App.Properties.getString("selected_meme_row"), false);

		picker.addEventListener('change', function(e) {
			Titanium.App.Properties.setString("meme_category_id", e.row.meme_id);
			Titanium.App.Properties.setString("selected_meme_row", e.rowIndex);
			Ti.API.info('selected: ' + e.row.meme_id + ' - ' +e.rowIndex);
			//catpopover.hide({animated:true});
		});

		catpopover.add(picker);
		catpopover.show({view:left_btns});
		catpopover.addEventListener('blur', function(e){
			catpopover.hide();
		});
		
	}
});

left_btns.fireEvent('click', {index: 0});