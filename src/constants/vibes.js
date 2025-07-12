// Constants for vibe configurations
export const VIBES = [
  {
    id: "wholesome",
    label: "Wholesome",
    emoji: "😂",
    description: "Funny & relatable",
    value: 0,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    activeColors: "bg-purple-200 text-purple-900 border-purple-400 ring-4 ring-purple-100",
    gradientColors: "from-purple-400 to-purple-600",
    preview: "Your memes will be wholesome and relatable 😂",
    auntyImage: "/wholesome.png"
},
{
    id: "spicy",
    label: "Spicy",
    emoji: "🔥",
    description: "Hot takes only",
    value: 50,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    activeColors: "bg-yellow-200 text-yellow-900 border-yellow-400 ring-4 ring-yellow-100",
    gradientColors: "from-yellow-400 to-orange-500",
    preview: "Get ready for some fire content 🔥",
    auntyImage: "/spicy-nobg.png"
},
{
    id: "savage",
    label: "Brutal",
    emoji: "💀",
    description: "No mercy mode",
    value: 100,
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    activeColors: "bg-gray-200 text-gray-900 border-gray-400 ring-4 ring-gray-100",
    gradientColors: "from-gray-500 to-gray-700",
    preview: "No chill mode activated 💀",
    auntyImage: "/savage-nobg.png"
}
]

export const VIBE_EMOJIS = {
  wholesome: "😂",
  spicy: "🔥",
  savage: "💀"
}

export const VIBE_COLORS = {
  wholesome: "from-purple-400 to-purple-600",
  spicy: "from-yellow-400 to-orange-500",
  savage: "from-gray-500 to-gray-700"
}

export const MOCK_CAPTIONS = {
  wholesome: "When you finally understand the assignment and it hits different 😂✨",
  spicy: "POV: You're about to drop the hottest take of 2024 🔥💯",
  savage: "Me watching people make the same mistake I warned them about 💀"
}
