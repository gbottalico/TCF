$('.selectUserBtn').on('click', function() {
	console.log(this);
	$('.selectUser').slideUp().fadeOut().hide('slow');
	$('.userSelected').fadeIn().show('slow');
});