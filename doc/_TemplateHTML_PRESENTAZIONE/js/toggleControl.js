$('.sidebarToggle').on('click', function() {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active').hide().fadeIn().addClass('deactive');
		$('.leftSidebar').removeClass('active').hide().fadeIn().addClass('deactive');
		$('.rightSidebar').removeClass('deactive').hide().fadeIn().addClass('active');
	} else if ($(this).hasClass('deactive')) {
		$(this).removeClass('deactive').hide().fadeIn().addClass('active');
		$('.leftSidebar').removeClass('deactive').hide().fadeIn().addClass('active');
		$('.rightSidebar').removeClass('active').hide().fadeIn().addClass('deactive');
	} 
});