var now = new Date();
var today = now.getFullYear();
$('.date').val(today);
$('.previusYear').hide();
$('.date').on('click', function() {
	$(this).parent().find('.previusYear').slideToggle();
	$(this).parent().find('i').toggleClass('active');
});
$('.previusYear li').on('click', function() {
	$(this).parent().parent().find('.date').val(this.innerText);
	$(this).parent().parent().find('.previusYear').slideToggle();
	$(this).parent().parent().find('i').toggleClass('active');
});