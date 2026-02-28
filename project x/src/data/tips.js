const tips = [
    {
        id: 1, title: "Know Your Hardiness Zone",
        category: "beginner", season: "all", emoji: "🗺️",
        content: "Understanding your USDA hardiness zone is the first step to successful gardening. It tells you which plants will thrive in your climate and when to plant them.",
        steps: ["Find your zone at planthardiness.ars.usda.gov", "Match plants to your zone before purchasing", "Note your first and last frost dates", "Keep a micro-climate journal for your specific garden"]
    },
    {
        id: 2, title: "Water Wisely: Morning is Best",
        category: "beginner", season: "summer", emoji: "💧",
        content: "Watering in the early morning gives plants time to absorb moisture before the heat of the day. Evening watering can lead to fungal problems as moisture sits overnight.",
        steps: ["Water between 6-10 AM", "Water at the base, not leaves", "Use soaker hoses or drip irrigation", "Check soil moisture before watering"]
    },
    {
        id: 3, title: "Companion Planting Guide",
        category: "intermediate", season: "spring", emoji: "🤝",
        content: "Some plants grow better together! Companion planting can improve pollination, deter pests, and make efficient use of garden space.",
        steps: ["Plant basil near tomatoes to repel flies", "Grow marigolds throughout your garden for pest control", "Pair carrots with onions — each deters the other's pests", "Avoid planting dill near carrots"]
    },
    {
        id: 4, title: "Composting 101",
        category: "beginner", season: "all", emoji: "♻️",
        content: "Composting transforms kitchen scraps and yard waste into nutrient-rich soil amendment. It's the single best thing you can do for your garden's health.",
        steps: ["Set up a bin in a shady spot", "Layer greens (nitrogen) and browns (carbon) 1:3", "Keep moist like a wrung-out sponge", "Turn weekly for faster decomposition"]
    },
    {
        id: 5, title: "Succession Planting for Continuous Harvest",
        category: "intermediate", season: "spring", emoji: "🔄",
        content: "Instead of planting all your seeds at once, stagger plantings every 2-3 weeks. This ensures a steady supply of fresh produce throughout the season.",
        steps: ["Start with lettuce, radishes, and beans", "Plant new rows every 2-3 weeks", "Note days-to-harvest on seed packets", "Calculate backward from your first frost date"]
    },
    {
        id: 6, title: "Preparing Your Garden for Winter",
        category: "seasonal", season: "fall", emoji: "❄️",
        content: "Proper fall preparation protects your garden through winter and gives you a head start in spring.",
        steps: ["Remove dead plants and debris", "Plant garlic and cover crops", "Apply compost and mulch", "Clean and store tools properly", "Protect perennials with mulch blankets"]
    },
    {
        id: 7, title: "Natural Pest Control Methods",
        category: "intermediate", season: "summer", emoji: "🐞",
        content: "Chemical pesticides can harm beneficial insects and pollinators. Natural methods are safer for your garden ecosystem.",
        steps: ["Attract beneficial insects with diverse plantings", "Use neem oil for soft-bodied pests", "Apply diatomaceous earth around plants", "Handpick larger pests", "Install bird houses for natural pest control"]
    },
    {
        id: 8, title: "Soil Testing and Amendment",
        category: "advanced", season: "spring", emoji: "🧪",
        content: "Healthy soil is the foundation of a great garden. Testing your soil helps you understand what amendments are needed for optimal plant growth.",
        steps: ["Get a soil test kit from your extension office", "Test pH, nitrogen, phosphorus, and potassium", "Amend clay soil with comite and gypsum", "Add lime to raise pH, sulfur to lower it"]
    },
    {
        id: 9, title: "Mulching Mastery",
        category: "beginner", season: "spring", emoji: "🍂",
        content: "A 2-3 inch layer of mulch conserves moisture, suppresses weeds, and regulates soil temperature. It's one of the easiest ways to improve your garden.",
        steps: ["Apply 2-3 inches of organic mulch", "Keep mulch 2 inches from plant stems", "Replenish mulch as it decomposes", "Use shredded leaves, straw, or wood chips"]
    },
    {
        id: 10, title: "Pruning for Better Growth",
        category: "intermediate", season: "spring", emoji: "✂️",
        content: "Proper pruning encourages healthy growth, better air circulation, and more flowers/fruit. The key is knowing when and how much to cut.",
        steps: ["Prune spring bloomers after they flower", "Prune summer bloomers in late winter", "Always use clean, sharp tools", "Remove dead, damaged, and crossing branches first"]
    },
    {
        id: 11, title: "Starting Seeds Indoors",
        category: "beginner", season: "winter", emoji: "🌱",
        content: "Getting a jump on the growing season by starting seeds indoors gives your plants extra weeks of growth before transplanting outside.",
        steps: ["Start 6-8 weeks before last frost", "Use seed starting mix, not garden soil", "Provide consistent moisture and warmth", "Harden off seedlings before transplanting"]
    },
    {
        id: 12, title: "Building Raised Beds",
        category: "advanced", season: "spring", emoji: "🪵",
        content: "Raised beds offer better drainage, easier access, fewer weeds, and the ability to customize your soil. They're perfect for beginners and experienced gardeners alike.",
        steps: ["Choose untreated cedar or composite lumber", "Build beds 4 feet wide for easy reach", "Fill with a mix of topsoil, compost, and peat", "Position beds in a sunny location"]
    }
];

export default tips;

export const tipCategories = [
    { id: "all", label: "All Tips" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
    { id: "seasonal", label: "Seasonal" }
];
