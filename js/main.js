
$(document).ready(function() {
    // 1. Initial State: Hide extra services and remove d-flex to ensure they disappear
    $('.extra-service').hide().removeClass('d-flex');

    // 2. Toggle Logic
    $('#toggleServicesBtn').on('click', function(e) {
        e.preventDefault();

        // Check if the cards are currently hidden
        if ($('.extra-service').is(':hidden')) {
            // SHOWING: Add d-flex back so the grid works, then slide down
            $('.extra-service').addClass('d-flex').hide().slideDown(600);
            $(this).text("View Less Services");
        } else {
            // HIDING: Slide up, then remove d-flex so they don't take up space
            $('.extra-service').slideUp(600, function() {
                $(this).removeClass('d-flex');
            });
            $(this).text("View All Services");
            
            // Beautiful touch: Scroll back up to the top of the services section
            $('html, body').animate({
                scrollTop: $("#services").offset().top - 100
            }, 600);
        }
    });
});





/* ==========================================================================
   HERO RECTANGLE: GLIDE UP ON REFRESH
   ========================================================================== */
$(document).ready(function() {
    // We use a slight delay so the user sees the bridge first, 
    // then the message glides in beautifully.
    setTimeout(function() {
        $('.hero-content-wrap.text-bg-glass').addClass('rectangle-glide-up');
    }, 400); 
});







/* ==========================================================================
   TESTIMONIAL CAROUSEL JQUERY
   ========================================================================== */

$(document).ready(function() {
    let currentIndex = 0;
    const items = $('#testimonialCarousel > div'); // Selects the col-md-4 divs
    const totalItems = items.length;

    // Function to show a specific slide
    function showSlide(index) {
        // 1. Hide all items smoothly
        items.fadeOut(400).promise().done(function() {
            // 2. Remove any inline display styles and hide them again
            items.hide().removeClass('d-block');
            
            // 3. Show the target item with a beautiful fade-in
            $(items[index]).fadeIn(600).addClass('d-block');
        });
    }

    // Next Button Click
    $('[data-bs-target="#testimonialCarousel"][data-bs-slide="next"]').on('click', function(e) {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % totalItems; // Loop back to start
        showSlide(currentIndex);
    });

    // Previous Button Click
    $('[data-bs-target="#testimonialCarousel"][data-bs-slide="prev"]').on('click', function(e) {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Loop to end
        showSlide(currentIndex);
    });
    
    // Optional: Auto-play every 5 seconds for "Beautiful" dynamics
    /*
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }, 5000);
    */
});

/* ==========================================================================
   FAQ ACCORDION JQUERY (FIXED FOR INLINE DISPLAY:NONE)
   ========================================================================== */

$(document).ready(function() {
    // We target the parent .faq-question which you set to cursor: pointer
    $(".faq-question").on("click", function() {
        
        // Find the immediate next .faq-answer
        var targetAnswer = $(this).next(".faq-answer");
        var targetIcon = $(this).find(".faq-toggle");

        // 1. If this answer is already open, close it
        if (targetAnswer.is(":visible")) {
            targetAnswer.slideUp(400);
            targetIcon.removeClass("rotate-icon");
        } 
        // 2. If it is closed, close all others and open this one
        else {
            // Close all other open answers in the container
            $(".faq-answer").slideUp(400);
            // Reset all other icons
            $(".faq-toggle").removeClass("rotate-icon");

            // Open the clicked one
            targetAnswer.slideDown(400);
            targetIcon.addClass("rotate-icon");
        }
    });
});


/* ==========================================================================
   FAQ CARET SPIN LOGIC
   ========================================================================== */

$(document).ready(function() {
    // Target the question click
    $(".faq-question").on("click", function() {
        
        // 1. Find the specific icon within this question
        const icon = $(this).find(".toggle-icon");
        
        // 2. Toggle the 'rotate-icon' class
        // This triggers the 180deg transform from your CSS
        icon.toggleClass("rotate-icon");
        
        // 3. Optional: Reset other icons if they are open (for a clean look)
        $(".toggle-icon").not(icon).removeClass("rotate-icon");
    });
});


