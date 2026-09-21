export const categories = [
  { id: "cars", name: "Cars & Bikes", icon: "🏎️", description: "Supercars, Muscle Cars, JDM & More" },
  { id: "anime", name: "Anime", icon: "⚔️", description: "Naruto, One Piece, Dragon Ball & More" },
  { id: "gaming", name: "Gaming", icon: "🎮", description: "GTA, Valorant, Minecraft & More" },
  { id: "sports", name: "Sports", icon: "⚽", description: "Football, Cricket, F1 & More" },
  { id: "marvel", name: "Marvel", icon: "🦸", description: "Avengers, Spider-Man, Iron Man & More" },
  { id: "dc", name: "DC", icon: "🦇", description: "Batman, Joker, Superman & More" },
  { id: "movies", name: "Movies", icon: "🎬", description: "Fight Club, Interstellar & More" },
  { id: "music", name: "Music", icon: "🎵", description: "Hip-Hop, Vinyl, Aesthetic & More" },
  { id: "motivational", name: "Motivational", icon: "💪", description: "Hustle, Discipline, Grind & More" },
  { id: "islamic", name: "Islamic", icon: "🕌", description: "Calligraphy, Quran Verses, Masjid & More" },
];

export const sizes = {
  A6: { label: "A6 Card", dimensions: "10.5 × 14.8 cm", priceKey: "A6" },
  A5: { label: "A5 Poster", dimensions: "14.8 × 21 cm", priceKey: "A5" },
  A4: { label: "A4 Poster", dimensions: "21 × 29.7 cm", priceKey: "A4" },
  A3: { label: "A3 Poster", dimensions: "29.7 × 42 cm", priceKey: "A3" },
};

