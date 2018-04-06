$(document).ready(function () {

    setTimeout(function(){
        // fetchdata();
        getApi();
    	}, 100);

$('#donate-form').on('submit',function(e) { 
 window.open('e', 'name'); 

});
	// fetchdata();
	// console.log(getApi().query.results.channel.item.condition.temp);
});

function getdata(){
	var xhr = new XMLHttpRequest();

		xhr.open("GET", "http://ip-api.com/json", false);
		xhr.send();
		
		return JSON.parse(xhr.response); //city details

}

function getApi(){ console.log('here');
	var xhr = new XMLHttpRequest();
		var query = "https://query.yahooapis.com/v1/public/yql?q=";
		var unite = 'c';
		var uri = query+"select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+getdata().city+"')and u='"+unite+"' &format=json ";
console.log(uri);
		xhr.open("GET", uri, false);
		xhr.send();
		// console.log(xhr.response);
		var data = JSON.parse(xhr.response);


		var array = $.map(data, function(value, index) {
    		return [value];
		});

	for (var i = 0; i < array.length; i++) {
		console.log(array[i]);
	}

    var condition = data.query.results.channel.item.condition;
    var hr = (new Date()).getHours();
	    if(hr <= '19' && hr >= '3'){
	    	var time = 'd';
		}else{
	    	var time = 'n';
		}

    $('#current .location').text(getdata().city);
	$('#current .temp').text(condition.temp);
	$('#current .conditions').text(condition.text);
	$('#current .date').text(data.query.results.channel.item.forecast[0].day+" "+data.query.results.channel.item.forecast[0].date);
	$('.humid').text("humidity: "+data.query.results.channel.atmosphere.humidity+"%");
	$('.wind').text("Wind: "+data.query.results.channel.wind.speed+" km/h");

	$('.container1 .day').text(data.query.results.channel.item.forecast[1].day);
	$('.container1 .conditions').text(data.query.results.channel.item.forecast[1].text);
	$('.container1 .high').text(data.query.results.channel.item.forecast[1].high);
	$('.container1 .low').text(data.query.results.channel.item.forecast[1].low);

	$('.line').addClass('vl');

	$('.container2 .day').text(data.query.results.channel.item.forecast[2].day);
	$('.container2 .conditions').text(data.query.results.channel.item.forecast[2].text);
	$('.container2 .high').text(data.query.results.channel.item.forecast[2].high);
	$('.container2 .low').text(data.query.results.channel.item.forecast[2].low);


    $("#img").attr("src",'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/'+condition.code+time+'.png');

console.log(data.query.results.channel.item.forecast[1].day);

}

// function fetchdata(){
// 	//convert getdata() obj to array

// 	var array = $.map(getdata(), function(value, index) {
//     		return [value];
// 		});

// 	for (var i = 0; i < array.length; i++) {
// 		console.log(array[i]);
// 	}

//     var condition = getApi().query.results.channel.item.condition;
//     var hr = (new Date()).getHours();
//     console.log(hr);
//     if(hr <= '19' && hr >= '3'){
//     	var time = 'd';
// 	}else{
//     	var time = 'n';
// 	}

//         $('#current .location').text(getdata().city);
// 	$('#current .temp').text(condition.temp);
// 	$('#current .conditions').text(condition.text);
// 	$('#current .date').text(getApi().query.results.channel.item.forecast[0].day+" "+getApi().query.results.channel.item.forecast[0].date);


//     $("#img").attr("src",'https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/'+condition.code+time+'.png');

// console.log('https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/'+condition.code+time+'.png');
// }