$(document).ready(function() {
    // 1. Initialize Stats
    updateStats();

    // 2. Individual Toggle (Slide Interaction)
    $('.faq-question').on('click', function() {
        var item = $(this).closest('.faq-item');
        $(this).next('.faq-answer').slideToggle(300, function() {
            item.toggleClass('active');
            updateStats();
        });
    });

    // 3. Number All (Looping with .each)
    $('#numberAll').on('click', function() {
        $('.faq-item').each(function(index) {
            $(this).find('.faq-number').text((index + 1) + '.');
        });
        // Chaining example: change button state
        $(this).removeClass('btn-primary').addClass('btn-success').text('Numbered!');
    });

    // 4. Expand All (Chaining)
    $('#expandAll').on('click', function() {
        $('.faq-answer').slideDown(300).parent().addClass('active');
        updateStats();
    });

    // 5. Collapse All (Chaining)
    $('#collapseAll').on('click', function() {
        $('.faq-answer').slideUp(300).parent().removeClass('active');
        updateStats();
    });

    // 6. Highlight Even (Chaining & CSS)
    $('#highlightEven').on('click', function() {
        $('.faq-item').css('background-color', ''); // Reset first
        $('.faq-item:even').css('background-color', '#e7f1ff')
            .delay(100).fadeOut(100).fadeIn(100); 
    });

    // 7. Live Search (Looping)
    $('#faqSearch').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('.faq-item').each(function() {
            var isMatch = $(this).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(isMatch);
        });
        updateStats();
    });

    // 8. Stats Updater function
    function updateStats() {
        var total = $('.faq-item:visible').length;
        var expanded = $('.faq-answer:visible').length;
        
        $('#totalCount').text(total);
        $('#expandedCount').text(expanded);

        // System Status Badge logic
        if (expanded > 0) {
            $('#systemStatus').text('Active Review').removeClass('bg-secondary').addClass('bg-primary');
        } else {
            $('#systemStatus').text('System Ready').removeClass('bg-primary').addClass('bg-secondary');
        }
    }
});


/* ==========================================================================
   FAQ ACCORDION: FIXED TOGGLE (PREVENTS DOUBLE-FIRE)
   ========================================================================== */
$(document).ready(function() {
    // 1. Target the question container
    $(".faq-question").off("click").on("click", function(e) {
        // 2. Prevent the event from bubbling up to parents (Stops the double-jump)
        e.stopPropagation();

        const $answer = $(this).next(".faq-answer");
        const $icon = $(this).find(".toggle-icon");

        // 3. .stop(true, true) clears the animation queue so it can't bounce
        if ($answer.is(":visible")) {
            $answer.stop(true, true).slideUp(400);
            $icon.removeClass("rotate-icon");
        } else {
            // Close other open answers for a clean, professional look
            $(".faq-answer").stop(true, true).slideUp(400);
            $(".toggle-icon").removeClass("rotate-icon");

            // Open the clicked one smoothly
            $answer.stop(true, true).slideDown(400);
            $icon.addClass("rotate-icon");
        }
    });
});

/* ==========================================================================
   FAQ ACCORDION: FIXED TOGGLE + CARET SPIN
   ========================================================================== */
$(document).ready(function() {
    $(".faq-question").off("click").on("click", function(e) {
        e.stopPropagation();

        const $answer = $(this).next(".faq-answer");
        const $icon = $(this).find(".faq-toggle"); // Match the class in your HTML

        if ($answer.is(":visible")) {
            $answer.stop(true, true).slideUp(400);
            $icon.removeClass("rotate-icon"); 
        } else {
            // Close other answers and reset their icons
            $(".faq-answer").stop(true, true).slideUp(400);
            $(".faq-toggle").removeClass("rotate-icon");

            // Open current answer and spin icon
            $answer.stop(true, true).slideDown(400);
            $icon.addClass("rotate-icon"); 
        }
    });
});






/* ==========================================================================
   ---NUMBER ALL TOAST----
   ========================================================================== */
$(document).ready(function() {
    $('#numberAll').on('click', function() {
        
        // 1. Loop and add numbers
        $('.faq-item').each(function(index) {
            $(this).find('.faq-number').text(index + 1);
        });

        // 2. Trigger the Toast
        // We target the ID from your HTML
        var toastElement = document.getElementById('numberToast');
        
        if (toastElement) {
            var toastInstance = bootstrap.Toast.getOrCreateInstance(toastElement);
            toastInstance.show();
        } else {
            console.error("Toast element not found in HTML!");
        }
    });
});


/* ==========================================================================
   INTERACTIVE FAQ: NUMBER ALL & TOAST NOTIFICATION
   ========================================================================== */
