function reopen()
{
  var window = Ti.UI.createWindow({
	url: 'screens/myapp.js'
  });
  window.open();
}
reopen();
 
Ti.App.addEventListener('reload',reopen);