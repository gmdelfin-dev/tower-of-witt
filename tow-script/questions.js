const LEVEL_RULES = [
  { hp: 7, seconds: 30 }, // Level 1
  { hp: 6, seconds: 25 }, // Level 2
  { hp: 5, seconds: 22 }, // Level 3
  { hp: 4, seconds: 20 }, // Level 4
  { hp: 3, seconds: 18 }  // Level 5 
];

const WEATHER_MODES = {
  Rainy: { mode: 'Easy mode',    lessSeconds: 0, bonusPoints: 0,  animal: 'Frog' },
  Snowy: { mode: 'Medium mode',  lessSeconds: 2, bonusPoints: 10, animal: 'Penguin' },
  Windy: { mode: 'Hard mode',    lessSeconds: 4, bonusPoints: 20, animal: 'Eagle' },
  Sunny: { mode: 'Hardest mode', lessSeconds: 6, bonusPoints: 30, animal: 'Carabao' }
};

const ANIMAL_POWERS = {
  Frog:    { type: 'time',   text: '+5 seconds on every question' },
  Penguin: { type: 'shield', text: 'your first mistake is free' },
  Eagle:   { type: 'eagle',  text: 'one wrong choice is removed on every question' },
  Carabao: { type: 'double', text: 'double points on every correct answer' }
};

// questions below

