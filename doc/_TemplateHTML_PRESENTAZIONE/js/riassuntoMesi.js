
$('.riassuntoMesiSection').on('click', function () {
	if ($(this).find('.toggleRight').hasClass('active')) {
		$('.toggleRight').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight').removeClass('deactive').addClass('active');
	}
	$('.riassuntoMesi ul').slideToggle();
});
$('.riassuntoMesi ul li').on('click', function () {
	if ($('.riassuntoMesiSection').find('.toggleRight').hasClass('active')) {
		$('.toggleRight').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight').removeClass('deactive').addClass('active');
	}
	$('.riassuntoMesi ul').slideToggle();
	var mese = $(this).find('.mese');
	var meseselected = mese[0].innerText;
	$('.riassuntoMesiSection p').text(meseselected);
});