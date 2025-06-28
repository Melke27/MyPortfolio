(function ($) {
    "use strict";

    // Document ready wrapper for all code
    $(document).ready(function() {
        // Initialize tooltips for Bootstrap 5
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Smooth scrolling to section with improved offset calculation
        $(".btn-scroll").on('click', function (event) {
            if (this.hash) {
                event.preventDefault();
                var target = $(this.hash);
                if (target.length) {
                    var offset = target.offset().top - 45;
                    $('html, body').stop().animate({
                        scrollTop: offset
                    }, 1500, 'easeInOutExpo');
                }
            }
        });

        // Typed.js initialization with error handling
        var initTypedText = function() {
            var $typedOutput = $('.typed-text-output');
            if ($typedOutput.length) {
                try {
                    var typedStrings = $('.typed-text').text();
                    if (typedStrings) {
                        new Typed('.typed-text-output', {
                            strings: typedStrings.split(', '),
                            typeSpeed: 100,
                            backSpeed: 20,
                            smartBackspace: false,
                            loop: true
                        });
                    }
                } catch (e) {
                    console.error('Typed.js initialization error:', e);
                    $typedOutput.text($('.typed-text').text().split(', ')[0]);
                }
            }
        };
        initTypedText();

        // Professional sidebar typing animation
        if (typeof Typed !== 'undefined') {
            new Typed('.typed-text-output', {
                strings: [
                    'Web Developer',
                    'Front End Developer',
                    'Computer Science Student',
                    'Cybersecurity Enthusiast'
                ],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 1800,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }

        // Skills animation with Waypoints
        var initSkillsAnimation = function() {
            $('.skill').waypoint(function() {
                $('.progress .progress-bar').each(function() {
                    var $this = $(this);
                    $this.css("width", $this.attr("aria-valuenow") + '%');
                });
            }, {
                offset: '80%',
                triggerOnce: true
            });
        };
        initSkillsAnimation();

        // Portfolio filtering with Isotope
        var initPortfolioFilter = function() {
            var $portfolioContainer = $('.portfolio-container');
            if ($portfolioContainer.length) {
                var portfolioIsotope = $portfolioContainer.isotope({
                    itemSelector: '.portfolio-item',
                    layoutMode: 'fitRows',
                    transitionDuration: '0.7s'
                });

                $('#portfolio-flters li').on('click', function() {
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    portfolioIsotope.isotope({ filter: $(this).data('filter') });
                });
            }
        };
        initPortfolioFilter();

        // Testimonials carousel with Owl Carousel
        var initTestimonialsCarousel = function() {
            var $testimonialCarousel = $(".testimonial-carousel");
            if ($testimonialCarousel.length) {
                $testimonialCarousel.owlCarousel({
                    autoplay: true,
                    autoplayTimeout: 5000,
                    smartSpeed: 1500,
                    dots: true,
                    loop: true,
                    items: 1,
                    responsive: {
                        0: { items: 1 },
                        768: { items: 1 },
                        992: { items: 1 }
                    }
                });
            }
        };
        initTestimonialsCarousel();

        // Back to top button functionality
        var initBackToTop = function() {
            var $backToTop = $('.back-to-top');
            $(window).scroll(function() {
                if ($(this).scrollTop() > 300) {
                    $backToTop.fadeIn('slow');
                } else {
                    $backToTop.fadeOut('slow');
                }
            });
            $backToTop.click(function() {
                $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
                return false;
            });
        };
        initBackToTop();

        // Contact form handling
        var initContactForm = function() {
            var $contactForm = $('#contactForm');
            if ($contactForm.length) {
                $contactForm.submit(function(e) {
                    e.preventDefault();
                    var $submitButton = $(this).find('button[type="submit"]');
                    var originalText = $submitButton.text();
                    
                    $submitButton.prop('disabled', true).text('Sending...');
                    
                    var formData = {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        subject: $('#subject').val(),
                        message: $('#message').val()
                    };

                    $.ajax({
                        url: 'https://melkamuwako27-backend.onrender.com/api/contact',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(formData),
                        success: function(response) {
                            $('#success').html('Message sent successfully!').show();
                            $('#error').hide();
                            $contactForm[0].reset();
                        },
                        error: function(xhr) {
                            var errorMessage = 'Failed to send message. Please try again.';
                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage = xhr.responseJSON.message;
                            }
                            $('#error').html(errorMessage).show();
                            $('#success').hide();
                        },
                        complete: function() {
                            $submitButton.prop('disabled', false).text(originalText);
                        }
                    });
                });
            }
        };
        initContactForm();

        // Newsletter subscription
        var initNewsletter = function() {
            var $newsletterForm = $('#newsletterForm');
            if ($newsletterForm.length) {
                $newsletterForm.submit(function(e) {
                    e.preventDefault();
                    var $submitButton = $(this).find('button[type="submit"]');
                    var originalText = $submitButton.text();
                    
                    $submitButton.prop('disabled', true).text('Subscribing...');
                    
                    var formData = {
                        email: $('#newsletterEmail').val()
                    };

                    $.ajax({
                        url: '/api/subscribe',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(formData),
                        success: function(response) {
                            $('#newsletterSuccess').html('Thank you for subscribing!').show();
                            $('#newsletterError').hide();
                            $newsletterForm[0].reset();
                        },
                        error: function(xhr) {
                            var errorMessage = 'Failed to subscribe. Please try again.';
                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage = xhr.responseJSON.message;
                            }
                            $('#newsletterError').html(errorMessage).show();
                            $('#newsletterSuccess').hide();
                        },
                        complete: function() {
                            $submitButton.prop('disabled', false).text(originalText);
                        }
                    });
                });
            }
        };
        initNewsletter();

        // Initialize counters
        var initCounters = function() {
            $('.counter').each(function() {
                var $this = $(this);
                var countTo = $this.attr('data-count');
                
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        };

        // Initialize counters when they come into view
        var waypoint = new Waypoint({
            element: document.getElementById('milestones'),
            handler: function() {
                initCounters();
                this.destroy();
            },
            offset: '80%'
        });
    });

})(jQuery);