import { useState, useEffect } from 'react';

function OtpModal({ isOpen, onClose, onVerify }) {
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        let interval;
        if (isOpen && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, resendTimer]);

    useEffect(() => {
        if (isOpen) {
            setResendTimer(60);
            setOtpValues(['', '', '', '', '', '']);
        }
    }, [isOpen]);

    const handleOtpChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
        const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);
            
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const otpCode = otpValues.join('');
        if (otpCode.length === 6) {
            onVerify(otpCode);
        }
    };

    const handleResendOtp = () => {
        if (resendTimer === 0) {
            setResendTimer(60);
            setOtpValues(['', '', '', '', '', '']);
            console.log('Resending OTP...');
        }
    };

    if (!isOpen) return null;

    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fadeIn">
            <div className="bg-white rounded-none w-full h-full p-4 m-0 flex flex-col justify-center shadow-2xl relative animate-slideUp sm:rounded-2xl sm:max-w-md sm:h-auto sm:p-8 sm:m-auto sm:flex-none mx-auto">                
                <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none">
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-blue-100 rounded-full p-4 mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                    </div>

                    <h2 className="text-xl font-bold text-gray-600 font-nunito leading-tight">Enter OTP Code</h2>

                    <p className="text-gray-500 text-sm mt-1 text-center font-nunito leading-normal">
                        We have sent a 6-digit verification code to your email.<br/>
                        Please enter it below to continue.
                    </p>
                </div>

                <form onSubmit={handleVerifyOtp} autoComplete="off" className="flex flex-col items-center space-y-4">
                    <div className="flex space-x-2 justify-center mb-5">
                        {otpValues.map((value, index) => (
                            <input key={index} id={`otp-${index}`} type="text" maxLength="1" inputMode="numeric" pattern="[0-9]*" value={value} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} className="w-10 h-12 text-center border border-gray-300 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-600 font-nunito" required />
                        ))}
                    </div>
                    <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow text-base transition font-nunito">Verify Code </button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-gray-500 text-sm font-nunito">Didn't receive the code?</span>
                    <button type="button" onClick={handleResendOtp} disabled={resendTimer > 0} className={`ml-1 text-sm font-semibold font-nunito ${ resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline' }`}>
                        Resend OTP {resendTimer > 0 && <span className="ml-1">({resendTimer}s)</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OtpModal;