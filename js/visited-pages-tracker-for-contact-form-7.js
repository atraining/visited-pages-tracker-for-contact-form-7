document.addEventListener('DOMContentLoaded', function() {
    // console.log("DOMContentLoaded event fired");

    var pageUrl = window.location.href;
    var visitedPages = JSON.parse(sessionStorage.getItem('visited_pages')) || [];

    // console.log("Current page URL:", pageUrl);
    // console.log("Visited pages before update:", visitedPages);

    // adding the current page URL to visited_pages
    if (!visitedPages.includes(pageUrl)) {
        visitedPages.push(pageUrl);
    }

    // console.log("Visited pages after update:", visitedPages);

    // saving visited_pages to localStorage
    sesstionStorage.setItem('visited_pages', JSON.stringify(visitedPages));
    // console.log("Visited pages saved to localStorage");

    // adding visited_pages to the form data before submit event is fired
    document.querySelectorAll('form.wpcf7-form').forEach(function(form) {
        // console.log("Found form:", form);
        form.addEventListener('submit', function() {
            // console.log("Form submit event fired");
            var visitedPages = localStorage.getItem('visited_pages');
            // console.log("Visited pages from localStorage:", visitedPages);

            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'visited_pages';
            input.value = visitedPages;
            form.appendChild(input);

            // console.log("Hidden input added:", input);
        });
    });
});