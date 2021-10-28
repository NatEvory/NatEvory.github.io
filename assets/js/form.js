(function($) {

    var $window = $(window);

    var contactSubmitEndpoint = "https://formspree.io/f/xdoyvqab";
    var simulateSubmit = false;
    var simulateError = false;

    $window.on('load',function(){
        var $contactForm = $('#contactForm');
        var $contactName = $('#contactName');
        var $contactEmail = $('#contactEmail');
        var $contactCompany = $('#contactCompany');
        var $contactMessage = $('#contactMessage');
        var $contactSubmit = $('#contactSubmit');

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
            console.log("Pretending to submit form");
            console.log(data);
            if(simulateSubmit){
                if(simulateError){
                    onSubmitError(new Error("A simulated Error occurred!"))
                } else {
                    onSubmitSuccess("You did it hooray!");
                }
            } else {
                $.post(contactSubmitEndpoint,data,onSubmitSuccess,'json');
            }
            
        }

        function onSubmitSuccess(){
            console.log("GREAT SUCCESS!");

        }
        function onSubmitError(error){
            console.log("FAILURE");
            console.log(error);
        }
    });


})(jQuery);