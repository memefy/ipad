var win = Titanium.UI.currentWindow;
win.backgroundColor = '#3c4049';



var db = Ti.Database.open('memefy_db');
db.execute('DELETE FROM mydetails');
db.close();


var props = Titanium.App.Properties.listProperties();
for (var c=0;c<props.length;c++)
{
    Titanium.App.Properties.removeProperty(props[c]);
}



var login_label = Titanium.UI.createLabel({
	text: 'Login to your account',
	font: {fontSize: 24},
	color: '#FFF',
	top: 20,
	width: 450,
	height: 48,
	textAlign: 'center'
});
win.add(login_label);

var username = Titanium.UI.createTextField({
	color:'#336699',
	top:70,
	width:300,
	height:40,
	hintText:'Username',
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
win.add(username);

var password = Titanium.UI.createTextField({
	color:'#336699',
	top:120,
	width:300,
	height:40,
	hintText:'Password',
	passwordMask:true,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_GO,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
win.add(password);
username.addEventListener('return', function(){password.focus();});

var loginBtn = Titanium.UI.createButton({
	title:'Login',
	top:170,
	width:110,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(loginBtn);
password.addEventListener('return', function(){loginBtn.fireEvent('click');});




var or_label = Titanium.UI.createLabel({
	text: '- OR -',
	font: {fontSize: 18},
	color: '#FFF',
	top: 220,
	width: 300,
	height: 48,
	textAlign: 'center'
});
win.add(or_label);


var register_label = Titanium.UI.createLabel({
	text: 'Create an account',
	font: {fontSize: 24},
	color: '#FFF',
	top: 270,
	width: 450,
	height: 48,
	textAlign: 'center'
});
win.add(register_label);


var reg_username = Titanium.UI.createTextField({
	color:'#336699',
	top:320,
	width:300,
	height:40,
	hintText:'Username',
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
win.add(reg_username);

var reg_password = Titanium.UI.createTextField({
	color:'#336699',
	top:370,
	width:300,
	height:40,
	hintText:'Password',
	passwordMask:true,
	autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_GO,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocorrect:false
});
win.add(reg_password);
reg_username.addEventListener('return', function(){reg_password.focus();});

var registerBtn = Titanium.UI.createButton({
	title:'Register',
	top:420,
	width:110,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(registerBtn);
reg_password.addEventListener('return', function(){registerBtn.fireEvent('click');});



var agree_label = Titanium.UI.createLabel({
	text: 'By registering you give permission for user registration and\ncreated images to be uploaded and stored on memefy.com\n\nYou also agree that you have permission to upload\nand share any images used in custom memes\n\nFor more information, please visit memefy.com/faq',
	font: {fontSize: 12},
	color: '#FFF',
	top: 470,
	width: 400,
	height: 'auto',
	textAlign: 'center'
});
win.add(agree_label);



var cancelBtn = Titanium.UI.createButton({
	title:'Not now',
	bottom:10,
	width:110,
	height:35,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(cancelBtn);



// USER LOGIN
/*
Titanium.UI.setBackgroundColor('#fff');  
var logintabGroup = Titanium.UI.createTabGroup();  
  
var login = Titanium.UI.createWindow({  
    title:'User Authentication',  
    tabBarHidden:true,  
    url:'screens/login.js'  
});  
  
var loginTab = Titanium.UI.createTab({  
    title:"Login",  
    window:login  
});  
  
logintabGroup.addTab(loginTab);  
*/

function try_login(){
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
	
	resultSet.close();
	 
	if (userFound){
	
		db.close();
	
		logintabGroup.close();
		tabGroup.open();
	
	} else {
	
		// login / register
		logintabGroup.open();

	    Titanium.API.info("user not logged in... asking to login / register");
	//    db.execute('INSERT INTO mydetails (id) VALUES (?)', 12);
		db.close();
	
	}
}





var loginReq = Titanium.Network.createHTTPClient();

loginBtn.addEventListener('click',function(e)
{
	password.blur();
	loginBtn.title = 'please wait...';
	
	if (username.value != '' && password.value != '')
	{
		loginReq.open("POST","http://memefy.com/user/login_via_app");
		var params = {
			username: username.value,
			password: Ti.Utils.md5HexDigest(password.value)
		};
		Titanium.API.info(username.value);
		Titanium.API.info(Ti.Utils.md5HexDigest(password.value));
		loginReq.send(params);
		loginReq.onload = function()
		{
			var json = this.responseText;
			Titanium.API.info(this.responseText);
			var response = JSON.parse(json);
			if (response.success == true)
			{

				//alert("Welcome " + response.username + ". Your email is: " + response.email);
				var db = Ti.Database.open('memefy_db');
				db.execute('DELETE FROM mydetails');
				db.execute('INSERT INTO mydetails (`id`, `username`, `lastupdate`) VALUES (\'' + response.id + '\', \'' + response.username + '\', 0)');
				db.close();
				
				// try the db login again... now that we've put stuff in there
				//Titanium.UI.currentWindow.try_login();
				//try_login();
				Ti.App.fireEvent('reload');

			}
			else
			{
				Titanium.UI.createAlertDialog({
					title: response.title,
					message: response.message, 
					buttonNames:['Close']
				}).show();

				loginBtn.title = 'Login';

			}
		};

	}
	else
	{
		Titanium.UI.createAlertDialog({
			title:'Required fields',
			message:'Username and Password are required', 
			buttonNames:['Close']
		}).show();
	}
});



var registerReq = Titanium.Network.createHTTPClient();

registerBtn.addEventListener('click',function(e)
{
	reg_password.blur();
	registerBtn.title = 'please wait...';

	if ( reg_username.value != '' && reg_password.value != '')
	{
		registerReq.open("POST","http://memefy.com/user/register_via_app");
		var params = {
			username: reg_username.value,
			password: Ti.Utils.md5HexDigest(reg_password.value)
		};

		registerReq.send(params);
		registerReq.onload = function()
		{
			var json = this.responseText;
			Titanium.API.info(this.responseText);
			var response = JSON.parse(json);
			if (response.success == true)
			{
				//alert("Welcome " + response.username + ". Your email is: " + response.email);
				var db = Ti.Database.open('memefy_db');
				
				db.execute('DELETE FROM mydetails');
				db.execute('INSERT INTO mydetails (`id`, `username`, `lastupdate`) VALUES (\'' + response.id + '\', \'' + response.username + '\', 0)');
				db.close();
				
	    
				Titanium.App.Properties.setString("username", response.username);
			    Titanium.App.Properties.setString("lastupdate", 0);

				// try the db login again... now that we've put stuff in there
//				Titanium.UI.currentWindow.try_login();
//				try_login();
				Titanium.Analytics.featureEvent('app.memefy.register');
				Ti.App.fireEvent('reload');
				
			}
			else
			{
				Titanium.UI.createAlertDialog({
					title: response.title,
					message: response.message, 
					buttonNames:['Close']
				}).show();
				
				registerBtn.title = 'Register';
				
			}
		};

	}
	else
	{
		Titanium.UI.createAlertDialog({
			title:'Required fields',
			message:'Username and Password are required', 
			buttonNames:['Close']
		}).show();
	}
});


cancelBtn.addEventListener('click',function(e){
	Ti.App.fireEvent('reload');
});