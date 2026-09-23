// Structured version of content/register-checkout-and-age-restricted-sales.md.
// Kept in sync by hand for now — see README for the plan to parse this
// directly from the markdown SOP once that's worth automating.

export const sop = {
  title: "Front Register: Standard Checkout & Age-Restricted Sales",
  applies: "Cashiers, shift leads, and any employee operating the front register at a convenience store or gas station.",
  sections: [
    {
      id: "purpose",
      title: "Purpose",
      kind: "text",
      body: "Ring up customer purchases accurately and, for any age-restricted product, confirm the customer is legally old enough to buy it before the sale completes. Getting this wrong isn't just a bad customer interaction — it's a compliance violation that can cost the store its license to sell tobacco, alcohol, or lottery products, and can carry personal liability for the employee in many states.",
    },
    {
      id: "checkout",
      title: "Standard Checkout Procedure",
      kind: "steps",
      steps: [
        "Greet the customer as they approach the register.",
        "Scan each item. Confirm the price/description on screen matches the item as you scan — catch mis-scans before totaling, not after.",
        "For any age-restricted item, do not scan it yet — verify ID first (next section), then come back.",
        "State the total clearly before taking payment.",
        "Process payment (cash, card, mobile pay per your register's supported methods).",
        "For cash: count change back to the customer out loud.",
        "Offer a receipt. Bag items if requested.",
        "Thank the customer.",
      ],
    },
    {
      id: "age",
      title: "Age-Restricted Sale Procedure",
      kind: "steps",
      steps: [
        "When an age-restricted item is scanned, the register prompts for a birthdate entry or ID check — do not override or skip this prompt.",
        "If the customer visually appears under the store's verification age (default: under ~40), ask for ID before scanning the item — every time, no exceptions for regulars.",
        "Check the ID: acceptable type, not expired, calculate current age from the birthdate (don't eyeball it), photo reasonably matches the customer.",
        "If age and ID check out: enter the birthdate into the register, complete the scan, continue checkout normally.",
        "If underage, ID is expired/unacceptable, or you have any doubt: refuse the sale using the neutral script — \"I'm not able to sell this without valid ID that meets our age requirement — I can ring up everything else, or you're welcome to come back with ID.\"",
        "Remove the age-restricted item and continue checkout with the remaining items if the customer wants to proceed.",
      ],
    },
    {
      id: "exceptions",
      title: "Exceptions & Edge Cases",
      kind: "cases",
      items: [
        { label: "Customer has no ID on them", body: "Refuse the age-restricted item. No manager override exists for this — it's a hard stop." },
        { label: "ID looks altered, damaged, or fake", body: "Refuse the sale using the same neutral script. Don't confront the customer directly. If genuinely concerned it's fraudulent, notify a manager after the customer leaves." },
        { label: "Customer becomes argumentative about being carded", body: "Stay neutral, repeat the script once. If it continues, call a manager over rather than engaging further yourself." },
        { label: "Register system is down during an age check", body: "Do not manually override the age check by estimation. Hold age-restricted sales or escalate to a manager for the store's documented manual fallback." },
        { label: "You personally know the customer's age", body: "Still follow the ID check procedure. Personal knowledge doesn't replace the documented process." },
      ],
    },
    {
      id: "escalation",
      title: "Escalation — When to Call a Manager",
      kind: "list",
      items: [
        "Suspected fake or altered ID",
        "Customer dispute or aggressive reaction to a refused sale",
        "Register/system malfunction during an age-restricted transaction",
        "Any till discrepancy discovered during or after a shift",
        "Any situation not clearly covered by this SOP",
      ],
    },
  ],
  quiz: [
    {
      q: "A customer wants to buy alcohol and has no ID on them at all. What do you do?",
      options: [
        "Sell it anyway if they seem clearly over 21",
        "Refuse the sale — there's no manager override for missing ID",
        "Ask a manager to vouch for their age",
        "Sell it but write down their name for the record",
      ],
      correct: 1,
      explain: "No ID means a hard stop, every time — this is the one case with no override, from anyone, at any level.",
    },
    {
      q: "The register prompts for a birthdate on an age-restricted item. What's the right move?",
      options: [
        "Skip the prompt if you already checked the ID",
        "Enter the actual birthdate from the ID into the prompt",
        "Enter today's date to move faster",
        "Override the prompt using a manager code",
      ],
      correct: 1,
      explain: "The prompt exists precisely so the register — not your memory — has an accurate record. Always enter the real birthdate.",
    },
    {
      q: "A regular customer you already know is clearly over 40 wants tobacco. Do you still ask for ID?",
      options: [
        "No — you already know their age",
        "Only if a manager is nearby",
        "Yes — the procedure applies regardless of personal knowledge",
        "Only on their first purchase of the day",
      ],
      correct: 2,
      explain: "Personal knowledge doesn't replace the documented process — it protects you as much as the store.",
    },
    {
      q: "A customer gets upset and argumentative after being asked for ID. What's the right response?",
      options: [
        "Argue back to explain the policy in detail",
        "Sell the item anyway to end the conflict",
        "Stay neutral, repeat the script once, then get a manager if it continues",
        "Ignore them and move to the next customer",
      ],
      correct: 2,
      explain: "Staying neutral and escalating to a manager, rather than engaging further yourself, is the documented de-escalation path.",
    },
  ],
};
