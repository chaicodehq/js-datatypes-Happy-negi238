/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
  if (Array.isArray(formData) || formData === null || typeof formData !== 'object') {
    return null;
  } else {
    const error = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedAge = formData.age;
    const trimmedPincode = formData.pincode.trim();
    const trimmedState = formData.state;
    const trimmedAgreeTerms = formData.agreeTerms;

    const phoneStartArray = ['6', '7', '8', '9'];
    const phoneStartWith = phoneStartArray.some((item) => trimmedPhone.startsWith(item));

    if (!(typeof trimmedName === 'string' && trimmedName.length >= 2 && trimmedName.length <= 50)) {
      error.name = 'Name must be 2-50 characters';
    }
    if (!(typeof trimmedEmail === 'string' && trimmedEmail.includes('@')
      && trimmedEmail.includes('.') &&
      (trimmedEmail.indexOf("@") === trimmedEmail.lastIndexOf("@")) &&
      (trimmedEmail.indexOf(".") > trimmedEmail.indexOf("@")))) {
      error.email = "Invalid email format"
    }
    if (!(typeof trimmedPhone === 'string' && 
      Number.isInteger(Number(trimmedPhone)) && 
      trimmedPhone.length === 10
      && phoneStartWith)) {
      error.phone = "Invalid Indian phone number";
    }

    if(!(Number.isInteger(Number(trimmedAge))
      && (Number(trimmedAge) >= 16 && Number(trimmedAge) <=100))){
        error.age = "Age must be an integer between 16 and 100";
    }

    if(!(typeof trimmedPincode === 'string' && 
      trimmedPincode.length === 6 && 
        Number.isInteger(Number(trimmedPincode)) &&
      !(trimmedPincode.startsWith('0')))){
        error.pincode = "Invalid Indian pincode";
    }

    if(typeof trimmedState === 'string' && trimmedState.length > 0){
      formData?.state ?? "";
    }else{
      error.state = "State is required";
    }

    if(!(Boolean(trimmedAgreeTerms) === true)){
      error.agreeTerms = "Must agree to terms";
    }

    const isValid = Object.keys(error).length <= 0
    return { isValid: isValid, errors: error };
  }
}