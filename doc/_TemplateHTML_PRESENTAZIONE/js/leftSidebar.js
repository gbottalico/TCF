$('.btnConsuntivazione').addClass('active');
$('.subSection').hide();

$('.consuntivazioneContainer').show();
$('.amministrazioneContainer').hide();
$('.reportisticaContainer').hide();

$('.btnConsuntivazione').on('click', function() {
	if ($('.navigation').hasClass('active')) {
		$('.navigation').removeClass('active');
	}
	$(this).addClass('active');
	$('.consuntivazione').fadeIn().show();
	$('.consuntivazioneContainer').fadeIn().show();
	$('.amministrazione').hide();
	$('.amministrazioneContainer').hide();
	$('.reportistica').hide();
	$('.reportisticaContainer').hide();

	$('.subSection').slideUp();
});
$('.btnAmministrazione').on('click', function() {
	if ($('.navigation').hasClass('active')) {
		$('.navigation').removeClass('active');
	}
	$(this).addClass('active');
	$('.consuntivazione').hide();
	$('.consuntivazioneContainer').hide();
	$('.amministrazione').fadeIn().show();
	$('.amministrazioneContainer').fadeIn().show();
	$('.reportistica').hide();
	$('.reportisticaContainer').hide();

	$('.subSection').slideDown();

	if ($('.clienti').hasClass('active')) {
		$('.containerClienti').fadeIn().show();
		$('.containerUtenti').hide();
		$('.containerAttivita').hide();
		$('.containerCommesseClienti').hide();
		$('.containerCommesseFincons').hide();
		$('.containerAmbiti').hide();
	} else if ($('.utenti').hasClass('active')) {
		$('.containerClienti').hide();
		$('.containerUtenti').fadeIn().show();
		$('.containerAttivita').hide();
		$('.containerCommesseClienti').hide();
		$('.containerCommesseFincons').hide();
		$('.containerAmbiti').hide();
	} else if ($('.attivita').hasClass('active')) {
		$('.containerClienti').hide();
		$('.containerUtenti').hide();
		$('.containerAttivita').fadeIn().show();
		$('.containerCommesseClienti').hide();
		$('.containerCommesseFincons').hide();
		$('.containerAmbiti').hide();
	} else if ($('.commesseClienti').hasClass('active')) {
		$('.containerClienti').hide();
		$('.containerUtenti').hide();
		$('.containerAttivita').hide();
		$('.containerCommesseClienti').fadeIn().show();
		$('.containerCommesseFincons').hide();
		$('.containerAmbiti').hide();
	} else if ($('.commesseFincons').hasClass('active')) {
		$('.containerClienti').hide();
		$('.containerUtenti').hide();
		$('.containerAttivita').hide();
		$('.containerCommesseClienti').hide();
		$('.containerCommesseFincons').fadeIn().show();
		$('.containerAmbiti').hide();
	} else if ($('.ambiti').hasClass('active')) {
		$('.containerClienti').hide();
		$('.containerUtenti').hide();
		$('.containerAttivita').hide();
		$('.containerCommesseClienti').hide();
		$('.containerCommesseFincons').hide();
		$('.containerAmbiti').fadeIn().show();
	}
});
$('.btnReportistica').on('click', function() {
	if ($('.navigation').hasClass('active')) {
		$('.navigation').removeClass('active');
	}
	$(this).addClass('active');
	$('.consuntivazione').hide();
	$('.consuntivazioneContainer').hide();
	$('.amministrazione').hide();
	$('.amministrazioneContainer').hide();
	$('.reportistica').fadeIn().show();
	$('.reportisticaContainer').fadeIn().show();

	$('.subSection').slideUp();
});
$('.subSection li').on('click', function() {
	$('.subSection li').removeClass('active').addClass('deactive');
	$(this).addClass('active');
});