var now = new Date();
var today = now.getFullYear();

$('.elementList').val(today);
$('.allList').hide();

$('.elementList').on('click', function() {
	$(this).parent().find('.allList').slideToggle();
	$(this).parent().find('i').toggleClass('active');
});
$('.elementListSecond').on('click', function() {
	$(this).parent().find('.allListSecond').slideToggle();
	$(this).parent().find('i').toggleClass('active');
});
$('.allList li').on('click', function() {
	$(this).parent().parent().find('.elementList').val(this.innerText);
	$(this).parent().parent().find('.allList').slideToggle();
	$(this).parent().parent().find('i').toggleClass('active');
});
