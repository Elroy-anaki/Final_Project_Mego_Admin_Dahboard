import { Mail } from 'lucide-react'; 

const EmailButton = ({ email }) => {
    function handleEmailClick(){
        console.log("Email value:", email); 
        
        const mailtoUrl = `mailto:${email}`;
        console.log("Mailto URL:", mailtoUrl);
        
        try {
            window.location.href = mailtoUrl;
            console.log("Location assign completed");
        } catch (error) {
            console.error("Error opening email:", error);
        }
    };

    return (
        <button
            onClick={handleEmailClick}
            className="p-1.5 text-gray-600 hover:text-sky-600 rounded-full hover:bg-sky-50 transition-colors"
            title={`Send email to ${email}`}
        >
            <Mail size={20} />
        </button>
    );
};

export default EmailButton;