
const sendEmailAlert = async (emailData, emailType, subject) => {
    const sendData = {
        emailType: emailType,
        email: `${emailData.emailAddress}`,
        details: {
            username: 
                (emailData.lastName && emailData.firstName) 
                    ? `${emailData.lastName} ${emailData.firstName}` 
                    : "Felhasználó",
            room: emailData.room || "",
            date: emailData.date || "",
            startTime: emailData.startTime || "",
            endTime: emailData.endTime || ""
        },
        subject: subject,
    };

    
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Hiba történt az e-mail küldésekor:', errorData);
        } 
    } catch (error) {
        console.error('Hiba történt az e-mail küldésekor:', error);
    }
};

export default sendEmailAlert;
