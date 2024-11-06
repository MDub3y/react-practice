import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;
    if(phoneNumber.length < 10 || regex.test(phoneNumber)){
        alert("Invalid Phone Number");
        return;
    }

    // Call Backend API to send OTP
    setShowOtpInput(true);

  };

  const onOtpSubmit = (otp) => {
    console.log(`Login Successful with OTP ${otp}`);
  };

  return (
    <div>
      {!showOtpInput ? (<form action="" onSubmit={handlePhoneSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          placeholder="Enter Phone Number"
        />
        <button type="submit">Send OTP</button>
      </form>) : (
        <>
            <div>Enter the OTP sent to {phoneNumber}</div>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </>
      )}
    </div>
  );
};

export default PhoneOtpForm;
