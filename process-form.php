<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data and sanitize inputs
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    
    // Validate inputs
    if (empty($name) || empty($email) || empty($message)) {
        // Redirect back with error if validation fails
        header("Location: index.html?status=error&message=All fields are required");
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Redirect back with error if email format is invalid
        header("Location: index.html?status=error&message=Invalid email format");
        exit;
    }
    
    // Set up email
    $to = "agraharianiruddha@gmail.com"; // Your email address
    $subject = "New Contact Form Submission from $name";
    
    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        // Success! Redirect with success message
        header("Location: index.html?status=success&message=Thank you for your message. We'll get back to you soon!");
        exit;
    } else {
        // Email failed to send
        header("Location: index.html?status=error&message=Oops! Something went wrong. Please try again later.");
        exit;
    }
} else {
    // Not a POST request, redirect to the home page
    header("Location: index.html");
    exit;
}
?>
