(function($) {

    var $window = $(window);
    
    var contactSubmitEndpoint = "https://formspree.io/f/xdoyvqab";
    //var contactSubmitEndpoint = "https://google.com/failure";
    var simulateSubmit = false;
    var simulateError = false;

    $window.on('load',function(){
        var $contactForm = $('#contactForm'),
            $contactName = $('#contactName'),
            $contactEmail = $('#contactEmail'),
            $contactCompany = $('#contactCompany'),
            $contactMessage = $('#contactMessage'),
            $contactSubmit = $('#contactSubmit'),
            $contactSuccess = $('#contactSuccess');
            $contactError = $('#contactError');
        

        $contactForm.submit((event)=>{
            event.preventDefault();
            $contactSubmit.addClass('disabled');
            $contactSubmit.prop('disabled',true);
            var submissionData = {
                name:$contactName.val(),
                email:$contactEmail.val(),
                company:$contactCompany.val(),
                message:$contactMessage.val(),

            }
            submitForm(submissionData);
        })

        function submitForm(data){
            console.log(data);
            if(simulateSubmit){
                if(simulateError){
                    onSubmitError(new Error("A simulated Error occurred!"))
                } else {
                    onSubmitSuccess("You did it hooray!");
                }
            } else {
                $.post(contactSubmitEndpoint,data,onSubmitSuccess,'json').fail(onSubmitError);
            }
            
        }

        function onSubmitSuccess(){
            console.log("GREAT SUCCESS!");
            $contactForm.fadeOut(500,()=>{$contactSuccess.fadeIn(500)});
            // $contactSuccess.removeClass('hidden');

        }
        function onSubmitError(error){
            $contactError.fadeIn(100);
        }
    });


})(jQuery);