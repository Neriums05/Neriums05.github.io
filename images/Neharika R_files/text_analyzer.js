document.addEventListener("DOMContentLoaded", () => {
    const analyzeButton = document.getElementById("analyzeBtn");
    const textInput = document.getElementById("textInput");
    const analysisOutput = document.getElementById("analysisOutput");

    if (analyzeButton) {
        analyzeButton.addEventListener("click", analyzeText);
    }

    if (textInput) {
        textInput.addEventListener("input", (e) => {
            logEvent("input", e.target);
            if (e.target.value.trim() === "") {
                analysisOutput.textContent = "";
            }
        });
    }
});

function analyzeText() {
    const textInput = document.getElementById("textInput");
    const analysisOutput = document.getElementById("analysisOutput");

    if (textInput && analysisOutput) {
        const text = textInput.value;
        const charCountExcludingSpaces = (text.match(/\S/g) || []).length;

        // Character count check
        if (charCountExcludingSpaces < 10000) {
            textInput.value = "";
            analysisOutput.textContent = "";
            showPopup(`Please input at least 10000 characters, excluding spaces. You have currently input ${charCountExcludingSpaces} characters.`);
            return;
        }

        // Task 1: Basic stats
        const lettersCount = (text.match(/[a-zA-Z]/g) || []).length;
        const wordsCount = (text.trim().split(' ').filter((x) => !!x.trim()).length);
        const spacesCount = (text.match(/ /g) || []).length;
        const newlinesCount = (text.match(/\n/g) || []).length;
        const specialSymbolsCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

        // Word categories
        const pronouns = ['i', 'me', 'my', 'mine', 'you', 'your', 'yours', 'he', 'him', 'his', 'she', 'her', 'hers', 'it', 'its', 'we', 'us', 'our', 'ours', 'they', 'them', 'their', 'theirs'];
        const prepositions = ['about', 'above', 'after', 'against', 'along', 'among', 'around', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by', 'during', 'for', 'from', 'in', 'inside', 'into', 'near', 'of', 'on', 'onto', 'over', 'through', 'to', 'toward', 'under', 'until', 'upon', 'with', 'within', 'without'];
        const indefiniteArticles = ['a', 'an'];

        const pronounCount = countTokens(text, pronouns);
        const prepositionCount = countTokens(text, prepositions);
        const articleCount = countTokens(text, indefiniteArticles);

        // Format output
        const formatCount = (obj) =>
            Object.entries(obj)
                .map(([key, val]) => `${key}: ${val}`)
                .join('\n');

        analysisOutput.textContent = `
Total Letters: ${lettersCount}
Total Words: ${wordsCount}
Total Spaces: ${spacesCount}
Total Newlines: ${newlinesCount}
Total Special Symbols: ${specialSymbolsCount}

Pronouns Count:
${formatCount(pronounCount)}

Prepositions Count:
${formatCount(prepositionCount)}

Indefinite Articles Count:
${formatCount(articleCount)}
        `;
    }
}

function countTokens(text, tokens) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const counts = {};
    tokens.forEach((token) => {
        counts[token] = words.filter((word) => word === token).length;
    });
    return counts;
}

function showPopup(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = "#2f2f2f";
    popup.style.color = "#f9f9f9";
    popup.style.padding = "1rem 2rem";
    popup.style.borderRadius = "12px";
    popup.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
    popup.style.fontFamily = "'EB Garamond', serif";
    popup.style.zIndex = 9999;
    popup.style.transition = "opacity 0.5s ease";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 4000);
}

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
    } else if (tagName === "textarea") {
        eventObject = "text input";
    } else {
        eventObject = tagName;
    }

    console.log(`${timestamp} | ${eventType} | ${eventObject}`);
}
