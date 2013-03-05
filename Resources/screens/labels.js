var top_label_color = '#000';
var top_label_text = 'Tap to change';

var top_label = Titanium.UI.createLabel({
	touchEnabled: true,
	top: 20,
	height: 110,
	width: 724,
	textAlign: 'center',
	left: 'auto',
	font:{fontFamily:'Arial-BoldMT',fontSize:100, fontWeight: 'bold'},
	color: '#000',
	shadowColor:'#FFF',
    shadowOffset:{x:2,y:2},
	text: top_label_text
});

Titanium.UI.currentWindow.add(top_label);

top_label.addEventListener('click', function(e){
	
	var close = Ti.UI.createButton({
		title: 'Close',
		right: 75
	});
 
	close.addEventListener('click', function() {
		popover.hide({animated:true});
	});
 

	var lbtnView = Ti.UI.createView({
		width: 75,
		height: 25
	});

	lbtnView.add(close);

	var popover = Ti.UI.iPad.createPopover({ 
    	width:400, 
	    height: 120,
    	title: "Change text",
    	leftNavButton:close
	});	
	
	var top_tf = Titanium.UI.createTextField({
	    color:'#336699',
    	height:40,
	    top:0,
    	left:0,
	    width:4400,
		font:{fontSize:24},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		autocorrect:false,
    	value: top_label_text
	});
	top_tf.addEventListener('change', function() {
		top_label_text = top_tf.value;
		top_label.text = top_label_text;
	});
 
	
	// display row of buttons for color picking
	var color_picker = Titanium.UI.createTabbedBar({
		labels:['Black', 'White', 'Red'],
		top:45,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:35,
		width:400
	});

	// set the color if the color button is clicked
	color_picker.addEventListener('click', function(e){
		if(e.index == 0){
			top_label.color = '#000';
			top_label.shadowColor = '#FFF';
		} else if (e.index == 1) {
			top_label.color = '#FFF';			
			top_label.shadowColor = '#000';
		} else if (e.index == 2) {
			top_label.color = '#F00';			
			top_label.shadowColor = '#000';
		}
	});

	
	// display row of buttons for color picking
	var size_picker = Titanium.UI.createTabbedBar({
		labels:['Small', 'Medium', 'Large', 'Huge'],
		top:85,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:35,
		width:400
	});

	// set the color if the color button is clicked
	size_picker.addEventListener('click', function(e){
		if(e.index == 0){
			top_label.font = {fontSize:25, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:1,y:1};
		} else if (e.index == 1) {
			top_label.font = {fontSize:50, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:1,y:1};
		} else if (e.index == 2) {
			top_label.font = {fontSize:75, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:2,y:2};
		} else if (e.index == 3) {
			top_label.font = {fontSize:100, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:2,y:2};
		}
	});

	
	popover.add(color_picker);	
	popover.add(size_picker);	
	popover.add(top_tf);
	popover.show({view:top_label});	
	setTimeout(function() 
	{ 
		top_tf.focus();	
	},100);
});









var bottom_label_text = 'Tap to change';
var bottom_color_index = 0;
var bottom_label = Titanium.UI.createLabel({
	touchEnabled: true,
	bottom: 21,
	height: 110,
	width: 724,
	textAlign: 'center',
	left: 'auto',
	font:{fontFamily:'Arial-BoldMT',fontSize:100},
	color: '#000',
	shadowColor:'#FFF',
    shadowOffset:{x:2,y:2},
	text: bottom_label_text
});

Titanium.UI.currentWindow.add(bottom_label);

bottom_label.addEventListener('click', function(e){
	
	var close = Ti.UI.createButton({
		title: 'Close',
		right: 75
	});
 
	close.addEventListener('click', function() {
		popover.hide({animated:true});
	});
 
	var lbtnView = Ti.UI.createView({
		width: 75,
		height: 25
	});
 
	lbtnView.add(close);

	var popover = Ti.UI.iPad.createPopover({ 
    	width:400, 
	    height:120,
    	title: "Change text",
    	leftNavButton:close
	});	
	
	var bottom_tf = Titanium.UI.createTextField({
	    color:'#336699',
    	height:40,
	    top:0,
    	left:0,
	    width:400,
		font:{fontSize:24},
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		autocorrect:false,
    	value: bottom_label_text
	});
	bottom_tf.addEventListener('change', function() {
		bottom_label_text = bottom_tf.value;
		bottom_label.text = bottom_label_text;
	});
 
	
	// display row of buttons for color picking
	var color_picker = Titanium.UI.createTabbedBar({
		labels:['Black', 'White', 'Red'],
		top:45,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:35,
		width:400
	});

	// set the color if the color button is clicked
	color_picker.addEventListener('click', function(e){
		if(e.index == 0){
			bottom_label.color = '#000';
			bottom_label.shadowColor = '#FFF';
		} else if (e.index == 1) {
			bottom_label.color = '#FFF';			
			bottom_label.shadowColor = '#000';
		} else if (e.index == 2) {
			bottom_label.color = '#F00';			
			bottom_label.shadowColor = '#000';
		}
	});

	
	// display row of buttons for color picking
	var size_picker = Titanium.UI.createTabbedBar({
		labels:['Small', 'Medium', 'Large', 'Huge'],
		top:85,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:35,
		width:400
	});

	// set the color if the color button is clicked
	size_picker.addEventListener('click', function(e){
		if(e.index == 0){
			bottom_label.font = {fontSize:25, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:1,y:1};
		} else if (e.index == 1) {
			bottom_label.font = {fontSize:50, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:1,y:1};
		} else if (e.index == 2) {
			bottom_label.font = {fontSize:75, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:2,y:2};
		} else if (e.index == 3) {
			bottom_label.font = {fontSize:100, fontFamily: 'Arial-BoldMT'};
			top_label.shadowOffset = {x:2,y:2};
		}
	});

	
	popover.add(color_picker);	
	popover.add(size_picker);	
	popover.add(bottom_tf);
	popover.show({view:bottom_label});
	setTimeout(function() 
	{ 
		bottom_tf.focus();	
	},100);
});



var previously_tall = (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT);

function set_dimensions(initial){
	var currently_tall = (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT);
	
	if(currently_tall){
		if(previously_tall && !initial){
			previously_tall = (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT);
			return;
		}
		previously_tall = (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT);
		
		top_label.width = 750;
		bottom_label.width = 750;

//		if(tall){
//			image.width = 768;
//			image.height = 768 * image_scale;
//		}else {
			imageView.height = 924;
			imageView.width = 924 * image_scale;
//		}
		imageView.image = imageView.image;


	} else {
		if(!previously_tall && !initial){
			previously_tall = (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT);
			return;
		}
		previously_tall = (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT);

		top_label.width = 1000;
		bottom_label.width = 1000;

//		if(tall){
//			image.width = 911;
//			image.height = 911 * image_scale;
//		}else {
			imageView.height = 768;
			imageView.width = 768 * image_scale;
//		}
		imageView.image = imageView.image;

	}

}


set_dimensions(true);

Titanium.Gesture.addEventListener('orientationchange', function(e) {
	set_dimensions(false);
});
