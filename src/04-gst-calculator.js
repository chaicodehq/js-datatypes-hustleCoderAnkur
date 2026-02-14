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
 *   - Return object: { baseAmount:amount, gstRate, gstAmount, totalAmount }
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
 * @returns {{ baseAmount:amount: number, gstRate: number, gstAmount: number, totalAmount: number } | null}
 *
 * @example
 *   calculateGST(1000, "electronics")
 *   // => { baseAmount:amount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
 *
 *   calculateGST(500, "essential")
 *   // => { baseAmount:amount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500 }
 */
export function calculateGST(amount, category) {
  if (!Number.isFinite(amount) || amount <= 0 || typeof category !== 'string' || typeof category === "undefined") {
    return null
  }

  let gstRate;
  const categoryLower = category.toLowerCase();

  if (categoryLower === "essential") {
    gstRate = 0;
  } else if (categoryLower === "food") {
    gstRate = 5;
  } else if (categoryLower === "standard") {
    gstRate = 12;
  } else if (categoryLower === "electronics") {
    gstRate = 18;
  } else if (categoryLower === "luxury") {
    gstRate = 28;
  } else {
    return null;
  }

  let gstAmount = amount * gstRate / 100;
  let totalAmount = amount + gstAmount;

  gstAmount = parseFloat(gstAmount.toFixed(2));
  totalAmount = parseFloat(totalAmount.toFixed(2));

  return { baseAmount: amount, gstRate: gstRate, gstAmount: gstAmount, totalAmount: totalAmount };
}
