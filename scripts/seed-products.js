// Run: node scripts/seed-products.js
// This imports all existing hardcoded products into Supabase

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const [key, ...val] = line.split("=");
  if (key) env[key.trim()] = val.join("=").trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const products = [
  { id: "porsche-911-gt3-rs", name: "Porsche 911 GT3 RS", category: "cars", subcategory: "concept-cars", tags: ["porsche", "sports-car", "racing"], colors: ["white", "black"] },
  { id: "bmw-m4-dominance", name: "BMW M4 Dominance", category: "cars", subcategory: "solid-cars", tags: ["bmw", "luxury", "german"], colors: ["black", "blue"] },
  { id: "nissan-skyline-r34", name: "Nissan Skyline R34", category: "cars", subcategory: "concept-cars", tags: ["nissan", "jdm", "fast-furious"], colors: ["blue", "black"] },
  { id: "ford-mustang-1969", name: "Ford Mustang 1969", category: "cars", subcategory: "solid-cars", tags: ["ford", "muscle", "classic"], colors: ["red", "black"] },
  { id: "lamborghini-aventador", name: "Lamborghini Aventador", category: "cars", subcategory: "concept-cars", tags: ["lamborghini", "supercar", "italian"], colors: ["yellow", "green"] },
  { id: "ferrari-f40", name: "Ferrari F40 Competizione", category: "cars", subcategory: "concept-cars", tags: ["ferrari", "classic", "racing"], colors: ["red", "white"] },
  { id: "mercedes-amg-gt", name: "Mercedes AMG GT", category: "cars", subcategory: "solid-cars", tags: ["mercedes", "amg", "luxury"], colors: ["silver", "black"] },
  { id: "dodge-charger", name: "Dodge Charger Classic", category: "cars", subcategory: "solid-cars", tags: ["dodge", "muscle", "american"], colors: ["black", "blue"] },
  { id: "toyota-supra-mk4", name: "Toyota Supra MK4", category: "cars", subcategory: "concept-cars", tags: ["toyota", "jdm", "drift"], colors: ["orange", "white"] },
  { id: "bmw-m2-vector", name: "BMW M2 Vector Style", category: "cars", subcategory: "vector-car", tags: ["bmw", "vector", "art"], colors: ["white", "black"] },
  { id: "gtr-vector", name: "Nissan GTR Vector Art", category: "cars", subcategory: "vector-car", tags: ["nissan", "gtr", "vector"], colors: ["black", "red"] },
  { id: "defender-snowline", name: "Land Rover Defender", category: "cars", subcategory: "solid-cars", tags: ["land-rover", "suv", "offroad"], colors: ["white", "green"] },
  { id: "kawasaki-ninja", name: "Kawasaki Ninja H2R", category: "cars", subcategory: "bikes", tags: ["kawasaki", "bike", "racing"], colors: ["green", "black"] },
  { id: "ducati-panigale", name: "Ducati Panigale V4", category: "cars", subcategory: "bikes", tags: ["ducati", "bike", "italian"], colors: ["red", "white"] },
  { id: "yamaha-r15", name: "Yamaha R15 M", category: "cars", subcategory: "bikes", tags: ["yamaha", "bike", "indian"], colors: ["blue", "black"] },
  { id: "naruto-sage-mode", name: "Naruto Sage Mode", category: "anime", subcategory: "naruto", tags: ["naruto", "sage", "shippuden"], colors: ["orange", "blue"] },
  { id: "luffy-gear-5", name: "Luffy Gear 5", category: "anime", subcategory: "one-piece", tags: ["luffy", "one-piece", "gear-5"], colors: ["white", "red"] },
  { id: "goku-ultra-instinct", name: "Goku Ultra Instinct", category: "anime", subcategory: "dragon-ball", tags: ["goku", "dragon-ball", "ultra-instinct"], colors: ["silver", "blue"] },
  { id: "gojo-satoru", name: "Gojo Satoru", category: "anime", subcategory: "jujutsu-kaisen", tags: ["gojo", "jujutsu-kaisen", "blindfold"], colors: ["blue", "white"] },
  { id: "levi-ackerman", name: "Levi Ackerman", category: "anime", subcategory: "attack-on-titan", tags: ["levi", "attack-on-titan", "captain"], colors: ["black", "white"] },
  { id: "sasuke-sharingan", name: "Sasuke Sharingan", category: "anime", subcategory: "naruto", tags: ["sasuke", "sharingan", "uchiha"], colors: ["red", "black"] },
  { id: "tanjiro-water-breathing", name: "Tanjiro Water Breathing", category: "anime", subcategory: "demon-slayer", tags: ["tanjiro", "demon-slayer", "water"], colors: ["blue", "green"] },
  { id: "zoro-three-swords", name: "Zoro Three Sword Style", category: "anime", subcategory: "one-piece", tags: ["zoro", "one-piece", "swordsman"], colors: ["green", "black"] },
  { id: "itachi-crows", name: "Itachi Uchiha Crows", category: "anime", subcategory: "naruto", tags: ["itachi", "uchiha", "crows"], colors: ["red", "black"] },
  { id: "eren-titan", name: "Eren Founding Titan", category: "anime", subcategory: "attack-on-titan", tags: ["eren", "titan", "final-season"], colors: ["green", "red"] },
  { id: "megumi-phantom", name: "Megumi Phantom Beast", category: "anime", subcategory: "jujutsu-kaisen", tags: ["megumi", "jujutsu-kaisen", "shikigami"], colors: ["blue", "black"] },
  { id: "killua-godspeed", name: "Killua Godspeed", category: "anime", subcategory: "hunter-x-hunter", tags: ["killua", "hunter", "lightning"], colors: ["blue", "white"] },
  { id: "gta-v-finance", name: "GTA V Los Santos", category: "gaming", subcategory: "gta", tags: ["gta", "rockstar", "los-santos"], colors: ["green", "black"] },
  { id: "valorant-jett", name: "Valorant Jett", category: "gaming", subcategory: "valorant", tags: ["valorant", "jett", "agent"], colors: ["blue", "white"] },
  { id: "minecraft-creeper", name: "Minecraft Creeper", category: "gaming", subcategory: "minecraft", tags: ["minecraft", "creeper", "pixel"], colors: ["green", "brown"] },
  { id: "god-of-war-kratos", name: "God of War Kratos", category: "gaming", subcategory: "action", tags: ["kratos", "god-of-war", "nordic"], colors: ["grey", "red"] },
  { id: "cyberpunk-v", name: "Cyberpunk 2077", category: "gaming", subcategory: "rpg", tags: ["cyberpunk", "night-city", "futuristic"], colors: ["yellow", "blue"] },
  { id: "spider-man-miles", name: "Spider-Man Miles Morales", category: "gaming", subcategory: "action", tags: ["spider-man", "playstation", "insomniac"], colors: ["red", "black"] },
  { id: "pubg-m416", name: "PUBG M416 Skin", category: "gaming", subcategory: "fps", tags: ["pubg", "m416", "weapon"], colors: ["green", "black"] },
  { id: "free-fire-battle", name: "Free Fire Battle", category: "gaming", subcategory: "battle-royale", tags: ["free-fire", "battle-royale", "fire"], colors: ["orange", "blue"] },
  { id: "elden-ring", name: "Elden Ring Shadow", category: "gaming", subcategory: "rpg", tags: ["elden-ring", "from-software", "dark-fantasy"], colors: ["gold", "black"] },
  { id: "call-of-duty-ghost", name: "Call of Duty Ghost", category: "gaming", subcategory: "fps", tags: ["cod", "ghost", "military"], colors: ["grey", "black"] },
  { id: "ronaldo-goat", name: "Cristiano Ronaldo GOAT", category: "sports", subcategory: "football", tags: ["ronaldo", "football", "goat"], colors: ["red", "black"] },
  { id: "messi-world-cup", name: "Messi World Cup 2022", category: "sports", subcategory: "football", tags: ["messi", "argentina", "world-cup"], colors: ["blue", "white"] },
  { id: "virat-kohli-18", name: "Virat Kohli #18", category: "sports", subcategory: "cricket", tags: ["virat", "cricket", "india"], colors: ["blue", "gold"] },
  { id: "ms-dhoni-7", name: "MS Dhoni #7 Captain", category: "sports", subcategory: "cricket", tags: ["dhoni", "cricket", "captain"], colors: ["yellow", "blue"] },
  { id: "f1-verstappen", name: "Max Verstappen #1", category: "sports", subcategory: "f1", tags: ["f1", "verstappen", "red-bull"], colors: ["blue", "yellow"] },
  { id: "lebron-lakers", name: "LeBron James Lakers", category: "sports", subcategory: "basketball", tags: ["lebron", "lakers", "nba"], colors: ["purple", "gold"] },
  { id: "neymar-skills", name: "Neymar Skills", category: "sports", subcategory: "football", tags: ["neymar", "football", "skills"], colors: ["yellow", "green"] },
  { id: "sachin-tendulkar", name: "Sachin Tendulkar", category: "sports", subcategory: "cricket", tags: ["sachin", "cricket", "legend"], colors: ["blue", "white"] },
  { id: "ufc-mcgregor", name: "Conor McGregor", category: "sports", subcategory: "ufc", tags: ["mcgregor", "ufc", "champion"], colors: ["green", "black"] },
  { id: "hamilton-mercedes", name: "Lewis Hamilton Mercedes", category: "sports", subcategory: "f1", tags: ["hamilton", "mercedes", "f1"], colors: ["silver", "teal"] },
  { id: "iron-man-arc-reactor", name: "Iron Man Arc Reactor", category: "marvel", subcategory: "avengers", tags: ["iron-man", "marvel", "avengers"], colors: ["red", "gold"] },
  { id: "spider-man-no-way", name: "Spider-Man No Way Home", category: "marvel", subcategory: "spider-man", tags: ["spider-man", "tom-holland", "no-way-home"], colors: ["red", "blue"] },
  { id: "thor-ragnarok", name: "Thor Ragnarok", category: "marvel", subcategory: "avengers", tags: ["thor", "avengers", "ragnarok"], colors: ["blue", "red"] },
  { id: "captain-america", name: "Captain America Shield", category: "marvel", subcategory: "avengers", tags: ["captain-america", "shield", "avengers"], colors: ["blue", "red"] },
  { id: "black-panther", name: "Black Panther", category: "marvel", subcategory: "avengers", tags: ["black-panther", "wakanda", "avengers"], colors: ["black", "purple"] },
  { id: "wolverine-claws", name: "Wolverine Claws", category: "marvel", subcategory: "x-men", tags: ["wolverine", "x-men", "claws"], colors: ["yellow", "blue"] },
  { id: "deadpool", name: "Deadpool 4th Wall", category: "marvel", subcategory: "deadpool", tags: ["deadpool", "marvel", "comedy"], colors: ["red", "black"] },
  { id: "batman-dark-knight", name: "Batman Dark Knight", category: "dc", subcategory: "batman", tags: ["batman", "dc", "dark-knight"], colors: ["black", "grey"] },
  { id: "joker-heath", name: "Joker Heath Ledger", category: "dc", subcategory: "villains", tags: ["joker", "dc", "dark-knight"], colors: ["purple", "green"] },
  { id: "superman-classic", name: "Superman Classic", category: "dc", subcategory: "justice-league", tags: ["superman", "dc", "justice-league"], colors: ["blue", "red"] },
  { id: "flash-speed", name: "The Flash Speed", category: "dc", subcategory: "justice-league", tags: ["flash", "dc", "speed"], colors: ["red", "yellow"] },
  { id: "aquaman", name: "Aquaman King", category: "dc", subcategory: "justice-league", tags: ["aquaman", "dc", "ocean"], colors: ["green", "gold"] },
  { id: "fight-club", name: "Fight Club Rules", category: "movies", subcategory: "thriller", tags: ["fight-club", "brad-pitt", "david-fincher"], colors: ["red", "black"] },
  { id: "interstellar", name: "Interstellar Space", category: "movies", subcategory: "sci-fi", tags: ["interstellar", "nolan", "space"], colors: ["blue", "black"] },
  { id: "dark-knight-rises", name: "Dark Knight Rises", category: "movies", subcategory: "action", tags: ["batman", "nolan", "rises"], colors: ["black", "grey"] },
  { id: "avengers-endgame", name: "Avengers Endgame", category: "movies", subcategory: "marvel", tags: ["avengers", "marvel", "endgame"], colors: ["blue", "gold"] },
  { id: "inception", name: "Inception Dream", category: "movies", subcategory: "sci-fi", tags: ["inception", "nolan", "dream"], colors: ["grey", "blue"] },
  { id: "joker-2019", name: "Joker 2019", category: "movies", subcategory: "drama", tags: ["joker", "phoenix", "dc"], colors: ["red", "purple"] },
  { id: "oppenheimer", name: "Oppenheimer", category: "movies", subcategory: "drama", tags: ["oppenheimer", "nolan", "atomic"], colors: ["orange", "black"] },
  { id: "eminem-lose-yourself", name: "Eminem Lose Yourself", category: "music", subcategory: "hip-hop", tags: ["eminem", "hip-hop", "rap"], colors: ["black", "white"] },
  { id: "travis-scott", name: "Travis Scott Astroworld", category: "music", subcategory: "hip-hop", tags: ["travis-scott", "astroworld", "rap"], colors: ["red", "black"] },
  { id: "kanye-west", name: "Kanye West Donda", category: "music", subcategory: "hip-hop", tags: ["kanye", "donda", "rap"], colors: ["black", "white"] },
  { id: "drake", name: "Drake Certified Lover", category: "music", subcategory: "hip-hop", tags: ["drake", "hip-hop", "rap"], colors: ["pink", "white"] },
  { id: "vinyl-aesthetic", name: "Vinyl Record Aesthetic", category: "music", subcategory: "aesthetic", tags: ["vinyl", "retro", "aesthetic"], colors: ["black", "brown"] },
  { id: "beats-headphones", name: "Beats Headphones Art", category: "music", subcategory: "aesthetic", tags: ["beats", "headphones", "music"], colors: ["red", "black"] },
  { id: "hustle-grind", name: "Hustle & Grind", category: "motivational", subcategory: "hustle", tags: ["hustle", "grind", "motivation"], colors: ["black", "gold"] },
  { id: "discipline-equals-freedom", name: "Discipline Equals Freedom", category: "motivational", subcategory: "discipline", tags: ["discipline", "freedom", "jocko"], colors: ["black", "red"] },
  { id: "never-give-up", name: "Never Give Up", category: "motivational", subcategory: "mindset", tags: ["never-give-up", "mindset", "motivation"], colors: ["black", "white"] },
  { id: "wolf-wall-street", name: "Wolf of Wall Street", category: "motivational", subcategory: "hustle", tags: ["wolf", "wall-street", "money"], colors: ["gold", "black"] },
  { id: "gym-bear", name: "Gym Motivation Bear", category: "motivational", subcategory: "gym", tags: ["gym", "bear", "motivation"], colors: ["black", "red"] },
  { id: "mindset-shift", name: "Mindset Is Everything", category: "motivational", subcategory: "mindset", tags: ["mindset", "shift", "growth"], colors: ["black", "gold"] },
  { id: "krishna-flute", name: "Krishna Flute", category: "devotional", subcategory: "hindu", tags: ["krishna", "flute", "divine"], colors: ["blue", "yellow"] },
  { id: "hanuman-chalisa", name: "Hanuman Chalisa", category: "devotional", subcategory: "hindu", tags: ["hanuman", "chalisa", "strength"], colors: ["orange", "red"] },
  { id: "ganesha-blessings", name: "Ganesha Blessings", category: "devotional", subcategory: "hindu", tags: ["ganesha", "blessings", "remover"], colors: ["red", "gold"] },
  { id: "bhagavad-gita", name: "Bhagavad Gita Quote", category: "devotional", subcategory: "hindu", tags: ["gita", "krishna", "wisdom"], colors: ["orange", "white"] },
  { id: "shiva-meditation", name: "Shiva Meditation", category: "devotional", subcategory: "hindu", tags: ["shiva", "meditation", "peace"], colors: ["blue", "white"] },
  { id: "rama-bow", name: "Lord Rama Bow Arrow", category: "devotional", subcategory: "hindu", tags: ["rama", "arrow", "dharma"], colors: ["gold", "green"] },
];

const defaultPrices = { A6: 29, A5: 79, A4: 129, A3: 179 };

async function seed() {
  console.log(`Seeding ${products.length} products...`);

  const rows = products.map((p) => ({
    ...p,
    prices: defaultPrices,
    in_stock: true,
    featured: ["porsche-911-gt3-rs", "naruto-sage-mode", "gta-v-finance", "ronaldo-goat", "iron-man-arc-reactor", "batman-dark-knight", "interstellar", "eminem-lose-yourself", "hustle-grind", "krishna-flute"].includes(p.id),
  }));

  const { data, error } = await supabase.from("products").upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  } else {
    console.log(`Done! ${data ? data.length : rows.length} products seeded.`);
  }
}

seed();
