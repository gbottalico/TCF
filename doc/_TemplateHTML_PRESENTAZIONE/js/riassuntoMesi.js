$('.attivitaTable').hide();
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
	$('.attivitaTable').fadeIn().show();
});
$('.backToMounth').on('click', function () {
	if ($('.riassuntoMesiSection').find('.toggleRight').hasClass('active')) {
		$('.toggleRight').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight').removeClass('deactive').addClass('active');
	}
	$('.riassuntoMesi ul').slideToggle();
	var mese = $(this).find('.mese');
	var meseselected = '';
	$('.riassuntoMesiSection p').text(meseselected);
	$('.attivitaTable').hide();
});
$('.closeGestioneAttivita').on('click', function () {
	if ($('.riassuntoMesiSection').find('.toggleRight').hasClass('active')) {
		$('.toggleRight').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight').removeClass('deactive').addClass('active');
	}
	$('.riassuntoMesi ul').slideToggle();
	var mese = $(this).find('.mese');
	var meseselected = '';
	$('.riassuntoMesiSection p').text(meseselected);
	$('.attivitaTable').hide();
});