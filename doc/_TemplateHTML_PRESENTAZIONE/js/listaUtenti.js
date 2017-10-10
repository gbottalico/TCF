
$('.aggiungiUtenteContainer').hide();
$('.chiudi').hide();
$('.gestioneClientiAssociabili').hide();
$('.listaClientiAssociabili').hide();
$('.closePanelClienteBtn').hide();
$('.userCustomTitle').on('click', function () {
	if ($(this).find('.toggleRight').hasClass('active')) {
		$('.toggleRight.userListRemote').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight.userListRemote').removeClass('deactive').addClass('active');
	}
	$('.listaUtenti ul').slideToggle();
});
$('.aggiungiUtente .aggiungi').on('click', function () {
	if ($('.userCustomTitle').find('.toggleRight').hasClass('active')) {
		$('.toggleRight.userListRemote').removeClass('active').addClass('deactive');
		$('.listaUtenti ul').slideToggle();
		$('.aggiungiUtenteContainer').slideToggle();
		$('.aggiungi').hide();
		$('.chiudi').fadeIn().show();
	} else {
		$('.aggiungiUtenteContainer').slideToggle();
		$('.aggiungi').hide();
		$('.chiudi').fadeIn().show();
	}
});
$('.aggiungiUtente .chiudi').on('click', function () {
	$('.chiudi').hide();
	$('.aggiungi').fadeIn().show();
	$('.aggiungiUtenteContainer').slideToggle();
	if ($('.toggleRight.userListRemote').hasClass('deactive')) {
		$('.toggleRight.userListRemote').removeClass('deactive').addClass('active');
		$('.listaUtenti ul').slideToggle();
	} 
});
$('.aggiungiUtenteTitle').on('click', function () {
	if ($(this).find('.toggleRight').hasClass('active')) {
		$('.toggleRight.utenteAdd').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight.utenteAdd').removeClass('deactive').addClass('active');
	}
	$('.aggiungiUtenteBodyContainer').slideToggle();
});
$('.addClienteBtn').on('click', function (){
	$('.gestioneClientiAssociabili').slideToggle();
	$('.listaClientiAssociabili').slideToggle();
	$(this).hide();
	$('.closePanelClienteBtn').fadeIn().show();
});
$('.closePanelClienteBtn').on('click', function (){
	$('.gestioneClientiAssociabili').slideToggle();
	$('.listaClientiAssociabili').slideToggle();
	$(this).hide();
	$('.addClienteBtn').fadeIn().show();
});
$('.clientiAssociabiliCustomTitle').on('click', function () {
	if ($(this).find('.toggleRight').hasClass('active')) {
		$('.toggleRight.gestioneClienteAss').removeClass('active').addClass('deactive');
	} else {
		$('.toggleRight.gestioneClienteAss').removeClass('deactive').addClass('active');
	}
	$('.listaClientiAssociabili ul').slideToggle();
});
$('.salvaCliente').on('click', function () {
	$('.chiudi').hide();
	$('.aggiungi').fadeIn().show();
	$('.aggiungiUtenteContainer').slideToggle();
});