const questionBank = {

    // ========================================
    // HISTORY
    // ========================================
    History: {

        // level 1
        1: [
            {
                question: "What city is officially recognized as the capital of the Philippines?",
                choices: [
                    "Cebu City",
                    "Manila",
                    "Davao City",
                    "Baguio City"
                ],
                answer: "Manila"
            },
            {
                question: "Who is widely known as the national hero of the Philippines?",
                choices: [
                    "Andres Bonifacio",
                    "Emilio Aguinaldo",
                    "Jose Rizal",
                    "Apolinario Mabini"
                ],
                answer: "Jose Rizal"
            },
            {
                question: "What do the three stars on the Philippine flag represent?",
                choices: [
                    "Luzon, Visayas, and Mindanao",
                    "Manila, Cebu, and Davao",
                    "Three important Philippine heroes",
                    "The three colors of the Philippine flag"
                ],
                answer: "Luzon, Visayas, and Mindanao"
            }
        ],

        // level 2
        2: [
            {
                question: "Who was the first president of the Philippines?",
                choices: [
                    "Manuel L. Quezon",
                    "Emilio Aguinaldo",
                    "Sergio Osmeña",
                    "Ramon Magsaysay"
                ],
                answer: "Emilio Aguinaldo"
            },
            {
                question: "When do Filipinos celebrate Independence Day?",
                choices: [
                    "June 12",
                    "August 21",
                    "December 30",
                    "November 30"
                ],
                answer: "June 12"
            },
            {
                question: "Who founded the Katipunan, a group that fought for Philippine independence from Spain?",
                choices: [
                    "Jose Rizal",
                    "Andres Bonifacio",
                    "Antonio Luna",
                    "Emilio Aguinaldo"
                ],
                answer: "Andres Bonifacio"
            },
            {
                question: "Which country ruled the Philippines for more than 300 years?",
                choices: [
                    "Japan",
                    "United States",
                    "Spain",
                    "Portugal"
                ],
                answer: "Spain"
            }
        ],

        // level 3
        3: [
            {
                question: "What was the name of the secret group founded by Andres Bonifacio to fight for freedom from Spain?",
                choices: [
                    "La Liga Filipina",
                    "Katipunan",
                    "Malolos Congress",
                    "Propaganda Movement"
                ],
                answer: "Katipunan"
            },
            {
                question: "Who wrote the famous books Noli Me Tangere and El Filibusterismo?",
                choices: [
                    "Marcelo H. del Pilar",
                    "Graciano Lopez Jaena",
                    "Jose Rizal",
                    "Emilio Jacinto"
                ],
                answer: "Jose Rizal"
            },
            {
                question: "In what year did the Philippines declare its independence from Spain?",
                choices: [
                    "1896",
                    "1898",
                    "1901",
                    "1946"
                ],
                answer: "1898"
            },
            {
                question: "In what place was Philippine independence first declared on June 12, 1898?",
                choices: [
                    "Kawit, Cavite",
                    "Malolos, Bulacan",
                    "Manila",
                    "Cebu City"
                ],
                answer: "Kawit, Cavite"
            },
            {
                question: 'Who was known as the "Brains of the Revolution" because of his intelligence and advice to Filipino revolutionaries?',
                choices: [
                    "Antonio Luna",
                    "Apolinario Mabini",
                    "Andres Bonifacio",
                    "Emilio Aguinaldo"
                ],
                answer: "Apolinario Mabini"
            }
        ],

        // level 4
        4: [
            {
                question: "What event happened in 1872 that led to the execution of three Filipino priests?",
                choices: [
                    "Cry of Pugad Lawin",
                    "Battle of Mactan",
                    "Cavite Mutiny",
                    "Philippine Revolution"
                ],
                answer: "Cavite Mutiny"
            },
            {
                question: "Who were the three Filipino priests known as Gomburza?",
                choices: [
                    "Gomez, Burgos, and Zamora",
                    "Rizal, Bonifacio, and Mabini",
                    "Luna, Del Pilar, and Jaena",
                    "Aguinaldo, Jacinto, and Quezon"
                ],
                answer: "Gomez, Burgos, and Zamora"
            },
            {
                question: "What did Filipino reformers want to achieve through the Propaganda Movement?",
                choices: [
                    "To create a new religion",
                    "To ask for equal rights and fair treatment for Filipinos",
                    "To support Spanish rule forever",
                    "To start a war against Japan"
                ],
                answer: "To ask for equal rights and fair treatment for Filipinos"
            },
            {
                question: "What was the name of the constitution that guided the First Philippine Republic in 1899?",
                choices: [
                    "1935 Constitution",
                    "1973 Constitution",
                    "Malolos Constitution",
                    "1987 Constitution"
                ],
                answer: "Malolos Constitution"
            },
            {
                question: "Which Filipino hero is remembered for leading the fight against Spanish forces in Ilocos during the 1760s?",
                choices: [
                    "Diego Silang",
                    "Apolinario Mabini",
                    "Emilio Jacinto",
                    "Marcelo H. del Pilar"
                ],
                answer: "Diego Silang"
            },
            {
                question: "What important event happened in February 1986 when many Filipinos peacefully gathered to call for change in the government?",
                choices: [
                    "Philippine Independence",
                    "EDSA People Power Revolution",
                    "Battle of Mactan",
                    "Cry of Pugad Lawin"
                ],
                answer: "EDSA People Power Revolution"
            }
        ],

        // level 5
        5: [
            {
                question: "What treaty was signed in 1898 that ended the war between Spain and the United States and gave control of the Philippines to the United States?",
                choices: [
                    "Treaty of Paris",
                    "Treaty of Versailles",
                    "Treaty of Tordesillas",
                    "Treaty of Manila"
                ],
                answer: "Treaty of Paris"
            },
            {
                question: "What was the main goal of La Liga Filipina, a group founded by Jose Rizal?",
                choices: [
                    "To start a war immediately",
                    "To unite Filipinos and help bring peaceful changes to the country",
                    "To support Spanish rule",
                    "To create a new government under Japan"
                ],
                answer: "To unite Filipinos and help bring peaceful changes to the country"
            },
            {
                question: "Who became the first president of the Commonwealth of the Philippines in 1935?",
                choices: [
                    "Manuel L. Quezon",
                    "Emilio Aguinaldo",
                    "Manuel Roxas",
                    "Sergio Osmeña"
                ],
                answer: "Manuel L. Quezon"
            },
            {
                question: "What was the name of the independent government established in the Philippines in 1899?",
                choices: [
                    "Commonwealth Government",
                    "First Philippine Republic",
                    "Spanish Colonial Government",
                    "Second Philippine Republic"
                ],
                answer: "First Philippine Republic"
            },
            {
                question: "Who became the president of the Philippines after the 1986 EDSA People Power Revolution?",
                choices: [
                    "Gloria Macapagal-Arroyo",
                    "Corazon Aquino",
                    "Miriam Defensor Santiago",
                    "Imelda Marcos"
                ],
                answer: "Corazon Aquino"
            },
            {
                question: "What was the Bataan Death March during World War II?",
                choices: [
                    "A celebration after the war",
                    "A forced march of Filipino and American prisoners of war under Japanese soldiers",
                    "A journey to visit different Philippine islands",
                    "A march to celebrate Philippine independence"
                ],
                answer: "A forced march of Filipino and American prisoners of war under Japanese soldiers"
            },
            {
                question: "Why was the 1987 Philippine Constitution important?",
                choices: [
                    "It helped restore democracy and protect the rights of Filipino citizens.",
                    "It brought back Spanish rule.",
                    "It gave the Philippines to the United States.",
                    "It ended the Philippine Revolution against Spain."
                ],
                answer: "It helped restore democracy and protect the rights of Filipino citizens."
            }
        ]
    },   // <-- FIXED: was "};" before, now a comma so Food and Places stay inside questionBank


    // ========================================
    // FOOD
    // ========================================
    Food: {

        // LEVEL 1 - 3 questions
        1: [
            {
                question: "What do Filipinos usually eat with their ulam every day?",
                choices: [
                    "Pizza",
                    "Rice",
                    "Pasta",
                    "Cereal"
                ],
                answer: "Rice"
            },
            {
                question: "Which small, soft bread do many families eat for breakfast?",
                choices: [
                    "Cupcake",
                    "Waffle",
                    "Pandesal",
                    "Pizza"
                ],
                answer: "Pandesal"
            },
            {
                question: "Which sweet yellow fruit is the national fruit of the Philippines?",
                choices: [
                    "Mango",
                    "Apple",
                    "Grapes",
                    "Strawberry"
                ],
                answer: "Mango"
            }
        ],

        // LEVEL 2 - 4 questions
        2: [
            {
                question: "Which cold dessert is made of shaved ice, sweet beans, fruits and milk?",
                choices: [
                    "Taho",
                    "Turon",
                    "Halo-halo",
                    "Biko"
                ],
                answer: "Halo-halo"
            },
            {
                question: "Which snack is a banana rolled in a thin wrapper and fried with brown sugar?",
                choices: [
                    "Puto",
                    "Kutsinta",
                    "Lumpia",
                    "Turon"
                ],
                answer: "Turon"
            },
            {
                question: "Which small, green, sour fruit do we squeeze for juice?",
                choices: [
                    "Calamansi",
                    "Mango",
                    "Melon",
                    "Pineapple"
                ],
                answer: "Calamansi"
            },
            {
                question: "Which dish is chicken or pork cooked in vinegar, soy sauce and garlic?",
                choices: [
                    "Sinigang",
                    "Adobo",
                    "Tinola",
                    "Kare-kare"
                ],
                answer: "Adobo"
            }
        ],

        // LEVEL 3 - 5 questions
        3: [
            {
                question: "Which sour soup has pork, kangkong and tomato?",
                choices: [
                    "Tinola",
                    "Bulalo",
                    "Sinigang",
                    "Arroz caldo"
                ],
                answer: "Sinigang"
            },
            {
                question: "Which noodle dish do many Filipino families cook on birthdays?",
                choices: [
                    "Adobo",
                    "Lechon",
                    "Puto",
                    "Pancit"
                ],
                answer: "Pancit"
            },
            {
                question: "Which food is the crispy roasted pig we often see at birthdays and fiestas?",
                choices: [
                    "Longganisa",
                    "Lechon",
                    "Tapa",
                    "Sisig"
                ],
                answer: "Lechon"
            },
            {
                question: "Which clear, light soup is cooked with chicken, ginger, green papaya and chili leaves?",
                choices: [
                    "Tinola",
                    "Sinigang",
                    "Bulalo",
                    "Nilaga"
                ],
                answer: "Tinola"
            },
            {
                question: "Which purple food is used to make the sweet jam called halaya?",
                choices: [
                    "Carrot",
                    "Cabbage",
                    "Ube",
                    "Radish"
                ],
                answer: "Ube"
            }
        ],

        // LEVEL 4 - 6 questions
        4: [
            {
                question: "What gives kare-kare its thick, nutty sauce?",
                choices: [
                    "Tomatoes",
                    "Coconut milk",
                    "Corn",
                    "Peanuts"
                ],
                answer: "Peanuts"
            },
            {
                question: "Which sweet snack is made of sticky rice and coconut milk, with a brown sugar topping?",
                choices: [
                    "Puto",
                    "Biko",
                    "Turon",
                    "Pandesal"
                ],
                answer: "Biko"
            },
            {
                question: "Which sizzling dish is made of chopped pork and served on a hot plate?",
                choices: [
                    "Sisig",
                    "Tapa",
                    "Longganisa",
                    "Tocino"
                ],
                answer: "Sisig"
            },
            {
                question: "What is the sweet brown syrup we pour on taho?",
                choices: [
                    "Gravy",
                    "Vinegar",
                    "Arnibal",
                    "Soy sauce"
                ],
                answer: "Arnibal"
            },
            {
                question: "Which spicy dish is cooked in coconut milk and lots of chili?",
                choices: [
                    "Adobo",
                    "Sinigang",
                    "Tinola",
                    "Bicol Express"
                ],
                answer: "Bicol Express"
            },
            {
                question: "Which soft rice cake, cooked with banana leaves, do many people eat after Simbang Gabi?",
                choices: [
                    "Taho",
                    "Bibingka",
                    "Lumpia",
                    "Halo-halo"
                ],
                answer: "Bibingka"
            }
        ],

        // LEVEL 5 - 7 questions
        5: [
            {
                question: "Which dish is raw fish soaked in vinegar, onions and ginger?",
                choices: [
                    "Adobo",
                    "Tinola",
                    "Kinilaw",
                    "Sinigang"
                ],
                answer: "Kinilaw"
            },
            {
                question: "Which vegetable dish is cooked with okra, eggplant and squash?",
                choices: [
                    "Chopsuey",
                    "Laing",
                    "Sinigang",
                    "Pinakbet"
                ],
                answer: "Pinakbet"
            },
            {
                question: "Which fish is the national fish of the Philippines?",
                choices: [
                    "Tuna",
                    "Bangus (milkfish)",
                    "Tilapia",
                    "Dilis"
                ],
                answer: "Bangus (milkfish)"
            },
            {
                question: "Bagoong is the salty paste we eat with green mangoes. What is it made from?",
                choices: [
                    "Soybeans",
                    "Salted rice",
                    "Salted fish or shrimp",
                    "Coconut"
                ],
                answer: "Salted fish or shrimp"
            },
            {
                question: "Which street food is a boiled duck egg with a tiny duck inside?",
                choices: [
                    "Balut",
                    "Kwek-kwek",
                    "Isaw",
                    "Taho"
                ],
                answer: "Balut"
            },
            {
                question: "Which soup is made from big beef bones with marrow inside?",
                choices: [
                    "Tinola",
                    "Sinigang",
                    "Arroz caldo",
                    "Bulalo"
                ],
                answer: "Bulalo"
            },
            {
                question: "What do we call the dip made of vinegar, garlic and chili that we eat with fried fish?",
                choices: [
                    "Gravy",
                    "Sawsawan",
                    "Ketchup",
                    "Mayonnaise"
                ],
                answer: "Sawsawan"
            }
        ]
    },


    // ========================================
    // PLACES
    // ========================================
    Places: {

        // LEVEL 1 - Grade 1 to 2 (3 questions)
        1: [
            {
                question: "What is the famous island in the Philippines known for its white sand beaches and crystal-clear waters?",
                choices: [
                    "Siargao",
                    "Palawan",
                    "Boracay",
                    "Bohol"
                ],
                answer: "Boracay"
            },
            {
                question: "In which city can you find the famous Rizal Park (Luneta)?",
                choices: [
                    "Cebu City",
                    "Davao City",
                    "Baguio City",
                    "Manila"
                ],
                answer: "Manila"
            },
            {
                question: "What is the famous chocolate-shaped hill formation found in Bohol?",
                choices: [
                    "Mayon Volcano",
                    "Chocolate Hills",
                    "Banaue Rice Terraces",
                    "Taal Volcano"
                ],
                answer: "Chocolate Hills"
            }
        ],

        // LEVEL 2 - Grade 2 to 3 (4 questions)
        2: [
            {
                question: "Which Philippine province is famous for the Puerto Princesa Underground River?",
                choices: [
                    "Palawan",
                    "Cebu",
                    "Batangas",
                    "Iloilo"
                ],
                answer: "Palawan"
            },
            {
                question: "Where can you find the famous Mayon Volcano?",
                choices: [
                    "Laguna",
                    "Quezon",
                    "Albay",
                    "Pampanga"
                ],
                answer: "Albay"
            },
            {
                question: "Which city is known as the Summer Capital of the Philippines?",
                choices: [
                    "Tagaytay",
                    "Antipolo",
                    "Vigan",
                    "Baguio"
                ],
                answer: "Baguio"
            },
            {
                question: "The Banaue Rice Terraces are located in which province?",
                choices: [
                    "Benguet",
                    "Ifugao",
                    "Kalinga",
                    "Mountain Province"
                ],
                answer: "Ifugao"
            }
        ],

        // LEVEL 3 - Grade 3 to 4 (5 questions)
        3: [
            {
                question: "Which island is famous for the surfing destination called Cloud 9?",
                choices: [
                    "Boracay",
                    "Camiguin",
                    "Samar",
                    "Siargao"
                ],
                answer: "Siargao"
            },
            {
                question: "What historic walled city in Manila was built during the Spanish colonial period?",
                choices: [
                    "Fort Santiago",
                    "Malacañang",
                    "Intramuros",
                    "Binondo"
                ],
                answer: "Intramuros"
            },
            {
                question: "Which province is home to the famous Calle Crisologo?",
                choices: [
                    "Ilocos Norte",
                    "Ilocos Sur",
                    "La Union",
                    "Pangasinan"
                ],
                answer: "Ilocos Sur"
            },
            {
                question: "What is the name of the famous lake located inside a volcano on an island in Batangas?",
                choices: [
                    "Taal Lake",
                    "Laguna de Bay",
                    "Lake Lanao",
                    "Lake Sebu"
                ],
                answer: "Taal Lake"
            },
            {
                question: "Which Philippine island is known for the beautiful limestone cliffs and lagoons of El Nido?",
                choices: [
                    "Mindoro",
                    "Panay",
                    "Palawan",
                    "Leyte"
                ],
                answer: "Palawan"
            }
        ],

        // LEVEL 4 - Grade 4 to 5 (6 questions)
        4: [
            {
                question: "What is the highest mountain in the Philippines?",
                choices: [
                    "Mount Pulag",
                    "Mount Mayon",
                    "Mount Arayat",
                    "Mount Apo"
                ],
                answer: "Mount Apo"
            },
            {
                question: "Which province is home to the famous tourist destination of Pagudpud?",
                choices: [
                    "Ilocos Norte",
                    "La Union",
                    "Aurora",
                    "Zambales"
                ],
                answer: "Ilocos Norte"
            },
            {
                question: "What is the name of the famous historical cross associated with Ferdinand Magellan in Cebu?",
                choices: [
                    "Bonifacio Monument",
                    "Rizal Monument",
                    "Magellan's Cross",
                    "Blood Compact Shrine"
                ],
                answer: "Magellan's Cross"
            },
            {
                // replaced: this was a repeat of the Level 2 Underground River question
                question: "Which province is home to the famous Hundred Islands National Park?",
                choices: [
                    "Pangasinan",
                    "Zambales",
                    "Bataan",
                    "Batangas"
                ],
                answer: "Pangasinan"
            },
            {
                question: "Where can you find the famous Tinuy-an Falls, sometimes called the Niagara Falls of the Philippines?",
                choices: [
                    "Davao del Norte",
                    "Surigao del Sur",
                    "Agusan del Norte",
                    "Bukidnon"
                ],
                answer: "Surigao del Sur"
            },
            {
                question: "Which city is home to the famous MassKara Festival?",
                choices: [
                    "Bacolod City",
                    "Iloilo City",
                    "Dumaguete City",
                    "Roxas City"
                ],
                answer: "Bacolod City"
            }
        ],

        // LEVEL 5 - Grade 5 to 6 (7 questions)
        5: [
            {
                question: "What is the name of the famous island group in Palawan known for its shipwreck diving sites?",
                choices: [
                    "Dinagat Islands",
                    "Hundred Islands",
                    "Calamian Islands",
                    "Babuyan Islands"
                ],
                answer: "Calamian Islands"
            },
            {
                question: "Which mountain range is home to Mount Pulag, the third-highest mountain in the Philippines?",
                choices: [
                    "Sierra Madre",
                    "Cordillera Central",
                    "Zambales Mountains",
                    "Caraballo Mountains"
                ],
                answer: "Cordillera Central"
            },
            {
                question: "In which two provinces can you find the UNESCO-listed Baroque churches of Paoay and Santa Maria, respectively?",
                choices: [
                    "Pangasinan and La Union",
                    "Abra and Apayao",
                    "Cagayan and Isabela",
                    "Ilocos Norte and Ilocos Sur"
                ],
                answer: "Ilocos Norte and Ilocos Sur"
            },
            {
                question: "Which Philippine island is home to the famous Enchanted River?",
                choices: [
                    "Siargao",
                    "Bohol",
                    "Mindanao",
                    "Palawan"
                ],
                answer: "Mindanao"
            },
            {
                question: "What is the name of the marine protected area in Palawan known for its coral reefs and UNESCO World Heritage status?",
                choices: [
                    "Apo Reef Natural Park",
                    "Tubbataha Reefs Natural Park",
                    "Verde Island Passage",
                    "Danajon Bank"
                ],
                answer: "Tubbataha Reefs Natural Park"
            },
            {
                question: "Which province is home to the famous Kapurpurawan Rock Formation?",
                choices: [
                    "Ilocos Norte",
                    "Ilocos Sur",
                    "Cagayan",
                    "Batanes"
                ],
                answer: "Ilocos Norte"
            },
            {
                question: "What is the name of the historical site in Bohol commemorating the blood compact between Datu Sikatuna and Miguel López de Legazpi?",
                choices: [
                    "Magellan's Cross",
                    "Fort San Pedro",
                    "Mactan Shrine",
                    "Blood Compact Shrine"
                ],
                answer: "Blood Compact Shrine"
            }
        ]
    }

};


// ========================================
// GET QUESTIONS BY TOPIC AND LEVEL
// ========================================

function getQuestions(topic, level) {

    const selectedQuestions = questionBank[topic]?.[level];

    if (!selectedQuestions) {
        console.error("No questions found for this topic and level.");
        return [];
    }

    // Return a copy of the selected questions
    return [...selectedQuestions];
}