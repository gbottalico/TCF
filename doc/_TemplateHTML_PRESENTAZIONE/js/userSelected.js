$('.changeUserBtn').on('click', function() {
	$('.userSelected').slideDown().fadeOut().hide('slow');
	$('.riassuntoAnni').slideDown().fadeOut().hide('slow');
	$('.riassuntoMesi').slideDown().fadeOut().hide('slow');
	$('.attivitaTable').slideDown().fadeOut().hide('slow');
	$('.addMese').slideDown().fadeOut().hide('slow');
	$('.selectUser').fadeIn().show('slow');
});