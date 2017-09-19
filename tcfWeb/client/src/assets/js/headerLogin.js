$('.listMenu').addClass('deactive').css('display', 'none');
$('.listMenuControl').on('click', function() {
	if ($('.listMenu').hasClass('deactive')) {
		$('.listMenu').removeClass('deactive').addClass('active');
		$('.listMenu').fadeTo( "slow", 1 ).css('display', 'block');
	} else if ($('.listMenu').hasClass('active')) {
		$('.listMenu').removeClass('active').addClass('deactive');
		$('.listMenu').fadeTo( "slow", 0 ).css('display', 'none');
	}
});