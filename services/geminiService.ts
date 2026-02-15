import { SCHOOL_INFO, THOUGHTS } from "../constants.tsx";

/**
 * LOCAL INTELLIGENCE ENGINE (No API Key Required)
 * This replaces the Gemini API with a fast, local knowledge base.
 */
const LOCAL_KNOWLEDGE: Record<string, string> = {
  // General Science & Nature
  "sky": "The sky looks blue because of how sunlight interacts with the atmosphere! It's like a big blue blanket for Earth. ☁️",
  "sun": "The sun is a giant star that gives us light and warmth! It's the center of our solar system. ☀️",
  "moon": "The moon is Earth's best friend in space! It reflects sunlight to glow at night. 🌙",
  "star": "Stars are giant glowing balls of gas far away in space. They're like distant suns! ✨",
  "water": "Water is life! It covers most of our planet and we need it to stay healthy. 💧",
  "dinosaur": "Dinosaurs were amazing creatures that lived millions of years ago. Some were huge like houses! 🦖",
  
  // School Specifics
  "ai": "AI stands for Artificial Intelligence. At Gurukul, we teach computers how to think and help us solve problems! 🤖",
  "school": `${SCHOOL_INFO.name} is the best place to learn and play! We've been a leader in education since ${SCHOOL_INFO.estd}. 🏫`,
  "admission": `Admissions are currently open for Playgroup to Class 5! We'd love to have you join our school family. 🎒`,
  "principal": `${SCHOOL_INFO.principal} is our wonderful leader who has been guiding Gurukul for over 34 years! 👩‍🏫`,
  "meerut": "Meerut is a historic city known as the 'Sports City of India'. We are proud to be located in Meerut Cantt! 🏅",
  "fee": "Our fee structure is very affordable for families. Please call us at ${SCHOOL_INFO.phone} for the current schedule. 💰",
  "contact": `You can reach us at ${SCHOOL_INFO.phone} or visit us near Hazari Ka Piyau, Meerut Cantt! 📞`,
  "location": `We are located at ${SCHOOL_INFO.address}. Come visit our green campus! 📍`,
  
  // Activities
  "yoga": "We practice Yoga to keep our bodies strong and our minds calm and happy! 🧘‍♂️",
  "coding": "Even our youngest students learn the logic of coding to build the future! ⌨️",
  "sport": "We love sports! We have a big playground for football, cricket, and fun games. ⚽",
};

/**
 * Generates a response using local logic (Instant and No API required)
 */
export const generateSchoolAssistantResponse = async (userPrompt: string) => {
  const promptLower = userPrompt.toLowerCase();
  const contactSuffix = `\n\nNeed to know more? Call us at ${SCHOOL_INFO.phone}! 📞✨`;

  // 1. Check for specific keywords in our local knowledge base
  for (const [key, value] of Object.entries(LOCAL_KNOWLEDGE)) {
    if (promptLower.includes(key)) {
      return value + contactSuffix;
    }
  }

  // 2. Handle greetings
  if (promptLower.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hi there! I'm Guru, your school buddy. I can tell you about our school, admissions, or even fun science facts! What would you like to know? 👋" + contactSuffix;
  }

  // 3. Handle thanks
  if (promptLower.includes("thank")) {
    return "You're very welcome! Helping friends is my favorite thing to do. 😊" + contactSuffix;
  }

  // 4. Default fallback for unknown questions
  return "That's a very interesting question! I'm still learning about that. Why don't you ask a teacher or call our office at " + SCHOOL_INFO.phone + "? They'd love to help! 🌟" + contactSuffix;
};

/**
 * Returns a daily thought from our pre-defined local list.
 */
export const getDailyThought = async () => {
  // Simply pick a random thought from the constants file
  return THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
};