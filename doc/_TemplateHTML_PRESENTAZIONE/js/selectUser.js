var allTask = [];
$('.selectUserBtn').on('click', function() {
	$('.selectUser').slideUp().fadeOut().hide('slow');
	$('.userSelected').fadeIn().show('slow');
	$('.riassuntoAnni').fadeIn().show('slow');
	$('.riassuntoMesi').fadeIn().show('slow');
	$('.addMese').fadeIn().show('slow');
	var icon = $(this).find('i');
	var name = $(this).find('h3');
	$('.elementListSecond').val(firstTask);
	var text = name[0].innerText;
	var type = icon[0].outerHTML;
	$('.userSelectedSection').find('h1').text(text)
	$('.userSelectedIcon').find('i').replaceWith(type);
});
