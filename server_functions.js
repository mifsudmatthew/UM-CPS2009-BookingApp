const nodeMailer = require('nodemailer'); // Obtaining the node mailer module
var accountPins = [ {email: "unique@gmail.com", pin: "0000"} ]

function getRandomPin() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        const digit = Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
        code += digit;
    }
    return code;
}

// Function to add an entry to the accountPins array with a timer
function addPinEntry(email, pin) {
    // Add entry to the accountPins array
    accountPins.push({ email: email, pin: pin });
    console.log(accountPins);
    
    // Set a timer to remove the entry after 5 minutes
    setTimeout(() => {
        // Find the index of the entry to remove
        const index = accountPins.findIndex(entry => entry.email === email && entry.pin === pin);
        // If the entry is found, remove it
        if (index !== -1) {
            accountPins.splice(index, 1);
            console.log(`Entry with email ${email} and pin ${pin} removed after 5 minutes.`);
        }
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
}

async function sendPinByMail(res){

    var Email = "abigail7@ethereal.email"; // Hardcoded email address
    var PIN = getRandomPin();

    // Construct email details
    const emailDetails = {
        from: 'no-reply@servespot.com',
        to: Email, // Use the hardcoded email address
        subject: "Password reset",
        text: "Enter the code: " + PIN + " to reset your password."
    };

    try {
        // Create transporter
        const transporter = nodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'abigail7@ethereal.email',
                pass: 'EvV3928uHk3Vxhf8Tj'
            }
        });

        // Send email
        const info = await transporter.sendMail(emailDetails);

        console.log('Email sent:', info.response);
        addPinEntry(Email,PIN);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Error sending email');
    }
}

module.exports = {
    accountPins , getRandomPin, addPinEntry, sendPinByMail
};
