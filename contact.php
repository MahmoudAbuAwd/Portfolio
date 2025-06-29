<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));
    
    // Validate inputs
    $errors = array();
    
    // Validate name
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    // Validate message
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If no errors, proceed with sending email
    if (empty($errors)) {
        // Set email recipient, subject, and headers
        $to = "mahmoodabuawad08@gmail.com";
        $subject = "New Contact Form Submission from $name";
        
        // Prepare email headers
        $headers = "From: $email" . "\r\n";
        $headers .= "Reply-To: $email" . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
        
        // Prepare email content (HTML format)
        $email_content = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                h2 {
                    color: #6e00ff;
                }
                .details {
                    margin-bottom: 20px;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>New Contact Form Submission</h2>
                <div class='details'>
                    <p><strong>Name:</strong> $name</p>
                    <p><strong>Email:</strong> $email</p>
                </div>
                <div class='message'>
                    <p><strong>Message:</strong></p>
                    <p>" . nl2br($message) . "</p>
                </div>
                <div class='footer'>
                    <p>This email was sent from your website contact form.</p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Send the email
        $mail_sent = mail($to, $subject, $email_content, $headers);
        
        // Return JSON response for AJAX
        header('Content-Type: application/json');
        
        // Check if mail was sent successfully
        if ($mail_sent) {
            echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Sorry, there was an error sending your message.']);
        }
    } else {
        // Return validation errors
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => implode(', ', $errors)]);
    }
} else {
    // Not a POST request
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?>