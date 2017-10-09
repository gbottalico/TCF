(function() {
    var staticPanel = $('.loginStatic');
    var slidingPanel = $('.loginSliding');
    
    var signinBtn = staticPanel.find('.btn.signin');
    var resetBtn = staticPanel.find('.btn.reset');
    
    var signinContent = slidingPanel.find('.loginContent.signin');
    
    var resetContent = slidingPanel.find('.loginContent.reset');

    signinBtn.on('click', function() {
        $('.loginContent.success').hide();
        resetContent.hide('fast');
        signinContent.show('fast');
        slidingPanel.animate({
            'left': '4%'
        }, 550, 'easeInOutBack');
    });

    resetBtn.on('click', function() {
        $('.loginContent.success').hide();
        signinContent.hide('fast');
        resetContent.show('fast');
        slidingPanel.animate({
            'left': '46%'
        }, 550, 'easeInOutBack');
    });

    $('.request').on('click', function() {
        $('.loginContent.reset').hide();
        $('.loginContent.success').slideToggle('fast');
        $('.reset').addClass('disableRequest');
    });
})();