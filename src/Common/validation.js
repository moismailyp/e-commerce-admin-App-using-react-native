export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  };
  export const validateMobileNumber = (mobileNumber) => {
    // Using a simple regex to validate the mobile number
    const mobileNumberRegex = /^[0-9]{10}$/;

    if (mobileNumberRegex.test(mobileNumber)) {
      return true
    } else {
return false    }
  };