export const products = [
  // CARS & BIKES
  { id: "porsche-911-gt3-rs", name: "Porsche 911 GT3 RS", category: "cars", subcategory: "concept-cars", tags: ["porsche", "sports-car", "racing"], colors: ["white", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "bmw-m4-dominance", name: "BMW M4 Dominance", category: "cars", subcategory: "solid-cars", tags: ["bmw", "luxury", "german"], colors: ["black", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "nissan-skyline-r34", name: "Nissan Skyline R34", category: "cars", subcategory: "concept-cars", tags: ["nissan", "jdm", "fast-furious"], colors: ["blue", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "ford-mustang-1969", name: "Ford Mustang 1969", category: "cars", subcategory: "solid-cars", tags: ["ford", "muscle", "classic"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "lamborghini-aventador", name: "Lamborghini Aventador", category: "cars", subcategory: "concept-cars", tags: ["lamborghini", "supercar", "italian"], colors: ["yellow", "green"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "ferrari-f40", name: "Ferrari F40 Competizione", category: "cars", subcategory: "concept-cars", tags: ["ferrari", "classic", "racing"], colors: ["red", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "mercedes-amg-gt", name: "Mercedes AMG GT", category: "cars", subcategory: "solid-cars", tags: ["mercedes", "amg", "luxury"], colors: ["silver", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "dodge-charger", name: "Dodge Charger Classic", category: "cars", subcategory: "solid-cars", tags: ["dodge", "muscle", "american"], colors: ["black", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "toyota-supra-mk4", name: "Toyota Supra MK4", category: "cars", subcategory: "concept-cars", tags: ["toyota", "jdm", "drift"], colors: ["orange", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "bmw-m2-vector", name: "BMW M2 Vector Style", category: "cars", subcategory: "vector-car", tags: ["bmw", "vector", "art"], colors: ["white", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "gtr-vector", name: "Nissan GTR Vector Art", category: "cars", subcategory: "vector-car", tags: ["nissan", "gtr", "vector"], colors: ["black", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "defender-snowline", name: "Land Rover Defender", category: "cars", subcategory: "solid-cars", tags: ["land-rover", "suv", "offroad"], colors: ["white", "green"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "kawasaki-ninja", name: "Kawasaki Ninja H2R", category: "cars", subcategory: "bikes", tags: ["kawasaki", "bike", "racing"], colors: ["green", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "ducati-panigale", name: "Ducati Panigale V4", category: "cars", subcategory: "bikes", tags: ["ducati", "bike", "italian"], colors: ["red", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "yamaha-r15", name: "Yamaha R15 M", category: "cars", subcategory: "bikes", tags: ["yamaha", "bike", "indian"], colors: ["blue", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // ANIME
  { id: "naruto-sage-mode", name: "Naruto Sage Mode", category: "anime", subcategory: "naruto", tags: ["naruto", "sage", "shippuden"], colors: ["orange", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "luffy-gear-5", name: "Luffy Gear 5", category: "anime", subcategory: "one-piece", tags: ["luffy", "one-piece", "gear-5"], colors: ["white", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "goku-ultra-instinct", name: "Goku Ultra Instinct", category: "anime", subcategory: "dragon-ball", tags: ["goku", "dragon-ball", "ultra-instinct"], colors: ["silver", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "gojo-satoru", name: "Gojo Satoru", category: "anime", subcategory: "jujutsu-kaisen", tags: ["gojo", "jujutsu-kaisen", "blindfold"], colors: ["blue", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "levi-ackerman", name: "Levi Ackerman", category: "anime", subcategory: "attack-on-titan", tags: ["levi", "attack-on-titan", "captain"], colors: ["black", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "sasuke-sharingan", name: "Sasuke Sharingan", category: "anime", subcategory: "naruto", tags: ["sasuke", "sharingan", "uchiha"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "tanjiro-water-breathing", name: "Tanjiro Water Breathing", category: "anime", subcategory: "demon-slayer", tags: ["tanjiro", "demon-slayer", "water"], colors: ["blue", "green"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "zoro-three-swords", name: "Zoro Three Sword Style", category: "anime", subcategory: "one-piece", tags: ["zoro", "one-piece", "swordsman"], colors: ["green", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "itachi-crows", name: "Itachi Uchiha Crows", category: "anime", subcategory: "naruto", tags: ["itachi", "uchiha", "crows"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "eren-titan", name: "Eren Founding Titan", category: "anime", subcategory: "attack-on-titan", tags: ["eren", "titan", "final-season"], colors: ["green", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "megumi-phantom", name: "Megumi Phantom Beast", category: "anime", subcategory: "jujutsu-kaisen", tags: ["megumi", "jujutsu-kaisen", "shikigami"], colors: ["blue", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "killua-godspeed", name: "Killua Godspeed", category: "anime", subcategory: "hunter-x-hunter", tags: ["killua", "hunter", "lightning"], colors: ["blue", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // GAMING
  { id: "gta-v-finance", name: "GTA V Los Santos", category: "gaming", subcategory: "gta", tags: ["gta", "rockstar", "los-santos"], colors: ["green", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "valorant-jett", name: "Valorant Jett", category: "gaming", subcategory: "valorant", tags: ["valorant", "jett", "agent"], colors: ["blue", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "minecraft-creeper", name: "Minecraft Creeper", category: "gaming", subcategory: "minecraft", tags: ["minecraft", "creeper", "pixel"], colors: ["green", "brown"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "god-of-war-kratos", name: "God of War Kratos", category: "gaming", subcategory: "action", tags: ["kratos", "god-of-war", "nordic"], colors: ["grey", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "cyberpunk-v", name: "Cyberpunk 2077", category: "gaming", subcategory: "rpg", tags: ["cyberpunk", "night-city", "futuristic"], colors: ["yellow", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "spider-man-miles", name: "Spider-Man Miles Morales", category: "gaming", subcategory: "action", tags: ["spider-man", "playstation", "insomniac"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "pubg-m416", name: "PUBG M416 Skin", category: "gaming", subcategory: "fps", tags: ["pubg", "m416", "weapon"], colors: ["green", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "free-fire-battle", name: "Free Fire Battle", category: "gaming", subcategory: "battle-royale", tags: ["free-fire", "battle-royale", "fire"], colors: ["orange", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "elden-ring", name: "Elden Ring Shadow", category: "gaming", subcategory: "rpg", tags: ["elden-ring", "from-software", "dark-fantasy"], colors: ["gold", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "call-of-duty-ghost", name: "Call of Duty Ghost", category: "gaming", subcategory: "fps", tags: ["cod", "ghost", "military"], colors: ["grey", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // SPORTS
  { id: "ronaldo-goat", name: "Cristiano Ronaldo GOAT", category: "sports", subcategory: "football", tags: ["ronaldo", "football", "goat"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "messi-world-cup", name: "Messi World Cup 2022", category: "sports", subcategory: "football", tags: ["messi", "argentina", "world-cup"], colors: ["blue", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "virat-kohli-18", name: "Virat Kohli #18", category: "sports", subcategory: "cricket", tags: ["virat", "cricket", "india"], colors: ["blue", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "ms-dhoni-7", name: "MS Dhoni #7 Captain", category: "sports", subcategory: "cricket", tags: ["dhoni", "cricket", "captain"], colors: ["yellow", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "f1-verstappen", name: "Max Verstappen #1", category: "sports", subcategory: "f1", tags: ["f1", "verstappen", "red-bull"], colors: ["blue", "yellow"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "lebron-lakers", name: "LeBron James Lakers", category: "sports", subcategory: "basketball", tags: ["lebron", "lakers", "nba"], colors: ["purple", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "neymar-skills", name: "Neymar Skills", category: "sports", subcategory: "football", tags: ["neymar", "football", "skills"], colors: ["yellow", "green"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "sachin-tendulkar", name: "Sachin Tendulkar", category: "sports", subcategory: "cricket", tags: ["sachin", "cricket", "legend"], colors: ["blue", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "ufc-mcgregor", name: "Conor McGregor", category: "sports", subcategory: "ufc", tags: ["mcgregor", "ufc", "champion"], colors: ["green", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "hamilton-mercedes", name: "Lewis Hamilton Mercedes", category: "sports", subcategory: "f1", tags: ["hamilton", "mercedes", "f1"], colors: ["silver", "teal"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // MARVEL
  { id: "iron-man-arc-reactor", name: "Iron Man Arc Reactor", category: "marvel", subcategory: "avengers", tags: ["iron-man", "marvel", "avengers"], colors: ["red", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "spider-man-no-way", name: "Spider-Man No Way Home", category: "marvel", subcategory: "spider-man", tags: ["spider-man", "tom-holland", "no-way-home"], colors: ["red", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "thor-ragnarok", name: "Thor Ragnarok", category: "marvel", subcategory: "avengers", tags: ["thor", "avengers", "ragnarok"], colors: ["blue", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "captain-america", name: "Captain America Shield", category: "marvel", subcategory: "avengers", tags: ["captain-america", "shield", "avengers"], colors: ["blue", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "black-panther", name: "Black Panther", category: "marvel", subcategory: "avengers", tags: ["black-panther", "wakanda", "avengers"], colors: ["black", "purple"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "wolverine-claws", name: "Wolverine Claws", category: "marvel", subcategory: "x-men", tags: ["wolverine", "x-men", "claws"], colors: ["yellow", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "deadpool", name: "Deadpool 4th Wall", category: "marvel", subcategory: "deadpool", tags: ["deadpool", "marvel", "comedy"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // DC
  { id: "batman-dark-knight", name: "Batman Dark Knight", category: "dc", subcategory: "batman", tags: ["batman", "dc", "dark-knight"], colors: ["black", "grey"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "joker-heath", name: "Joker Heath Ledger", category: "dc", subcategory: "villains", tags: ["joker", "dc", "dark-knight"], colors: ["purple", "green"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "superman-classic", name: "Superman Classic", category: "dc", subcategory: "justice-league", tags: ["superman", "dc", "justice-league"], colors: ["blue", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "flash-speed", name: "The Flash Speed", category: "dc", subcategory: "justice-league", tags: ["flash", "dc", "speed"], colors: ["red", "yellow"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "aquaman", name: "Aquaman King", category: "dc", subcategory: "justice-league", tags: ["aquaman", "dc", "ocean"], colors: ["green", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // MOVIES
  { id: "fight-club", name: "Fight Club Rules", category: "movies", subcategory: "thriller", tags: ["fight-club", "brad-pitt", "david-fincher"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "interstellar", name: "Interstellar Space", category: "movies", subcategory: "sci-fi", tags: ["interstellar", "nolan", "space"], colors: ["blue", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "dark-knight-rises", name: "Dark Knight Rises", category: "movies", subcategory: "action", tags: ["batman", "nolan", "rises"], colors: ["black", "grey"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "avengers-endgame", name: "Avengers Endgame", category: "movies", subcategory: "marvel", tags: ["avengers", "marvel", "endgame"], colors: ["blue", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "inception", name: "Inception Dream", category: "movies", subcategory: "sci-fi", tags: ["inception", "nolan", "dream"], colors: ["grey", "blue"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "joker-2019", name: "Joker 2019", category: "movies", subcategory: "drama", tags: ["joker", "phoenix", "dc"], colors: ["red", "purple"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "oppenheimer", name: "Oppenheimer", category: "movies", subcategory: "drama", tags: ["oppenheimer", "nolan", "atomic"], colors: ["orange", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // MUSIC
  { id: "eminem-lose-yourself", name: "Eminem Lose Yourself", category: "music", subcategory: "hip-hop", tags: ["eminem", "hip-hop", "rap"], colors: ["black", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "travis-scott", name: "Travis Scott Astroworld", category: "music", subcategory: "hip-hop", tags: ["travis-scott", "astroworld", "rap"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "kanye-west", name: "Kanye West Donda", category: "music", subcategory: "hip-hop", tags: ["kanye", "donda", "rap"], colors: ["black", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "drake", name: "Drake Certified Lover", category: "music", subcategory: "hip-hop", tags: ["drake", "hip-hop", "rap"], colors: ["pink", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "vinyl-aesthetic", name: "Vinyl Record Aesthetic", category: "music", subcategory: "aesthetic", tags: ["vinyl", "retro", "aesthetic"], colors: ["black", "brown"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "beats-headphones", name: "Beats Headphones Art", category: "music", subcategory: "aesthetic", tags: ["beats", "headphones", "music"], colors: ["red", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // MOTIVATIONAL
  { id: "hustle-grind", name: "Hustle & Grind", category: "motivational", subcategory: "hustle", tags: ["hustle", "grind", "motivation"], colors: ["black", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "discipline-equals-freedom", name: "Discipline Equals Freedom", category: "motivational", subcategory: "discipline", tags: ["discipline", "freedom", "jocko"], colors: ["black", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "never-give-up", name: "Never Give Up", category: "motivational", subcategory: "mindset", tags: ["never-give-up", "mindset", "motivation"], colors: ["black", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "wolf-wall-street", name: "Wolf of Wall Street", category: "motivational", subcategory: "hustle", tags: ["wolf", "wall-street", "money"], colors: ["gold", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "gym-bear", name: "Gym Motivation Bear", category: "motivational", subcategory: "gym", tags: ["gym", "bear", "motivation"], colors: ["black", "red"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "mindset-shift", name: "Mindset Is Everything", category: "motivational", subcategory: "mindset", tags: ["mindset", "shift", "growth"], colors: ["black", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },

  // ISLAMIC
  { id: "allah-calligraphy", name: "Allah Calligraphy", category: "islamic", subcategory: "calligraphy", tags: ["allah", "calligraphy", "islamic"], colors: ["gold", "black"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "bismillah-art", name: "Bismillah Art", category: "islamic", subcategory: "calligraphy", tags: ["bismillah", "calligraphy", "art"], colors: ["green", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "masjid-nabawi", name: "Masjid Nabawi", category: "islamic", subcategory: "masjid", tags: ["masjid", "nabawi", "medina"], colors: ["green", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "masjid-haram", name: "Masjid Al Haram", category: "islamic", subcategory: "masjid", tags: ["masjid", "haram", "makkah"], colors: ["white", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "quran-verse-art", name: "Quran Verse Art", category: "islamic", subcategory: "verses", tags: ["quran", "verse", "ayat"], colors: ["blue", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "muhammad-pbuh", name: "Muhammad ﷺ Calligraphy", category: "islamic", subcategory: "calligraphy", tags: ["muhammad", "saw", "calligraphy"], colors: ["green", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "surah-ayatul-kursi", name: "Ayatul Kursi", category: "islamic", subcategory: "verses", tags: ["ayatul-kursi", "quran", "throne"], colors: ["black", "gold"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
  { id: "darul-salam", name: "Dar Al Salam", category: "islamic", subcategory: "calligraphy", tags: ["dar", "salam", "peace"], colors: ["green", "white"], prices: { A6: 22, A5: 59, A4: 99, A3: 149 } },
];

export const bundleOffers = [
  { id: "bundle-5", cards: 5, price: 119, label: "5 Cards", savings: 26 },
  { id: "bundle-10", cards: 10, price: 169, label: "10 Cards", savings: 121 },
  { id: "bundle-20", cards: 20, price: 239, label: "20 Cards", savings: 341 },
];
