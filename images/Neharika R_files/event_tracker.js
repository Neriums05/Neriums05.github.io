document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        logEvent("click", e.target);
    });

    const sectionHeaders = document.querySelectorAll(".section h2");
    const seen = new Set();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !seen.has(entry.target)) {
                seen.add(entry.target);
                logEvent("view", entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionHeaders.forEach(header => observer.observe(header));

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }
});

function logEvent(eventType, element) {
    const timestamp = new Date().toISOString();
    const tagName = element.tagName ? element.tagName.toLowerCase() : "unknown";
    let eventObject = "";

    if (eventType === "view") {
        const section = element.closest("section");
        eventObject = section?.id ? `section: ${section.id}` : "section view";
    } else if (tagName === "img") {
        eventObject = "image";
    } else if (tagName === "a") {
        eventObject = "link";
    } else if (tagName === "button") {
        eventObject = "button";
    } else if (tagName === "select") {
        eventObject = "drop-down";
    } else if (["p", "span", "h1", "h2", "h3", "h4"].includes(tagName)) {
        eventObject = "text";
    } else if (tagName === "input") {
        eventObject = "form input";
    } else {
        eventObject = tagName;
    }

    console.log(`${timestamp} | ${eventType} | ${eventObject}`);
}