$(document).ready(function() {
    $('#numberAll').on('click', function() {
        
        // 1. Looping through FAQ items to update numbers
        $('.faq-item').each(function(index) {
            // Ensure you have an element with class "faq-number" inside your .faq-item
            $(this).find('.faq-number').text(index + 1);
        });

        // 2. TRIGGER THE TOAST
        var toastEl = document.getElementById('numberToast');
        
        if (toastEl) {
            // Bootstrap 5.3 trigger
            var toastInstance = bootstrap.Toast.getOrCreateInstance(toastEl);
            toastInstance.show();
        } else {
            console.error("Toast element #numberToast not found in HTML!");
        }
    });
});


 // --- 2. HIGHLIGHT EVEN LOGIC ---
    $('#highlightEven').on('click', function() {
        // Use jQuery :even selector (Note: :even is 0-indexed, so 0, 2, 4 are 'even')
        // We toggle the class so the user can turn it on and off
        $('.faq-item:even').toggleClass('highlight-even-active');
        
        // Change button text dynamically for beautiful UX
        if($('.faq-item:even').hasClass('highlight-even-active')) {
            $(this).text('Remove Highlight');
        } else {
            $(this).text('Highlight Even');
        }
    });



   /* $(document).ready(function() {
    $('#highlightEven').on('click', function() {
        // 1. Target all faq-items
        // 2. We use :odd because index 1 is visually the 2nd item
        const $evenItems = $('.faq-item:odd');

        // Check if they are already highlighted
        if ($evenItems.hasClass('highlight-purple')) {
            // If already highlighted, remove it (toggle off)
            $('.faq-item').removeClass('highlight-purple');
        } else {
            // Remove from all first (to reset)
            $('.faq-item').removeClass('highlight-purple');
            // Add to the even ones
            $evenItems.addClass('highlight-purple');
        }
    });
});
*/


$(document).ready(function() {
    $('#highlightEven').on('click', function() {
        // :odd targets index 1, 3, 5 (Visual items 2, 4, 6)
        const $evenItems = $('.faq-item:odd');

        // Check if the first even item already has the class to toggle it
        if ($evenItems.hasClass('highlight-purple-edge')) {
            $('.faq-item').removeClass('highlight-purple-edge');
        } else {
            // Remove from all first to reset any previous state
            $('.faq-item').removeClass('highlight-purple-edge');
            // Apply only to the even-indexed items
            $evenItems.addClass('highlight-purple-edge');
        }
    });
});



    /* ==========================================================================
   NEWS BLOG SECTION: LOAD MORE / SHOW LESS LOGIC
   ========================================================================== */
$(document).ready(function() {
    // 1. Ensure the extra-article cards are hidden on initial load
    $('.extra-article').hide();

    // 2. Click event for the "Load More Articles" button
    $('#loadMoreBtn').on('click', function(e) {
        e.preventDefault();

        // 3. Smoothly toggle the hidden cards with a 600ms slide
        $('.extra-article').slideToggle(600);

        // 4. Update the button text dynamically for high-end UX
        if ($(this).text() === "Load More Articles") {
            $(this).text("Show Less Articles");
            
            // Beautiful Touch: Auto-scroll to the new articles
            $('html, body').animate({
                scrollTop: $(".extra-article").first().offset().top - 120
            }, 800);
            
        } else {
            $(this).text("Load More Articles");
            
            // Beautiful Touch: Smoothly return to the start of the blog section
            $('html, body').animate({
                scrollTop: $("#blog").offset().top - 80
            }, 800);
        }
    });
});





/* ==========================================================================
   CONTACT FORM: FIELD VALIDATION & WARNING ICONS (FIXED)
   ========================================================================== */

$(document).ready(function() {
    // Select the form
    const $contactForm = $('.contact-form-glass');

    // 1. Add the Error Message Button beneath the Send Message button if it doesn't exist
    if ($('#formErrorMessage').length === 0) {
        // Appending to the last column of the form
        $('.contact-form-glass .col-12.text-center').append('<div id="formErrorMessage" class="btn btn-danger w-100 mt-4 shadow-sm" style="display:none; cursor: default; pointer-events: none;">Please enter the information provided in the highlighted fieldS.</div>');
    }

    $contactForm.on('submit', function(e) {
        let isValid = true;

        // 2. Loop through required inputs and textareas
        $(this).find('input[required], textarea[required]').each(function() {
            const $field = $(this);
            const $icon = $field.siblings('.field-icon');

            if ($.trim($field.val()) === "") {
                isValid = false;
                $field.addClass('is-invalid');
                $icon.fadeIn(300); // Show the warning icon
            } else {
                $field.removeClass('is-invalid');
                $icon.fadeOut(300); // Hide warning icon if filled
            }
        }); // End of .each loop

        // 3. If invalid, stop submission and slide the button message down
        if (!isValid) {
            e.preventDefault(); 
            $('#formErrorMessage').stop().slideDown(400); 
        } else {
            $('#formErrorMessage').stop().slideUp(300);
        }
    }); // End of .on('submit')

    // 4. Real-time fix: Hide warnings as user types
    $contactForm.find('input, textarea').on('input', function() {
        if ($.trim($(this).val()) !== "") {
            $(this).removeClass('is-invalid');
            $(this).siblings('.field-icon').fadeOut(200);
        }
    });
}); // End of .ready()


