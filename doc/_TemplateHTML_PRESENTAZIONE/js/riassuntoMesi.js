
$('.riassuntoMesiSection').on('click', function () {
	if ($(this).find('.toggleRight').hasClass('active')) {
		$('.toggleRight').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight').removeClass('deactive').addClass('active');
	}
	$('.riassuntoMesi ul').slideToggle();
});