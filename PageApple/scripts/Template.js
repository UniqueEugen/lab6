var result = decodeURI(location.search.substring(1));
console.log(result);
if (result != "") {
	$('#id').html(result);
}
else {
	$("#id").html("Запросы:");
}
$(document).ready(function () {
	$(document).ajaxError(function () {
		alert("An error occured!");
	});
	$(document).ajaxStop(function () {
		alert("All AJAX requests completed");
	});
	$(document).ajaxStart(function () {
		$("#wait").css("display", "block");
	});
	$(document).ajaxComplete(function () {
		$("#wait").css("display", "none");
	});
	$(document).ajaxSend(function (e, xhr, opt) {
		$("#id").append("<li>Requesting " + opt.url + "</li>");
	});
	$("#json").click(function () {
		
		url = '../JSON/Apple.json';
		$.getJSON(url, function (data) {
			console.log(data.name); // Prints: Harry
			console.log(data.age); // Prints: 14
		}).fail(function (err) {
			console.log("An error has occurred.", err);
		});
	});
	
	/*$("#json").click(function () {
		$("#blockMain").load("../JSON/Apple.json");
	});*/
	//$("#blockMain").load()
	/*$.getJSON("../JSON/Apple.json", function (result) {
		console.log(result);
	})*/
	$('#sams').on('click', function () {
		
		$('#id').html(function (index, history) {
			return (history+'<li>'+ 'Запрос переадресации на страницу Samsung.html'+'</li>')
		});
		console.log($('#id').html());
		url = "file:///E:/САиПИС(2 сем)/lab6/PageSamsung/html/lab6Samsung.html?" + encodeURI($('#id').html());
		console.log(url);
		$(location).attr('href', url);
	})
	$('#nok').on('click', function () {
		$('#id').html(function (index, history) {
			return (history + '<li>' + 'Запрос переадресации на страницу Nokia.html' + '</li>')
		});
		url = "file:///E:/САиПИС(2 сем)/lab6/PageNokia/html/lab6Nokia.html?" + encodeURI($('#id').html());
		$(location).attr('href', url);
	})
	$('#son').on('click', function () {
		
		$('#id').html(function (index, history) {
			return (history + '<li>' + 'Запрос переадресации на страницу Sony.html' + '</li>')
		});
		url = "file:///E:/САиПИС(2 сем)/lab6/PageSony/html/lab6Sony.html?" + encodeURI($('#id').html());
		$(location).attr('href', url);
	})
})