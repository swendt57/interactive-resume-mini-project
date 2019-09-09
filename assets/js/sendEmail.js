function sendMail(contactForm) {
    console.log("in sendMail");
    emailjs.send("default_service", "rosie_code_institute", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
            window.location = "thank-you.html";
        },
        function(error) {
            console.log("FAILURE", error);
            window.location = "oops.html";
        }
    );
        
    return false; //block loading new page - kind of like e.preventDefault()
}