/* ==========================================================================
   BACK TO TOP LOGIC
   ========================================================================== */
$(document).ready(function() {
    $(window).scroll(function() {
        // Show button after scrolling 300px
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn(400);
        } else {
            $('#backToTop').fadeOut(400);
        }
    });

    $('#backToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});



/* ==========================================================================
   FAQ STATS BAR: DYNAMIC COUNTERS
   ========================================================================== */
$(document).ready(function() {
    
    // 1. Initial Total Count (Looping through items)
    function updateStats() {
        const totalItems = $('.faq-item').length;
        const expandedItems = $('.faq-answer:visible').length;
        
        // Chaining text updates
        $('#totalCount').text(totalItems).fadeOut(100).fadeIn(100);
        $('#expandedCount').text(expandedItems);

        // 2. Dynamic Status Update
        if (expandedItems > 0) {
            $('#systemStatus')
                .text('Browsing Details')
                .removeClass('bg-success')
                .addClass('bg-primary');
        } else {
            $('#systemStatus')
                .text('System Ready')
                .removeClass('bg-primary')
                .addClass('bg-success');
        }
    }

    // Run once on load
    updateStats();

    // 3. Update whenever a question is clicked
    $('.faq-question').on('click', function() {
        // We use a slight timeout so jQuery can finish the slideToggle before we count
        setTimeout(updateStats, 500);
    });

    // 4. Update when Expand/Collapse All buttons are clicked
    $('#expandAll, #collapseAll').on('click', function() {
        setTimeout(updateStats, 600);
    });
});



$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        // Stop the page from refreshing
        e.preventDefault();

        // 1. If the form is INVALID (fields are empty)
        if (this.checkValidity() === false) {
            e.stopPropagation();
            $(this).addClass('was-validated'); // Show red warnings
            $('#form-feedback').addClass('d-none'); // Ensure success is hidden
        } 
        // 2. If the form is VALID
        else {
            $(this).removeClass('was-validated'); // Remove red warnings
            $('#form-feedback').removeClass('d-none').hide().fadeIn(); // Show success
            
            // Optional: Clear the form after success
            this.reset();
        }
    });
  
 //-----------END OF LANDING PAGE..........//

/* ==========================================================================
   UPDATED DATABASE LOGIC: ARRAY SCORES & DYNAMIC ADMIN KEYS
   ========================================================================== */
/* ==========================================================================
   JSON DATABASE PORTAL: DUAL-FILE FETCH & .forEach()
   ========================================================================== */

// 1. ADMIN SEARCH (RIGHT SIDE)
$('#btnAdminEnter').on('click', function() {
    const adminInput = $('#adminInputSearch').val().trim().toLowerCase();

    // Fetch Admins - Updated filename to admins.json
    $.getJSON('json/admins.json', function(data) {
        let foundAdmin = null;
        
        // Casing corrected to match your JSON (Admins with capital A)
        data.Admins.forEach(admin => {
            if (admin.Name.toLowerCase() === adminInput) foundAdmin = admin;
        });

        if (foundAdmin) {
            // Mapping keys: ID, Name, Email, and the Admin status (handling Edmin/Admin key)
            let adminStatus = foundAdmin.Admin || foundAdmin.Edmin;
            $('#adminBody').html(`<tr><td>${foundAdmin.ID}</td><td class="fw-bold">${foundAdmin.Name}</td><td>${foundAdmin.Email}</td><td><span class="badge bg-dark">${adminStatus}</span></td></tr>`);
            $('#adminTableContainer').fadeIn(400);

            // Fetch ALL Students (Admin Privilege)
            $.getJSON('json/students.json', function(sData) {
                let rows = "";
                sData.students.forEach(s => {
                    // Displaying score array joined by commas
                    rows += `<tr><td><span class="badge bg-primary">${s.id}</span></td><td class="fw-bold">${s.fullName}</td><td>${s.age}</td><td>${s.gender}</td><td>${s.email}</td><td>${s.enrolled}</td><td>${s.courses}</td><td><strong class="text-success">${s.scores.join(', ')}</strong></td><td>${s.city}</td><td>${s.guardian}</td></tr>`;
                });
                $('#studentEmptyState').fadeOut(300, () => {
                    $('#studentBody').html(rows);
                    $('#studentTableContainer').fadeIn(800);
                });
            });
        } else { alert("Admin Not Found."); }
    });
});

