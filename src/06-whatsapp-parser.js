/**
 * 💬 WhatsApp Message Parser
 *
 * Chintu ek WhatsApp chat analyzer bana raha hai. Usse raw WhatsApp
 * exported message line parse karni hai aur usme se date, time, sender,
 * aur message alag alag extract karna hai.
 *
 * WhatsApp export format:
 *   "DD/MM/YYYY, HH:MM - Sender Name: Message text here"
 *
 * Rules:
 *   - Date extract karo: string ke start se pehle ", " (comma-space) tak
 *   - Time extract karo: ", " ke baad se " - " (space-dash-space) tak
 *   - Sender extract karo: " - " ke baad se pehle ": " (colon-space) tak
 *   - Message text extract karo: pehle ": " ke baad (after sender) sab kuch, trimmed
 *   - wordCount: message ke words count karo (split by space, filter empty strings)
 *   - Sentiment detection (case-insensitive check on message text):
 *     - Agar message mein "😂" ya ":)" ya "haha" hai => sentiment = "funny"
 *     - Agar message mein "❤" ya "love" ya "pyaar" hai => sentiment = "love"
 *     - Otherwise => sentiment = "neutral"
 *     - Agar dono match hote hain, "funny" gets priority
 *   - Hint: Use indexOf(), substring()/slice(), includes(), split(),
 *     trim(), toLowerCase()
 *
 * Validation:
 *   - Agar input string nahi hai, return null
 *   - Agar string mein " - " nahi hai ya ": " nahi hai (after sender), return null
 *
 * @param {string} message - Raw WhatsApp exported message line
 * @returns {{ date: string, time: string, sender: string, text: string, wordCount: number, sentiment: string } | null}
 *
 * @example
 *   parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Bhai party kab hai? 😂")
 *   // => { date: "25/01/2025", time: "14:30", sender: "Rahul",
 *   //      text: "Bhai party kab hai? 😂", wordCount: 5, sentiment: "funny" }
 *
 *   parseWhatsAppMessage("01/12/2024, 09:15 - Priya: I love this song")
 *   // => { date: "01/12/2024", time: "09:15", sender: "Priya",
 *   //      text: "I love this song", wordCount: 4, sentiment: "love" }
 */
export function parseWhatsAppMessage(message) {
  if (typeof message !== "string" || !message.includes("-") || !message.includes(":")) {
    return null
  }

  let comma = message.indexOf(",")
  let dash = message.indexOf(" - ")
  let colon = message.indexOf(": ", dash)  // Search for ": " AFTER the dash

  // If ": " is not found after the sender, return null
  if (colon === -1) {
    return null
  }

  let date = message.slice(0, comma)
  let time = message.slice(comma + 2, dash)
  let sender = message.slice(dash + 3, colon)
  let mes = message.slice(colon + 2).trim()

  let split = mes.split(" ")
  let result = split.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  });

  let filter = result.length

  let sentiment = "neutral"
  let lowerMessage = mes.toLowerCase()

  let funnyEmojiPattern = /[\u{1F602}\u{1F923}\u{1F604}\u{1F606}]/u
  let loveEmojiPattern = /[\u{2764}\u{1F495}\u{1F496}\u{1F497}\u{1F493}]/u

  if (lowerMessage.includes("haha") || message.includes(":)") || funnyEmojiPattern.test(message)) {
    sentiment = "funny"
  }
  else if (lowerMessage.includes("love") || lowerMessage.includes("pyaar") || loveEmojiPattern.test(message)) {
    sentiment = "love"
  }

  return { date: date, time: time, sender: sender, text: mes, wordCount: filter, sentiment: sentiment }
}