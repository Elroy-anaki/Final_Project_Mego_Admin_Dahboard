import { Mail } from 'lucide-react'; 

const EmailButton = ({ email }) => {
    

    return (
        <a
        href={`mailto:${email}`}
            className="p-1.5 text-purple-600 hover:text-sky-600 rounded-full hover:bg-sky-50 transition-colors"
            title={`Send email to ${email}`}
        >
            <Mail size={20} />
        </a>
    );
};

export default EmailButton;