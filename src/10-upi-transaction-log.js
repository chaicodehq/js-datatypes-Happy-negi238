/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
  if (
    Array.isArray(transactions) &&
    transactions !== null &&
    !transactions.includes(null) &&
    transactions.length > 0
  ) {
    const checkValue = transactions.every((item) => {
      return (
        typeof item.id !== "string" ||
        item.amount < 0 ||
        typeof item.type !== "string" ||
        (item.type !== "credit" && item.type !== "debit") ||
        typeof item.to !== "string" ||
        typeof item.category !== "string" ||
        typeof item.date !== "string"
      );
    });

    if (checkValue) {
      return null;
    }

    let totalCredit = 0;
    let totalDebit = 0;
    let transactionCount = 0;

    transactions.filter((item) => {
      if (item.amount < 0) {
        return null;
      }

      if (item.type === "credit") {
        totalCredit = totalCredit + item.amount;
      } else if (item.type === "debit") {
        totalDebit = totalDebit + item.amount;
      }

      if (
        item.amount > 0 &&
        (item.type === "credit" || item.type === "debit")
      ) {
        transactionCount++;
      }
    });

    const highestTransaction = transactions.reduce((acc, curr) => {
      return acc.amount < curr.amount ? curr : acc;
    });

    const netBalance = totalCredit - totalDebit;
    const avgTransaction = Math.round(
      (totalCredit + totalDebit) / transactionCount,
    );
    const categoryBreakdown = {};

    transactions.forEach((item) => {
      let itemAmount = 0;
      const itemCategory = item.category;
      if (!categoryBreakdown.hasOwnProperty(itemCategory)) {
        itemAmount = item.amount + itemAmount;
        categoryBreakdown[itemCategory] = itemAmount;
      } else if (categoryBreakdown.hasOwnProperty(itemCategory)) {
        itemAmount = categoryBreakdown[itemCategory] + item.amount;
        categoryBreakdown[itemCategory] = itemAmount;
      }
    });

    const frequentValue = {};
    transactions.forEach((item) => {
      const itemTo = item.to;
      frequentValue[itemTo] = (frequentValue[itemTo] || 0) + 1;
    });

    const frequentContact = Object.keys(frequentValue).reduce((acc, curr) => {
      return frequentValue[acc] >= frequentValue[curr] ? acc : curr;
    });

    const allAbove100 = transactions.every((item) => {
      return item.amount > 100;
    });

    const hasLargeTransaction = transactions.some((item) => {
      return item.amount >= 5000;
    });

    return {
      totalCredit: totalCredit,
      totalDebit: totalDebit,
      netBalance: netBalance,
      transactionCount: transactionCount,
      avgTransaction: avgTransaction,
      highestTransaction: highestTransaction,
      categoryBreakdown: categoryBreakdown,
      frequentContact: frequentContact,
      allAbove100: allAbove100,
      hasLargeTransaction: hasLargeTransaction,
    };
  } else {
    return null;
  }
}
