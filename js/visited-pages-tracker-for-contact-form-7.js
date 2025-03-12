document.addEventListener('DOMContentLoaded', function() {
    // Retrieve visited pages from session storage
    let visitedPages = JSON.parse(sessionStorage.getItem('visited_pages')) || [];
    // use the last page the user came from
    const pageUrl = document.referrer;
    // console.log('Added last page:', pageUrl);

    // adding the current page URL to visited_pages
    if (!visitedPages.includes(pageUrl)) {
        visitedPages.push(pageUrl);
    }

    // console.log("Visited pages after update:", visitedPages);

    // saving visited_pages to sessionStorage
    sessionStorage.setItem('visited_pages', JSON.stringify(visitedPages));

    // Attach event listeners to all Contact Form 7 forms
    document.querySelectorAll('form.wpcf7-form').forEach(function(form) {
        // Flag to check if we've already filled the hidden input
        let isInputFilled = false;
        // Fill in the URL as soon the user starts editing it
        form.querySelectorAll('input, textarea, select').forEach(function(field) {
            field.addEventListener('focus', function() {
                // add the current page
                visitedPages.push(window.location.href);
                sessionStorage.setItem('visited_pages', JSON.stringify(visitedPages));
                if (!isInputFilled) {
                    const hiddenInput = form.querySelector('input[name="visited_pages"]');
                    if (hiddenInput) {
                        // Set the value with collected visited pages as a JSON string
                        hiddenInput.value = JSON.stringify(visitedPages);
                        console.log('Hidden input filled with visited pages on focus:', hiddenInput.value);
                        isInputFilled = true; // Prevent multiple fillings
                    }
                }
            });
        });
    });
});
