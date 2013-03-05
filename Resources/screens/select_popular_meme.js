Titanium.UI.setBackgroundColor('#3c4049');
Titanium.include('../helpers/strip_tags.js');  
Titanium.include('../helpers/imageload.js');


var since = Titanium.App.Properties.getString("lastupdate");
var url = 'http://memefy.com/meme/listall/' + since;
var site_url = 'http://memefy.com/memes/';


function logout(){

	var login = Titanium.UI.createWindow({  
	    url:'login.js'
	});
	login.open();

}


var logout_btn = Ti.UI.createButton({
	title: "Logout"
});	
var uname = Titanium.App.Properties.getString("username");
Titanium.API.info(uname);
if(uname == null || uname == ''){
	logout_btn.title = "Login";
}
logout_btn.addEventListener('click', function() {
	logout();
});

Titanium.UI.currentWindow.leftNavButton = logout_btn;





/*var search = Titanium.UI.createSearchBar({
    barColor:'#000', 
    showCancel:false,
    height:43,
    top:0,
});
Titanium.UI.currentWindow.add(search);
*/


//
// create base UI tab and root window
//
var item_title_label = Ti.UI.createLabel({
	text: '',
	color: '#fff',
	textAlign:'center',
	left:10,
	right:10,
	top:250,
	height:45,
	font:{fontFamily:'Helvetica Neue',fontWeight:'bold',fontSize:18}
	});
Titanium.UI.currentWindow.add(item_title_label);

var sub_label = Ti.UI.createLabel({
	text: '',
	color: '#fff',
	textAlign:'center',
	left:10,
	right:10,
	top:280,
	height:45,
	font:{fontFamily:'Helvetica Neue',fontWeight:'bold',fontSize:14}
	});
Titanium.UI.currentWindow.add(sub_label);

var search = Titanium.UI.createSearchBar({
    barColor:'#385292', 
    showCancel:false
});

search.addEventListener('change', function(e)
{
   e.value = e.value; // search string as user types
});
search.addEventListener('return', function(e)
{
   search.blur();
});
search.addEventListener('cancel', function(e)
{
   search.blur();
});



