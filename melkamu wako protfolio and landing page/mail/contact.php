<?php
// Set content type to JSON
header('Content-Type: application/json');

// Validate required fields
if (empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Please fill all required fields with valid information.']);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags(trim($_POST['name'])));
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(strip_tags(trim($_POST['subject'])));
$message = htmlspecialchars(strip_tags(trim($_POST['message'])));

// Additional security checks
if (strlen($name) > 100 || strlen($subject) > 150) {
    http_response_code(400);
    echo json_encode(['error' => 'Name or subject is too long.']);
    exit();
}

// Email configuration
$to = "melkamuwako5@gmail.com";
$email_subject = "Contact Form: $subject - From $name";
$email_body = "You have received a new message from your website contact form.\n\n".
              "Details:\nName: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

// Headers to prevent email injection and set reply-to
$headers = "From: website@yourdomain.com\r\n"; // Use a domain email here
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Attempt to send email
try {
    $mailSent = mail($to, $email_subject, $email_body, $headers);
    
    if (!$mailSent) {
        throw new Exception('Failed to send email. Mail server error.');
    }
    
    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent to Melkamu.'
    ]);
    
} catch (Exception $e) {
    http_response_code(500); // Server Error
    echo json_encode([
        'error' => 'Sorry, there was an error sending your message. Please try again later.',
        'debug' => $e->getMessage() // Remove in production
    ]);
}
?>