// 2. STUDENT SEARCH (LEFT SIDE)
$('#btnStudentEnter').on('click', function() {
    const studentInput = $('#studentInputSearch').val().trim().toLowerCase();

    $.getJSON('json/students.json', function(data) {
        let foundS = null;
        data.students.forEach(s => {
            if (s.firstName.toLowerCase() === studentInput) foundS = s;
        });

        if (foundS) {
            // Displaying individual score array joined by commas
            let row = `<tr><td><span class="badge bg-primary">${foundS.id}</span></td><td class="fw-bold">${foundS.fullName}</td><td>${foundS.age}</td><td>${foundS.gender}</td><td>${foundS.email}</td><td>${foundS.enrolled}</td><td>${foundS.courses}</td><td><strong class="text-success">${foundS.scores.join(', ')}</strong></td><td>${foundS.city}</td><td>${foundS.guardian}</td></tr>`;
            $('#studentEmptyState').fadeOut(300, () => {
                $('#studentBody').html(row);
                $('#studentTableContainer').fadeIn(800);
            });
        } else { alert("Student Not Found."); }
    });
});

/* ==========================================================================
   OFFLINE DATABASE: SEARCH & AUTO-CLEAR LOGIC
   ========================================================================== */

$(document).ready(function() {

    // 1. ADMIN SEARCH LOGIC (RIGHT SIDE)
    $('#btnAdminEnter').on('click', function() {
        const $inputField = $('#adminInputSearch');
        const query = $inputField.val().trim().toLowerCase();
        
        // Find Admin in your academyData object
        const admin = academyData.admins.find(a => a.Name.toLowerCase() === query);

        if (admin) {
            // SUCCESS LOGIC
            let adminRow = `<tr><td>${admin.ID}</td><td class="fw-bold">${admin.Name}</td><td>${admin.Email}</td><td><span class="badge bg-dark">${admin.Admin}</span></td></tr>`;
            $('#adminBody').html(adminRow);
            $('#adminTableContainer').fadeIn(400);
            $('#adminEmptyState').hide();

            // --- THE MAGIC: CLEAR THE ENTRY FIELD ---
            $inputField.val(''); 

            // Reveal Students (Admin Privilege)
            let allStudents = "";
            academyData.students.forEach(function(s) {
                allStudents += `<tr><td>${s.ID}</td><td>${s.Name}</td><td>${s.Age}</td><td>${s.Gender}</td><td>${s.Email}</td><td>${s.Enrolled}</td><td>${s.Courses}</td><td>${s.Scores.join(', ')}</td><td>${s.City}</td><td>${s.Guardian_Name}</td></tr>`;
            });
            
            $('#studentEmptyState').fadeOut(300, function() {
                $('#studentBody').html(allStudents);
                $('#studentTableContainer').fadeIn(800);
            });
        } else {
            alert("Admin not recognized.");
        }
    });

    // 2. STUDENT SEARCH LOGIC (LEFT SIDE)
    $('#btnStudentEnter').on('click', function() {
        const $inputField = $('#studentInputSearch');
        const query = $inputField.val().trim().toLowerCase();
        
        // Find Student in your academyData object
        const student = academyData.students.find(s => s.firstName.toLowerCase() === query);

        if (student) {
            // SUCCESS LOGIC
            let singleRow = `<tr><td>${student.id}</td><td class="fw-bold">${student.fullName}</td><td>${student.age}</td><td>${student.gender}</td><td>${student.email}</td><td>${student.enrolled}</td><td>${student.courses}</td><td>${student.scores.join(', ')}</td><td>${student.city}</td><td>${student.guardian}</td></tr>`;
            
            // --- THE MAGIC: CLEAR THE ENTRY FIELD ---
            $inputField.val(''); 

            $('#studentEmptyState').fadeOut(300, function() {
                $('#studentBody').html(singleRow);
                $('#studentTableContainer').fadeIn(800);
            });
        } else {
            alert("Student not found.");
        }
    });
});

});
