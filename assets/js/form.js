(function($) {

    var $window = $(window);
    
    var contactSubmitEndpoint = "https://formspree.io/f/xdoyvqab";
    //var contactSubmitEndpoint = "https://google.com/failure";
    var pageHostname = document.location.hostname;

    switch (pageHostname) {
        case "localhost":
            contactSubmitEndpoint = "http://localhost:8042/submit"
            simulateSubmit = window.simulateSubmit? true:false;
            break;
    
        default:
            break;
    }
    

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
                message:$contactMessage.val()
            }
            submitForm(submissionData);
        })

        function submitForm(data){
            let {simulateSubmit,simulateError} = checkSim();
            if(simulateSubmit){
                if(simulateError){
                    console.log("Throw simulated Error")
                    onSubmitError(new Error("A simulated Error occurred!"))
                } else {
                    console.log("Simulated success");
                    onSubmitSuccess("You did it hooray!");
                }
            } else {
                $.post(contactSubmitEndpoint,data,onSubmitSuccess,'json').fail(onSubmitError);
            }
            
        }

        function checkSim(){
            let sim = {simulateSubmit:false,simulateError:false};
            if(window.simulateSubmit !== true){
                return sim;
            }
            sim.simulateSubmit = true;
            sim.simulateError = window.simulateError === true?true:false;
            return sim;
        }

        function onSubmitSuccess(){
            $contactForm.fadeOut(500,()=>{$contactSuccess.fadeIn(500)});
            // $contactSuccess.removeClass('hidden');

        }
        function onSubmitError(error){
            $contactError.fadeIn(100);
        }
    });


})(jQuery);