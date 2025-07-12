// App-wide constants
export const APP_CONFIG = {
//   name: "Meme Aunty",
//   description: "AI Meme Generator",
  maxCredits: 10,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"],
}

export const STATES = {
  UPLOAD: "upload",
  VIBE: "vibe", 
  RESULT: "result",
  NO_CREDITS: "no_credits"
}

export const STEPS = [
  { id: 1, label: "Upload", icon: "📁" },
  { id: 2, label: "Choose Vibe", icon: "🎭" },
  { id: 3, label: "Generate", icon: "🍳" },
  { id: 4, label: "Done", icon: "🎉" }
]

export const LOADING_MESSAGES = [
  "Aunty ji is cooking your meme 🍳",
  "Adding the perfect spice 🌶️",
  "Mixing humor with AI magic ✨",
  "Almost ready, just adding finishing touches 🎨",
  "Your meme is getting the aunty approval 👩🏼‍🦰 "
]

export const STATE_CONFIGS = {
  [STATES.UPLOAD]: {
    title: "Welcome Beta!",
    message: "Aunty ji is ready to work her magic. Upload your photo, and let's create something hilarious!",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
    shadowColor: "shadow-purple-200",
    animation: "animate-bounce"
  },
  [STATES.VIBE]: {
    title: "Great Choice!",
    message: "Perfect photo! Now choose how you want me to spice it up with humor.",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300", 
    shadowColor: "shadow-blue-200",
    animation: "animate-pulse"
  },
  [STATES.RESULT]: {
    title: "Masterpiece Ready!",
    message: "Your meme is ready, beta! Share it with the world and let everyone enjoy Aunty's humor!",
    bgColor: "bg-green-100",
    borderColor: "border-green-300",
    shadowColor: "shadow-green-200",
    animation: "animate-bounce"
  },
  [STATES.NO_CREDITS]: {
    title: "Sorry Beta! No More Memes",
    message: "You've used all your free memes for today. Come back tomorrow to enjoy more free Memes!",
    bgColor: "bg-red-100",
    borderColor: "border-red-300",
    shadowColor: "shadow-red-200",
    animation: "animate-shake"
  }
}
