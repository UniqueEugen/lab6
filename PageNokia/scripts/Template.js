var result = decodeURI(location.search.substring(1));
$('#id').html(result);
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
	$('#sams').on('click', function () {
		$('#id').html(function (index, history) {
			return (history + '<li>' + 'Запрос переадресации на страницу Samsung.html' + '</li>')
		});
		url = "file:///E:/САиПИС(2 сем)/lab6/PageSamsung/html/lab6Samsung.html?" + encodeURI($('#id').html());
		$(location).attr('href', url);
	})
	$('#apple').on('click', function () {
		$('#id').html(function (index, history) {
			return (history + '<li>' + 'Запрос переадресации на страницу Apple.html' + '</li>')
		});
		url = "file:///E:/САиПИС(2 сем)/lab6/PageApple/html/lab6Apple.html?" + encodeURI($('#id').html());
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