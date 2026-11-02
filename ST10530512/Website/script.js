/* ==========================================================================
   DMD BEAUTY SALON - MAIN JAVASCRIPT FILE (PART 3 COMPLETE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    console.log("DMD Beauty Salon JavaScript Loaded Successfully!");

    // ==========================================================================
    // 1. ENQUIRY FORM VALIDATION & DYNAMIC RESPONSE
    // ==========================================================================
    const enquiryForm = document.querySelector("#enquiryForm");
    
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function(event) {
            // Prevent default form submission to validate inputs first
            event.preventDefault();

            // Get form field values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;

            // Simple validation checks
            if (name === "" || email === "" || phone === "" || service === "") {
                alert("Please fill in all required fields before submitting your enquiry.");
                return;
            }

            // Phone number basic length check (at least 10 digits)
            if (phone.length < 10) {
                alert("Please enter a valid phone number (at least 10 digits).");
                return;
            }

            // Simulate dynamic response based on selected service
            let estimatedCost = "R300 - R500";
            if (service === "braids") estimatedCost = "From R350";
            else if (service === "wigs") estimatedCost = "From R400";
            else if (service === "makeup") estimatedCost = "From R300";
            else if (service === "nails") estimatedCost = "From R200";

            // Display success message and estimated pricing feedback to user
            alert(`Thank you, ${name}! Your enquiry for ${service.toUpperCase()} has been received.\nEstimated Cost: ${estimatedCost}.\nWe will contact you shortly via email or phone.`);
            
            // Reset form fields after successful submission
            enquiryForm.reset();
        });
    }

    // ==========================================================================
    // 2. CONTACT FORM VALIDATION & MAILTO COMPILATION
    // ==========================================================================
    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            // Prevent default page refresh
            event.preventDefault();
            console.log("Contact form submit button clicked!");

            // Grab form input elements by their IDs
            const cNameInput = document.getElementById("cName");
            const cEmailInput = document.getElementById("cEmail");
            const cSubjectInput = document.getElementById("cSubject");
            const cMessageInput = document.getElementById("cMessage");

            // Safety check to ensure elements exist in the DOM
            if (!cNameInput || !cEmailInput || !cSubjectInput || !cMessageInput) {
                console.error("Error: One or more contact form input IDs could not be found.");
                alert("An internal form error occurred. Please check your HTML IDs.");
                return;
            }

            const cName = cNameInput.value.trim();
            const cEmail = cEmailInput.value.trim();
            const cSubject = cSubjectInput.value;
            const cMessage = cMessageInput.value.trim();

            // Validate that fields are not empty
            if (cName === "" || cEmail === "" || cSubject === "" || cMessage === "") {
                alert("Please complete all fields in the contact form.");
                return;
            }

            console.log("Contact form validation passed. Compiling email...");

            // Compile information into an email mailto link action
            const recipientEmail = "dmdbeautysalon@gmail.com";
            const emailSubject = encodeURIComponent(`Website Message: ${cSubject} from ${cName}`);
            const emailBody = encodeURIComponent(`Name: ${cName}\nEmail: ${cEmail}\n\nMessage:\n${cMessage}`);

            // Open user's default email client pre-filled with details
            window.location.href = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
            
            // Fallback alert in case the testing browser does not have a default email app installed
            setTimeout(() => {
                alert("If your email application did not open automatically, please email us directly at dmdbeautysalon@gmail.com");
            }, 500);
        });
    }

    // ==========================================================================
    // 3. IMAGE LIGHTBOX ENHANCEMENT FOR SERVICES PAGE
    // ==========================================================================
    const serviceImages = document.querySelectorAll("main img");

    serviceImages.forEach(img => {
        img.style.cursor = "pointer";
        img.title = "Click to view larger image";

        img.addEventListener("click", function() {
            // Create a modal container for lightbox view
            const modal = document.createElement("div");
            modal.style.position = "fixed";
            modal.style.top = "0";
            modal.style.left = "0";
            modal.style.width = "100%";
            modal.style.height = "100%";
            modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            modal.style.zIndex = "1000";

            // Create zoomed image element inside modal
            const zoomedImg = document.createElement("img");
            zoomedImg.src = this.src;
            zoomedImg.style.maxWidth = "80%";
            zoomedImg.style.maxHeight = "80%";
            zoomedImg.style.borderRadius = "8px";
            zoomedImg.style.boxShadow = "0 5px 15px rgba(0,0,0,0.5)";

            modal.appendChild(zoomedImg);
            document.body.appendChild(modal);

            // Click anywhere on modal to close it
            modal.addEventListener("click", function() {
                document.body.removeChild(modal);
            });
        });
    });
});