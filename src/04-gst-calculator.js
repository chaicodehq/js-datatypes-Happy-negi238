/**
 * 🧾 GST Calculator - Tax Lagao Bhai!
 *
 * Bunty apni dukaan ke liye GST calculator bana raha hai. Customer ko bill
 * dena hai jisme base price, GST amount, aur total clearly dikhna chahiye.
 * GST rate category ke hisaab se change hota hai.
 *
 * GST Rates (by category string, case-insensitive):
 *   - "essential"   => 0% GST  (dal, chawal, atta, etc.)
 *   - "food"        => 5% GST  (packaged food, restaurant below Rs 7500)
 *   - "standard"    => 12% GST (processed food, business class tickets)
 *   - "electronics" => 18% GST (phones, laptops, etc.)
 *   - "luxury"      => 28% GST (cars, aerated drinks, tobacco)
 *   - Any other category => return null
 *
 * Rules:
 *   - Calculate: gstAmount = amount * rate / 100
 *   - Calculate: totalAmount = amount + gstAmount
 *   - Round gstAmount aur totalAmount to 2 decimal places using
 *     parseFloat(value.toFixed(2))
 *   - Return object: { baseAmount, gstRate, gstAmount, totalAmount }
 *   - category ko lowercase mein compare karo (case-insensitive)
 *   - Hint: Use toFixed(), parseFloat(), Number.isFinite(), toLowerCase()
 *
 * Validation:
 *   - Agar amount positive finite number nahi hai, return null
 *   - Agar category string nahi hai, return null
 *   - Agar category unknown hai, return null
 *
 * @param {number} amount - Base amount before tax
 * @param {string} category - Product category
 * @returns {{ baseAmount: number, gstRate: number, gstAmount: number, totalAmount: number } | null}
 *
 * @example
 *   calculateGST(1000, "electronics")
 *   // => { baseAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
 *
 *   calculateGST(500, "essential")
 *   // => { baseAmount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500 }
 */
export function calculateGST(amount, category) {
  // Your code here
  if (typeof category === 'string') {
    const categoryLower = category.toLowerCase();
    const categoryArr = ['essential', 'food', 'standard', 'electronics',
      'luxury'
    ];
    let categoryFlag = false;

    for (let i = 0; i < categoryArr.length; i++) {
      if (categoryArr[i] === categoryLower) {
        categoryFlag = true;
        break;
      }
    }
    if (categoryFlag && Number.isFinite(amount) && amount > 0) {
      let gstAmount;
      let totalAmount;
      let gstRate;
      let baseAmount;
      if (categoryLower === 'essential') {

        gstRate = 0;
        gstAmount = parseFloat((amount * gstRate / 100).toFixed(2));
        totalAmount = parseFloat((gstAmount + amount).toFixed(2));
        baseAmount = amount;

        return ({ baseAmount: baseAmount, gstRate: gstRate, gstAmount: gstAmount, totalAmount: totalAmount });
      } else if (categoryLower === 'food') {

        gstRate = 5;
        gstAmount = parseFloat((amount * gstRate / 100).toFixed(2));
        totalAmount = parseFloat((gstAmount + amount).toFixed(2));
        baseAmount = amount;

        return ({ baseAmount: baseAmount, gstRate: gstRate, gstAmount: gstAmount, totalAmount: totalAmount });

      } else if (categoryLower === 'standard') {

        gstRate = 12;
        gstAmount = parseFloat((amount * gstRate / 100).toFixed(2));
        totalAmount = parseFloat((gstAmount + amount).toFixed(2));
        baseAmount = amount;

        return ({ baseAmount: baseAmount, gstRate: gstRate, gstAmount: gstAmount, totalAmount: totalAmount });


      } else if (categoryLower === 'electronics') {

        gstRate = 18;
        gstAmount = parseFloat((amount * gstRate / 100).toFixed(2));
        totalAmount = parseFloat((gstAmount + amount).toFixed(2));
        baseAmount = amount;

        return ({ baseAmount: baseAmount, gstRate: gstRate, gstAmount: gstAmount, totalAmount: totalAmount });


      } else if (categoryLower === 'luxury') {

        gstRate = 28;
        gstAmount = parseFloat((amount * gstRate / 100).toFixed(2));
        totalAmount = parseFloat((gstAmount + amount).toFixed(2));
        baseAmount = amount;

        return ({ baseAmount: baseAmount, gstRate: gstRate, gstAmount: gstAmount, totalAmount: totalAmount });


      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
