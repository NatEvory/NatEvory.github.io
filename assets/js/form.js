(function($) {

    var $window = $(window);

    var contactSubmitEndpoint = "https://formspree.io/f/xdoyvqab";

    $window.on('load',function(){
        var $contactForm = $('#contactForm');
        var $contactName = $('#contactName');
        var $contactEmail = $('#contactEmail');
        var $contactCompany = $('#contactCompany');
        var $contactMessage = $('#contactMessage');
        var $contactSubmit = $('#contactSubmit');

        $contactForm.submit((e)=>{
            e.preventDefault();
            $contactSubmit.addClass('disabled');
            $contactSubmit.prop('disabled',true);

        })

    });


})(jQuery);