Titanium.App.Properties.setString("saved", "");

function login(){
	
	var login_view = Titanium.UI.createWindow({  
	    url:'login.js'
	});
	login_view.open();

}


/*var madeby_label = Titanium.UI.createLabel({
	touchEnabled: true,
	bottom: 0,
	height: 20,
	width: 100,
	textAlign: 'center',
	left: 'auto',
	font:{fontSize:18},
	color: '#000',
	backgroundColor:'#FFF',
    shadowOffset:{x:1,y:1},
    opacity: 0.6,
	text: 'made with memefy'
});
Titanium.UI.currentWindow.add(madeby_label);
madeby_label.hide();*/


var bb1 = Titanium.UI.createButtonBar({
    labels:['Upload'],//, 'Settings', 'Help'],
//	labels: buttonObjects,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	borderWidth: 0,
	width: 'auto',
    backgroundColor:'#336699'
});


function handleAfterSentRouting(response){
	Ti.API.info('title  :' + response);

	var data = JSON.parse(response);
	Titanium.UI.createAlertDialog({
		title:'Image Saved',
		message:'Your image has been saved to your photo gallery and uploaded to\n\nhttp://memefy.com/'+data.id, 
		buttonNames:['Close']
	}).show();
	
	// store the share link for later sharing
	Titanium.App.Properties.setString("share_url", data.id);

	bb1.fireEvent('click', {index:0});
}


/*var buttonObjects = [
    //{image:'../images/KS_nav_ui.png', width:60},
];*/


Titanium.UI.currentWindow.rightNavButton = bb1;

bb1.addEventListener('click', function(e){
	var uname = Titanium.App.Properties.getString("username");
	
	if(typeof(catpopover) != 'undefined'){
		catpopover.hide();
	}

	if(uname == null || uname == ''){
	
		var choices = Titanium.UI.createAlertDialog({
			title:'Account required',
			message:'To upload your images,\nyou need an account.\n\nWould you like to\nlogin or register now?', 
			buttonNames:['Yes', 'Not now']
		});
		choices.show();
		choices.addEventListener('click', function(ev){
			if(ev.index == 0){
				login();
			} else {
				choices.hide();
			}
		});

		return;
	}
 
	// save button
	if(e.index == 0){
	
        if(Titanium.App.Properties.getString("saved") != "saved") {

			if(top_label_text == 'Tap to change' || bottom_label_text == 'Tap to change'){
				Titanium.UI.createAlertDialog({title:'Warning',message:'Please edit the text before uploading', buttonNames:['Close']}).show();
				return;
			}

			var ind=Titanium.UI.createProgressBar({
				width:200,
				height:50,
				min:0,
				max:1,
				value:0,
				style:Titanium.UI.iPhone.ProgressBarStyle.BAR,
				top:10,
				message:'Uploading Image',
				font:{fontSize:12, fontWeight:'bold'},
				color:'#888'
			});

			var save_pop = Ti.UI.iPad.createPopover({
				width:250, 
				height:100,
				title: "Uploading"
			});	
			save_pop.add(ind);
			ind.show();
			save_pop.show({view:bb1});


			//madeby_label.show();
			var screenshot = Titanium.UI.currentWindow.toImage();
			//madeby_label.hide();

			Titanium.Media.saveToPhotoGallery(screenshot);
			f1 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, screenshot);
			i1 = f1.read();
			xhr = Titanium.Network.createHTTPClient();
			xhr.onsendstream = function(e)
			{
				ind.value = e.progress ;
				Titanium.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
			};
			xhr.open('POST','http://memefy.com/upload.php', false); // false makes it synchronous
			xhr.onload = function() { 
				handleAfterSentRouting(this.responseText); 
				save_pop.hide();
				Titanium.Analytics.featureEvent('app.memefy.upload');
			};
			xhr.send({
				meme_image: screenshot,
				username: Titanium.App.Properties.getString("username"),
				meme: Titanium.App.Properties.getString("meme_category_id"),
				portrait: (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT),
				top_text: top_label_text,
				bottom_text: bottom_label_text
			}); // media1 is the field the file information is in when you upload    		

//	        tabGroup.setActiveTab(2);
			Titanium.App.Properties.setString("content", top_label_text + ", " + bottom_label_text);
			Titanium.App.Properties.setString("saved", "saved");
			
			bb1.labels = ['Share'];//, 'Settings', 'Help'];
    
		} else {
	
			var data = [
				{
					title:"via Twitter", 
					url:'http://mobile.twitter.com/home?status=' + 
						Titanium.App.Properties.getString("content") + 
						" http://memefy.com/" + 
						Titanium.App.Properties.getString("share_url") + 
						" via @memefy"
				},
				{
					title:"via Facebook", 
					url:'http://www.facebook.com/sharer.php?u=http://memefy.com/' + Titanium.App.Properties.getString("share_url")
				},
				{
					title:"Post to Reddit", 
					url:'http://reddit.com/submit?url=http://memefy.com/' + Titanium.App.Properties.getString("share_url") + '&title=' + Titanium.App.Properties.getString("content"
				}
			];

			var share_table = Titanium.UI.createTableView({data:data});

			var share_pop = Ti.UI.iPad.createPopover({
				width:250, 
				height:100,
				title: "Share"
			});	
			share_pop.show({view:bb1});
			share_pop.add(share_table);

			share_table.addEventListener('click', function(e){
				var close = Ti.UI.createButton({
					title: 'Close',
					right: 75
				});
				 
				close.addEventListener('click', function() {
					share_window.close();
				});
				
				var share_window = Titanium.UI.createWindow({
					rightNavButton: close,
					title: 'Share ' + e.rowData.title
				});
				share_window.open({
					modal:true,
				    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
				    modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
				});
				var webview = Titanium.UI.createWebView({
				    url: e.rowData.url,
				    title: 'Share on Facebook'
				});
				share_window.add(webview);				
			});
    
        } 
    } /*else if(e.index == 1){
		var settings_pop = Ti.UI.iPad.createPopover({
			url: 'share.js',
			width:250, 
			height:100,
			title: "Settings"
		});	
		settings_pop.show({view:bb1});
    
    } */
 
});