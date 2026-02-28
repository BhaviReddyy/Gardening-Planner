const pests = [
    {
        id: 1, name: "Aphids", emoji: "🐛", severity: "moderate",
        description: "Tiny soft-bodied insects that cluster on new growth, sucking plant sap.",
        symptoms: ["Curling or yellowing leaves", "Sticky honeydew residue", "Stunted growth", "Sooty mold on leaves"],
        prevention: ["Encourage ladybugs and lacewings", "Use reflective mulch", "Inspect plants regularly", "Avoid over-fertilizing with nitrogen"],
        treatment: ["Spray with strong water stream", "Apply neem oil", "Use insecticidal soap", "Release beneficial insects"],
        affectedPlants: ["Rose", "Tomato", "Pepper", "Lettuce", "Most garden plants"],
        season: ["spring", "summer"]
    },
    {
        id: 2, name: "Powdery Mildew", emoji: "🍄", severity: "moderate",
        description: "Fungal disease appearing as white powdery coating on leaves and stems.",
        symptoms: ["White powdery spots on leaves", "Leaf yellowing and curling", "Distorted new growth", "Premature leaf drop"],
        prevention: ["Ensure good air circulation", "Avoid overhead watering", "Space plants properly", "Choose resistant varieties"],
        treatment: ["Apply sulfur-based fungicide", "Spray milk solution (1:9 ratio)", "Remove affected leaves", "Use baking soda spray"],
        affectedPlants: ["Zucchini", "Cucumber", "Rose", "Sage", "Dahlia"],
        season: ["summer", "fall"]
    },
    {
        id: 3, name: "Slugs & Snails", emoji: "🐌", severity: "low",
        description: "Mollusks that feed at night, leaving irregular holes and slime trails on plants.",
        symptoms: ["Irregular holes in leaves", "Slime trails on soil and plants", "Seedling damage overnight", "Damage to low-hanging fruit"],
        prevention: ["Remove hiding spots (boards, debris)", "Water in morning not evening", "Use copper tape barriers", "Encourage ground beetles"],
        treatment: ["Handpick at night with flashlight", "Beer traps", "Iron phosphate bait", "Diatomaceous earth around plants"],
        affectedPlants: ["Lettuce", "Strawberry", "Basil", "Dahlia", "Hosta"],
        season: ["spring", "summer", "fall"]
    },
    {
        id: 4, name: "Tomato Hornworm", emoji: "🐛", severity: "high",
        description: "Large green caterpillars that can defoliate tomato plants quickly.",
        symptoms: ["Large sections of leaves eaten", "Dark droppings on leaves", "Stripped stems", "Damage to green fruit"],
        prevention: ["Till soil in fall to destroy pupae", "Plant dill to attract parasitic wasps", "Rotate crops annually", "Inspect plants daily"],
        treatment: ["Handpick and destroy", "Apply Bt (Bacillus thuringiensis)", "Encourage parasitic wasps", "Use black UV lights at night to spot them"],
        affectedPlants: ["Tomato", "Pepper", "Eggplant", "Potato"],
        season: ["summer"]
    },
    {
        id: 5, name: "Japanese Beetles", emoji: "🪲", severity: "high",
        description: "Metallic green beetles that skeletonize leaves and damage flowers.",
        symptoms: ["Skeletonized leaves (veins remain)", "Damaged flowers and buds", "Brown patches in lawn (grub damage)", "Groups of beetles on plants"],
        prevention: ["Apply milky spore to lawn for grubs", "Use row covers", "Plant resistant varieties", "Avoid traps near garden"],
        treatment: ["Handpick into soapy water", "Apply neem oil", "Use pheromone traps away from garden", "Treat lawn with beneficial nematodes"],
        affectedPlants: ["Rose", "Japanese Maple", "Grape", "Linden", "Hibiscus"],
        season: ["summer"]
    },
    {
        id: 6, name: "Spider Mites", emoji: "🕷️", severity: "moderate",
        description: "Tiny arachnids that cause stippled, faded leaves. Thrive in hot, dry conditions.",
        symptoms: ["Fine webbing on undersides of leaves", "Stippled or speckled leaves", "Yellowing and bronzing", "Leaf drop in severe cases"],
        prevention: ["Maintain humidity around plants", "Keep plants well-watered", "Avoid dusty conditions", "Encourage predatory mites"],
        treatment: ["Spray leaves with water forcefully", "Apply miticide or neem oil", "Use insecticidal soap", "Release predatory mites"],
        affectedPlants: ["Rosemary", "Mint", "Rose", "Snake Plant", "Orchid"],
        season: ["summer"]
    },
    {
        id: 7, name: "Root Rot", emoji: "🦠", severity: "high",
        description: "Fungal disease caused by overwatering, leading to decay of roots.",
        symptoms: ["Wilting despite moist soil", "Yellowing lower leaves", "Mushy brown roots", "Foul smell from soil"],
        prevention: ["Ensure proper drainage", "Don't overwater", "Use well-draining soil mix", "Allow soil to dry between waterings"],
        treatment: ["Remove plant and trim dead roots", "Repot in fresh, sterile soil", "Reduce watering frequency", "Apply fungicide to remaining roots"],
        affectedPlants: ["Orchid", "Succulent", "Aloe Vera", "Snake Plant", "Lavender"],
        season: ["spring", "summer", "fall", "winter"]
    },
    {
        id: 8, name: "Blossom End Rot", emoji: "🟤", severity: "moderate",
        description: "Dark, sunken spots on the bottom of fruit caused by calcium imbalance.",
        symptoms: ["Dark, leathery patches on fruit bottom", "Sunken, watery areas", "Affects first fruits most", "Not a spreading disease"],
        prevention: ["Maintain consistent watering", "Add calcium to soil before planting", "Mulch to retain moisture", "Avoid excessive nitrogen"],
        treatment: ["Remove affected fruit", "Water deeply and regularly", "Add calcium foliar spray", "Mulch around plants"],
        affectedPlants: ["Tomato", "Pepper", "Zucchini", "Eggplant"],
        season: ["summer"]
    }
];

export default pests;
