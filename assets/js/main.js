(function ($) {
    "use strict";

    // Document ready wrapper for all code
    $(document).ready(function() {
        // Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip();

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

        // Skills Chart initialization
        var initSkillsChart = function() {
            var skillsContainer = document.querySelector('.skills-chart');
            if (skillsContainer) {
                // Remove the canvas element
                var canvas = document.getElementById('skillsChart');
                if (canvas) {
                    canvas.remove();
                }

                // Create static skills distribution
                var staticSkills = `
                    <div class="skills-distribution">
                        <div class="skill-category">
                            <div class="skill-header">
                                <i class="fas fa-code text-primary"></i>
                                <h6>Frontend Development</h6>
                                <span class="skill-percentage">35%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: 35%"></div>
                            </div>
                        </div>
                        <div class="skill-category">
                            <div class="skill-header">
                                <i class="fas fa-server text-success"></i>
                                <h6>Backend Development</h6>
                                <span class="skill-percentage">25%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 25%"></div>
                            </div>
                        </div>
                        <div class="skill-category">
                            <div class="skill-header">
                                <i class="fas fa-laptop-code text-info"></i>
                                <h6>Programming Languages</h6>
                                <span class="skill-percentage">25%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-info" role="progressbar" style="width: 25%"></div>
                            </div>
                        </div>
                        <div class="skill-category">
                            <div class="skill-header">
                                <i class="fas fa-tools text-warning"></i>
                                <h6>Tools & Others</h6>
                                <span class="skill-percentage">15%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-warning" role="progressbar" style="width: 15%"></div>
                            </div>
                        </div>
                    </div>
                `;

                // Add the static skills distribution
                skillsContainer.innerHTML += staticSkills;

                // Add animation to progress bars
                var progressBars = skillsContainer.querySelectorAll('.progress-bar');
                progressBars.forEach(function(bar) {
                    var width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(function() {
                        bar.style.transition = 'width 1s ease-in-out';
                        bar.style.width = width;
                    }, 100);
                });
            }
        };
        initSkillsChart();

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

        // Form validation and submission
        var initContactForm = function() {
            var $contactForm = $('#contactForm');
            if ($contactForm.length) {
                $contactForm.submit(function(e) {
                    e.preventDefault();
                    var $submitButton = $('#sendMessageButton');
                    var originalText = $submitButton.text();
                    
                    $submitButton.prop('disabled', true).text('Sending...');
                    
                    // Add your form submission logic here
                    // For example, using fetch or $.ajax
                    
                    setTimeout(function() {
                        $submitButton.prop('disabled', false).text(originalText);
                        $('#success').html('<div class="alert alert-success">Message sent successfully!</div>');
                        $contactForm[0].reset();
                    }, 1000);
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
                    
                    // Add your newsletter subscription logic here
                    
                    setTimeout(function() {
                        $submitButton.prop('disabled', false).text(originalText);
                        $('#newsletterSuccess').html('Thank you for subscribing!').show();
                        $newsletterForm[0].reset();
                    }, 1000);
                });
            }
        };
        initNewsletter();
    });

})(jQuery);