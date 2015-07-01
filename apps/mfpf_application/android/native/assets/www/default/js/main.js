
/* JavaScript content from js/main.js in folder common */
var busyIndicator = null;

function wlCommonInit(){
	busyIndicator = new WL.BusyIndicator();
	loadFeeds();
}

function loadFeeds(){
	busyIndicator.show();
	
	/*
	 * The REST API works with all adapters and external resources, and is supported on the following hybrid environments: 
	 * iOS, Android, Windows Phone 8, Windows 8. 
	 * If your application supports other hybrid environments, see the tutorial for MobileFirst 6.3.
	 */
	var resourceRequest = new WLResourceRequest("/adapters/RSSReader/getFeedsFiltered", WLResourceRequest.GET);
	resourceRequest.setQueryParameter("params", "['technology']");
	resourceRequest.send().then(
			loadFeedsSuccess,
			loadFeedsFailure
	);
}


function loadFeedsSuccess(result){
	WL.Logger.debug("Feed retrieve success");
	busyIndicator.hide();
	if (result.responseJSON.Items.length>0) 
		displayFeeds(result.responseJSON.Items);
	else 
		loadFeedsFailure();
}

function loadFeedsFailure(result){
	WL.Logger.error("Feed retrieve failure");
	busyIndicator.hide();
	WL.SimpleDialog.show("Engadget Reader", "Service not available. Try again later.", 
			[{
				text : 'Reload',
				handler : WL.Client.reloadApp 
			},
			{
				text: 'Close',
				handler : function() {}
			}]
		);
}

function displayFeeds(items){
	var ul = $('#itemsList');
	for (var i = 0; i < items.length; i++) {
		var li = $('<li/>').text(items[i].title);
		var pubDate = $('<div/>', {
			'class': 'pubDate'
		}).text(items[i].pubDate);

		li.append(pubDate);
		
		ul.append(li);
	}
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}