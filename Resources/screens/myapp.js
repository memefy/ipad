var db = Ti.Database.open('memefy_db');
db.execute('CREATE TABLE IF NOT EXISTS mydetails (id INTEGER, username STRING, lastupdate INTEGER)');

var resultSet = db.execute('SELECT * FROM mydetails LIMIT 1');
 
var userFound = false;
 
while (resultSet.isValidRow()){
    
    var thisNumber = parseInt(resultSet.fieldByName('id'), 10);
    var thisUsername = resultSet.fieldByName('username');
    var thisLastupdate = parseInt(resultSet.fieldByName('lastupdate'), 10);
    
    Titanium.App.Properties.setString("username", thisUsername);
    Titanium.App.Properties.setString("lastupdate", thisLastupdate);
    
    userFound = true;
    resultSet.next();
    
}









var win = Titanium.UI.currentWindow;
win.backgroundColor = '#3c4049';

if(!Ti.Network.online){
	var alertDialog = Titanium.UI.createAlertDialog({
		title: 'WARNING!',
		message: 'Your device is not online so memes can not be loaded. Please connect to a network and try again.',
		buttonNames: ['OK']
	});
	alertDialog.show();
}



				var db = Ti.Database.open('memefy_db');
//				db.execute('DROP TABLE IF EXISTS mydetails');
				db.execute('DROP TABLE IF EXISTS memes');
				db.close();




// LOAD THE VIEWS / DATA

//Titanium.UI.orientation = Titanium.UI.LANDSCAPE_LEFT; //or _RIGHT
var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({
	url: "../screens/select_popular_meme.js",
	title: "Memefy - Popular Memes"
});
//win2.orientationModes = [ Titanium.UI.LANDSCAPE_LEFT ];
var tab1 = Titanium.UI.createTab({  
    icon:'../images/KS_nav_ui.png',
    title:'Popular',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    url:"../screens/custom_meme.js",
    title:'Memefy - Create from gallery',
    backgroundColor:'#3c4049'
});
//win1.orientationModes = [ Titanium.UI.LANDSCAPE_LEFT ];
var tab2 = Titanium.UI.createTab({  
    icon:'../images/KS_nav_views.png',
    title:'Custom',
    window:win2
});

function syncMemes(data){
	win2.memes = data;
}



win1.memes = null;
win2.memes = null;
win1.syncMemes = syncMemes;

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.setActiveTab(0);

Titanium.UI.currentWindow.add(tabGroup);


//login.try_login = try_login;

//try_login();
tabGroup.open();