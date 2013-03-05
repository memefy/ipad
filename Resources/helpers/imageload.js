function get_remote_file(filename, url, fn_end, fn_progress, boolAlwaysload){
    var file_obj = {
        file: filename,
        url: url,
        path: null
    };
 
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
    if (file.exists() && !boolAlwaysload){
        file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
        fn_end(file_obj);
    }
    else{
        if (Titanium.Network.online){
            var c = Titanium.Network.createHTTPClient();
 
            c.setTimeout(10000);
            c.onload = function()
            {
 
                if (c.status == 200){
                    Titanium.API.info('finished downloading ' + filename + ' from ' + url);
 
                    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
                    f.write(this.responseData);
                    file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
					
                }
 
                else{
                    file_obj.error = 'file not found';
                    // to set some errors codes
                }
                fn_end(file_obj);
 
            };
            c.ondatastream = function(e)
            {
                Titanium.API.info('progress ' + filename + ':' + e.progress);
//                if (fn_progress) fn_progress(e.progress);
            };
            c.error = function(e)
            {
                Titanium.API.info('error ' + e.error);
                file_obj.error = e.error;
//                fn_end(file_obj);
            };
            c.open('GET', url + filename);
            c.send();
        }
        else{
            if (file.exists() && boolAlwaysload){
                file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
//                fn_end(file_obj);
            }
            else
            {
                file_obj.error = 'no internet';
//                fn_end(file_obj);
            }
        }
    }
};