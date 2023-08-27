// hide email from bots
document.addEventListener("DOMContentLoaded", function() {
    var emailAddress = "sp5fd@virginia.edu";
    var mailtoLinks = document.querySelectorAll(".mail-link");

    mailtoLinks.forEach(function(mailtoLink) {
        mailtoLink.addEventListener("mouseenter", function() {
            mailtoLink.href = "mailto:" + emailAddress;
        });

        mailtoLink.addEventListener("mouseleave", function() {
            mailtoLink.href = "#"; // Set href to '#'
        });
    });
});

// toggle collapse for navbar on small screens
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("resize", function () {
        console.log(window.innerWidth);
        if (window.innerWidth < 577) {
            document.querySelector("#navbarSupportedContent").classList.add("toggle-collapse");
        } else {
            document.querySelector("#navbarSupportedContent").classList.remove("toggle-collapse");
        }
    });
    window.dispatchEvent(new Event("resize"));
});

// scroll to portfolio details on tab click
document.addEventListener("DOMContentLoaded", function() {
    const clickableElements = document.querySelectorAll(".portfolio-card-a");

    clickableElements.forEach(function(clickableElement) {
        clickableElement.addEventListener("click", function(event) {
            event.preventDefault();
            const isExpanded = clickableElement.getAttribute("aria-expanded") === "true";

            if (isExpanded) {
                const targetId = clickableElement.getAttribute("href");
                scrollToTarget(targetId, 40);
            }
        });
    });
});

//helper for above
function scrollToTarget(targetSelector, delay) {
    setTimeout(function() {
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }, delay);
}