<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Melkamu</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            padding: 20px;
            background-color: #f8f9fa;
        }
        .contact-form {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .form-header {
            text-align: center;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="contact-form">
            <div class="form-header">
                <h2>Contact Melkamu</h2>
                <p class="text-muted">Fill out the form below to send me a message</p>
            </div>
            
            <div id="success"></div>
            
            <form id="contactForm" novalidate>
                <div class="mb-3">
                    <label for="name" class="form-label">Your Name</label>
                    <input type="text" class="form-control" id="name" name="name" required>
                </div>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" required>
                </div>
                
                <div class="mb-3">
                    <label for="subject" class="form-label">Subject</label>
                    <input type="text" class="form-control" id="subject" name="subject" required>
                </div>
                
                <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
                </div>
                
                <div class="d-grid">
                    <button type="submit" class="btn btn-primary" id="sendMessageButton">Send Message</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <script>
    $(function () {
        $("#contactForm input, #contactForm textarea").on("input change", function() {
            $(this).removeClass("is-invalid");
        });

        $("#contactForm").submit(function (event) {
            event.preventDefault();
            
            // Simple validation
            let isValid = true;
            $("#contactForm input[required], #contactForm textarea[required]").each(function() {
                if (!$(this).val()) {
                    $(this).addClass("is-invalid");
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Simulate AJAX call (replace with actual AJAX in production)
            setTimeout(function() {
                $('#success').html(`
                    <div class='alert alert-success alert-dismissible fade show'>
                        <strong>Thank you ${name}!</strong> Your message has been sent to Melkamu.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
                $('#contactForm').trigger("reset");
                $this.prop("disabled", false);
            }, 1500);
        });

        $('#name').focus(function () {
            $('#success').html('');
        });
    });
    </script>
</body>
</html>