function displayItems(){//itemList){

//	Titanium.API.info('><>< ' + itemList);

//	for (var c = 0; c < itemList.length; c++){
		// Ti.API.info('item title :' + itemList.item(c).getElementsByTagName("title").item(0).text);
		// Ti.API.info('item description :' + itemList.item(c).getElementsByTagName("description").item(0).text);
		// Ti.API.info('item enclosure url :' + itemList.item(c).getElementsByTagName("enclosure").item(0).getAttribute("url"));

	
	var db = Ti.Database.open('memefy_db');

	var resultSet = db.execute('SELECT * FROM memes ORDER BY title ASC');
	
	var userFound = false;
	var syncdata = [];
	var c = 0;
	while (resultSet.isValidRow()){
	    
	    var id = parseInt(resultSet.fieldByName('id'), 10);
	    var title = resultSet.fieldByName('title');
	    var main_image = resultSet.fieldByName('image');
	    var image_url = resultSet.fieldByName('image');
	    var body = resultSet.fieldByName('description');
		syncdata[c] = {};
		syncdata[c].id = id;
		syncdata[c].title = title;
		syncdata[c].main_image = main_image;
		syncdata[c].image_url = image_url;
		syncdata[c].body = body;

		sub_label.text = 'loading ' + title;
	    

		if(title == 'Custom'){
			Titanium.API.info('custom...');
		    resultSet.next();
		    c++;
			continue;
		}
//		Titanium.API.info('Meme loading: ' + title);
		

		// Create a table row for this item
		var row = Ti.UI.createTableViewRow({
			height: 110,
			backgroundColor:'#eeeeee',
			selectedBackgroundColor:'#3c4049',
			editable:false
		}); 
//		Titanium.API.info('row creation');

		// Create a label for the title
		var post_title = Ti.UI.createLabel({
			text: title,
			color: '#000',
			textAlign:'left',
			left:120,
			height: 110,
			width:'auto',
			top:'auto',
			font:{fontWeight:'bold',fontSize:24},
			highlightedColor: '#FFF'
		});
		row.add(post_title);
//		Titanium.API.info('title added');
			
		var theimage = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, main_image);
		var item_image = Ti.UI.createImageView({
			image: theimage.read(),
			left:5,
			top:5,
			width:100,
			height:100,
			backgroundColor: '#3c4049'
		});
		row.add(item_image);
//		Titanium.API.info('image added');
			
		// Add some rowData for when it is clicked			
		row.thisID = id;
		row.thisTitle = title;
		row.thisImage = main_image;
		row.thisBody = body;
		row.thisIcon = image_url;
		row.hasChild = true;
		row.filter = title;

		// Add the row to the data
		data[c] = row;
		
//		Titanium.API.info('row created');
		sub_label.text = title + ' loaded';
		c++;				
	    resultSet.next();
	}
	sub_label.text = 'memes loaded';

	
	Titanium.UI.currentWindow.syncMemes(syncdata);
	
	// create the table
	feedTableView = Titanium.UI.createTableView({
		data:data,
		top: 0,
		search: search,
		filterAttribute:'filter'
	});
	
	// Add the tableView to the current window
	Titanium.UI.currentWindow.add(feedTableView);
	
	// Create tableView row event listener
	feedTableView.addEventListener('click', function(e){

		// a feed item was clicked
		Ti.API.info('item index clicked :'+e.index);
		Ti.API.info('title  :'+e.rowData.thisTitle);
		Ti.API.info('image  :'+e.rowData.thisImage);
		// show an alert
//		Ti.UI.createAlertDialog({title:e.rowData.thisTitle, message:e.rowData.thisBody}).show();
		
		item_title_label.text = strip_tags(e.rowData.thisTitle);
		// etc ...	
		// now do some cool stuff! :)
		// like add an audio player, open a new window, etc..

		var win = Titanium.UI.createWindow({
			url: 'create_meme.js',
			title: e.rowData.thisTitle
		});

		Titanium.App.Properties.setString("meme_category_id", e.rowData.thisID);
		Titanium.App.Properties.setString("meme_title", e.rowData.thisTitle);
		Titanium.App.Properties.setString("meme_image", e.rowData.thisImage);


		item_title_label.text = 'Loaded';
		

		Titanium.UI.currentTab.open(win,{animated:true});//.open(win,{animated:true});

	});
}




function downloadMemes(url){

	sub_label.text = 'downloading meme images';

	data = [];
//	Ti.API.info('>>>> loading data from '+url);
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET',url);
	xhr.onload = function()
	{
			
//		Ti.API.info('>>> got the feed! ... ');
		
		var db = Ti.Database.open('memefy_db');
		db.execute('CREATE TABLE IF NOT EXISTS memes (id INTEGER PRIMARY KEY, title STRING, image STRING, description STRING)');

	
		var itemList = eval('('+this.responseText+')');
		var loaded = 0;
		
		for (var c = 0; c < itemList.length; c++){

			
			var thisItem = itemList[c];
			var title = thisItem.title;
			var id = thisItem.id;
			var main_image = thisItem.image;
			var image_url = thisItem.thumbnail;
			var description = thisItem.description;

			// store in local database
			db.execute("INSERT OR IGNORE INTO memes (`id`, `title`, `image`, `description`) VALUES ('"+id+"', '"+title+"', '"+main_image+"', '"+description+"')");

			get_remote_file(
				main_image,
				site_url,
				function(fileobj){
//					Ti.API.info(fileobj);
//					Titanium.API.info('done');
					loaded++;
					if(loaded >= itemList.length){
						displayItems();
					}
					return;
				}, 
			 	function(progress){
					Ti.API.info(progress);
				},
				false
			);

//			Titanium.API.info('storing ' + title);
		}
		
		db.close();

//		displayItems();
		
	};
	
	item_title_label.text = 'LOADING MEMES FROM MEMEFY.COM';
	xhr.send();	
}




downloadMemes(url);
