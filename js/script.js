$(document).ready(function () {

    setTimeout(function(){
        fetchdata();
    	}, 100);

	// fetchdata();
	// console.log(getApi().query.results.channel.item.condition.temp);
});

function getdata(){
	var xhr = new XMLHttpRequest();

		xhr.open("GET", "http://ip-api.com/json", false);
		xhr.send();
		
		return JSON.parse(xhr.response); //city details

}

function getApi(){
	var xhr = new XMLHttpRequest();
		var query = "https://query.yahooapis.com/v1/public/yql?q=";
		var unite = 'c';
		var uri = query+"select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+getdata().city+"')and u='"+unite+"' &format=json ";

		xhr.open("GET", uri, false);
		xhr.send();
		// console.log(xhr.response);
		return JSON.parse(xhr.response);
}

function fetchdata(){
	//convert getdata() obj to array

	var array = $.map(getdata(), function(value, index) {
    		return [value];
		});

	for (var i = 0; i < array.length; i++) {
		console.log(array[i]);
	}

    var condition = getApi().query.results.channel.item.condition;
    var hr = (new Date()).getHours();
    console.log(hr);
    if(hr <= '19' && hr >= '3'){
    	var time = 'd';
	}else{
    	var time = 'n';
	}

        $('#current .location').text(getdata().city);
	$('#current .temp').text(condition.temp);
	$('#current .conditions').text(condition.text);
	$('#current .date').text(getApi().query.results.channel.item.forecast[0].day+" "+getApi().query.results.channel.item.forecast[0].date);


    $("#img").attr("src",'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/'+condition.code+time+'.png');

console.log('https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/'+condition.code+time+'.png');
}


