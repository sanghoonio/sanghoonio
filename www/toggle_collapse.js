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