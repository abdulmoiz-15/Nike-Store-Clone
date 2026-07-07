const shoesData = [
  // SPORTS
  {id:"gt_cut_cross", name:"Nike G.T. Cut Cross EP", type:"Basketball Shoes", price:"$130", img:"sports/nike_G.T._cut_cross_EP_Peach.jpg", category:"sports", gender: "unisex"},
  {id:"alpha_menace_elite", name:"Nike Alpha Menace Elite 3", type:"Football Shoes", price:"$170", img:"sports/nike_alpha_menace_elite_3.jpg", category:"sports", gender: "unisex"},
  {id:"mercurial_vapor", name:"Nike Mercurial Vapor 15 Club TF Shadow", type:"Soccer Shoes", price:"$125", img:"sports/nike_mercurial_vapor_15_club_TF_shadow.webp", category:"sports", gender: "unisex"},
  {id:"kobe_elite", name:"Nike Kobe 9 Elite Low Protro Halo", type:"Basketball Shoes", price:"$180", img:"sports/NIKE_KOBE_9_ELITE_LOW_PROTRO_HALO.webp", category:"sports", gender: "unisex"},
  {id:"vapor_shark", name:"Nike Vapor Shark Top 2 Youth", type:"Football Shoes", price:"$110", img:"sports/nike_vapor_shark_top_2_youth.avif", category:"sports", gender: "kids"},
  {id:"superfly_dream", name:"Nike Superfly 10 Dream Elite Mercurial Dream", type:"Soccer Shoes", price:"$180", img:"sports/nike_superfly_10_elite_mercurial_dream.webp", category:"sports", gender: "unisex"},
  {id:"gt_hustle", name:"Nike G.T. Hustle 2", type:"Basketball Shoes", price:"$125", img:"sports/nike_G.T._hustle_2.webp", category:"sports", gender: "unisex"},
  {id:"alpha_menace_pro", name:"Nike Alpha Menace 4 Pro", type:"Football Shoes", price:"$150", img:"sports/nike_alpha_menace_4_pro.jpg", category:"sports", gender: "unisex"},
  {id:"phantom_luna", name:"Nike Phantom Luna 2 Academy", type:"Soccer Shoes", price:"$120", img:"sports/nike_phnatom_luna_2_academy.webp", category:"sports", gender: "unisex"},
  {id:"precision_6", name:"Nike Precision 6 Men's", type:"Basketball Shoes", price:"$90", img:"sports/nike_precision_6_men's.jpg", category:"sports", gender: "men"},
  {id:"vapor_edge", name:"Nike Vapor Edge Speed 360 2", type:"Football Shoes", price:"$160", img:"sports/nike_vapor_edge_speed_360_2_'University.webp", category:"sports", gender: "unisex"},
  {id:"mercurial_superfly", name:"Nike Mercurial Superfly Academy DF Astro Turf", type:"Soccer Shoes", price:"$110", img:"sports/nike_mercurial_superfly_academy_df_astro_turf.jpg", category:"sports", gender: "unisex"},
  {id:"kobe_protro", name:"Nike Kobe 9 Low em Protro", type:"Basketball Shoes", price:"$175", img:"sports/nike_kobe_9_low_em_protro_'White_and_Court_Purple'.webp", category:"sports", gender: "unisex"},
  {id:"hypervenom", name:"Nike Hypervenom", type:"Football Shoes", price:"$140", img:"sports/bright_citrus_Nike_Hypervenom_RGN_football_boot.png", category:"sports", gender: "unisex"},
  {id:"superfly_academy", name:"Nike Unisex Superfly 6 Academy", type:"Soccer Shoes", price:"$115", img:"sports/nike_unisex_superfly_6_academy.jpg", category:"sports", gender: "unisex"},
  {id:"gt_cut_academy", name:"Nike G.T. Cut Academy", type:"Basketball Shoes", price:"$120", img:"sports/nike_G.T._cut_academy.webp", category:"sports", gender: "unisex"},
  {id:"alpha_shark", name:"Nike Alpha Menace 4 Shark", type:"Football Shoes", price:"$120", img:"sports/nike_alpha_shark_2.jpg", category:"sports", gender: "kids"},
  {id:"tiempo_legend", name:"Nike Tiempo Legend 10 Low Turf", type:"Soccer Shoes", price:"$95", img:"sports/nike_tiempo_legend_10_low_turf.webp", category:"sports", gender: "unisex"},
  {id:"mercurial_vapor_academy", name:"Nike Zoom Mercurial Vapor 15 Academy TF Turf", type:"Soccer Shoes", price:"$135", img:"sports/Nike_Zoom_Mercurial_Vapor_15_Academy_TF_Turf.webp", category:"sports", gender: "unisex"},
  {id:"soccer_shoes1", name:"Nike Mercurial Superfly 9 Elite High Top", type:"Soccer Shoes", price:"$220", img:"sports/sport1.avif", category:"sports", gender: "unisex"},
  {id:"soccer_shoes2", name:"Giannis Immortality 4 EP", type:"Basketball Shoes", price:"$100", img:"sports/sport2.avif", category:"sports", gender: "unisex"},
  {id:"soccer_shoes3", name:"Nike Alpha Menace Strong", type:"Football Shoes", price:"$100", img:"sports/sport3.avif", category:"sports", gender: "unisex"},

  // WOMEN
  {id:"airmax_intrlk", name:"Air Max INTRLK Lite", type:"Running Shoes", price:"$120", img:"women/Nike Air Max INTRLK Lite.webp", category:"women", gender: "women"},
  {id:"airmax_pulse", name:"Air Max Pulse", type:"Lifestyle Shoes", price:"$130", img:"women/Nike Air Max Pulse.webp", category:"women", gender: "women"},
  {id:"nike_quest", name:"Nike Quest 5", type:"Running Shoes", price:"$85", img:"women/NIKE QUEST 5 DD9291-400.webp", category:"women", gender: "women"},
  {id:"nike_joyride", name:"Nike Joyride", type:"Running Shoes", price:"$250", img:"nike joyride.webp", category:"women", gender: "unisex"},
  {id:"nike_flex", name:"Nike Flex Experience RN 11", type:"Training Shoes", price:"$75", img:"women/W FLEX EXPERIENCE RN 11 NN DD9283-006.webp", category:"women", gender: "women"},
  {id:"nike_court", name:"Nike Court Lite 4", type:"Tennis Shoes", price:"$65", img:"women/W NIKE COURT LITE 4.webp", category:"women", gender: "women"},
  {id:"nike_downshifter", name:"Nike Downshifter 13", type:"Running Shoes", price:"$70", img:"women/W NIKE DOWNSHIFTER 13.webp", category:"women", gender: "women"},
  {id:"nike_dunk", name:"Nike Dunk Low Next Nature", type:"Lifestyle Shoes", price:"$110", img:"women/W NIKE DUNK LOW NEXT NATURE.avif", category:"women", gender: "women"},
  {id:"nike_inseason", name:"Nike In-Season TR 13", type:"Training Shoes", price:"$110", img:"women/W NIKE IN-SEASON TR 13 DV3975-001.webp", category:"women", gender: "women"},
  {id:"nike_pegasus", name:"Nike Pegasus Trail 5 NBY", type:"Trail Running Shoes", price:"$140", img:"women/W PEGASUS TRAIL 5 NBY.avif", category:"women", gender: "women"},
  {id:"nike_winflo", name:"Nike Air Winflo 11", type:"Running Shoes", price:"$110", img:"women/WMNS NIKE AIR WINFLO 11.webp", category:"women", gender: "women"},
  {id:"nike_cityrep", name:"Nike City Rep TR", type:"Training Shoes", price:"$90", img:"women/WMNS NIKE CITY REP TR DA1351-003.webp", category:"women", gender: "women"},
  {id:"nike_revolution", name:"Nike Revolution 7", type:"Running Shoes", price:"$60", img:"women/w-nike-revolution-7.webp", category:"women", gender: "women"},
  {id:"air_zoom", name:"Nike Air Zoom Structure 21", type:"Running Shoes", price:"120$", img:"w nike air zoom structure 21.png", category:"women", gender: "women"},

  // MEN
  {id:"air180", name:"Nike Air 180", type:"Lifestyle Shoes", price:"$150", img:"men/nike air 180.webp", category:"men", gender: "men"},
  {id:"airmax_nuaxis", name:"Nike Air Max Nuaxis", type:"Running Shoes", price:"$160", img:"men/nike air max nuaxis.webp", category:"men", gender: "men"},
  {id:"airmax_sc", name:"Nike Air Max SC", type:"Casual Shoes", price:"$140", img:"men/nike air max sc cw4555-006.webp", category:"men", gender: "men"},
  {id:"c1ty_casual", name:"Nike C1TY Casual", type:"Everyday Shoes", price:"$110", img:"men/nike c1ty casual.jpeg", category:"men", gender: "men"},
  {id:"nike_joyride", name:"Nike Joyride", type:"Running Shoes", price:"$250", img:"nike joyride.webp", category:"men", gender: "men"},
  {id:"downshifter13", name:"Nike Downshifter 13", type:"Running Shoes", price:"$75", img:"men/nike downshifter 13.webp", category:"men", gender: "men"},
  {id:"infinity_g", name:"Nike Infinity G NN", type:"Running Shoes", price:"$130", img:"men/nike infinity g nn.webp", category:"men", gender: "men"},
  {id:"journey_run", name:"Nike Journey Run", type:"Running Shoes", price:"$100", img:"men/nike journey run.webp", category:"men", gender: "men"},
  {id:"juniper_trail", name:"Nike Juniper Trail 3", type:"Trail Running", price:"$100", img:"men/nike juniper trail 3.webp", category:"men", gender: "men"},
  {id:"motiva_wandel", name:"Nike Motiva Wandel", type:"Walking Shoes", price:"$95", img:"men/nike motiva wandel.webp", category:"men", gender: "men"},
  {id:"quest6", name:"Nike Quest 6", type:"Running Shoes", price:"$85", img:"men/nike quest 6.jpg", category:"men", gender: "men"},
  {id:"run_swift", name:"Nike Run Swift 3", type:"Running Shoes", price:"$90", img:"men/nike run swift 3.webp", category:"men", gender: "men"},
  {id:"court_vision", name:"Nike Court Vision Low", type:"Basketball Shoes", price:"$80", img:"men/nike-court-vision low.webp", category:"men", gender: "men"},

  // KIDS
  {id:"airmax270_gs", name:"Nike Air Max 270 GO GS Trainers", type:"Big Kids Shoes", price:"$100", img:"kids/nike air max 270 GO GS Trainers.avif", category:"kids", gender: "kids"},
  {id:"airmax270_ps", name:"Nike Air Max 270 (PS)", type:"Younger Kids Shoes", price:"$80", img:"kids/nike air max 270 (PS).avif", category:"kids", gender: "kids"},
  {id:"airmax_sc_kids", name:"Nike Air Max SC", type:"Big Kids Shoes", price:"$85", img:"kids/nike air max SC.webp", category:"kids", gender: "kids"},
  {id:"airzoom_arcadia", name:"Nike Air Zoom Arcadia 2", type:"Running Shoes", price:"$75", img:"kids/nike air zoom arcadia 2.webp", category:"kids", gender: "kids"},
  {id:"borough_low", name:"Nike Borough Low Black", type:"Big Kids Shoes", price:"$65", img:"kids/nike borough low black.webp", category:"kids", gender: "kids"},
  {id:"cortez_easyon", name:"Nike Cortez Easyon", type:"Toddler Shoes", price:"$60", img:"kids/nike cortez easyon.webp", category:"kids", gender: "kids"},
  {id:"cosmic_runner", name:"Nike Cosmic Runner", type:"Running Shoes", price:"$70", img:"kids/nike cosmic runner.webp", category:"kids", gender: "kids"},
  {id:"flex_runner", name:"Nike Flex Runner 2", type:"Toddler Shoes", price:"$55", img:"kids/nike flex runner 2.webp", category:"kids", gender: "kids"},
  {id:"airzoom_crossover", name:"Nike Kids' Air Zoom Crossover 2", type:"Big Kids Shoes", price:"$85", img:"kids/Nike Kids' Air Zoom Crossover 2.webp", category:"kids", gender: "kids"},
  {id:"revolution7_toddler", name:"Nike Revolution 7 Toddler", type:"Toddler Shoes", price:"$50", img:"kids/nike revolution 7.jpg", category:"kids", gender: "kids"},
  {id:"revolution7_kids", name:"Nike Revolution 7", type:"Running Shoes", price:"$60", img:"kids/nike revolution 7.webp", category:"kids", gender: "kids"},
  {id:"sb_dayone", name:"Nike SB Kids Day One Vintage Green", type:"Younger Kids Shoes", price:"$75", img:"kids/nike sb kids day one vintage green.png", category:"kids", gender: "kids"},
  {id:"team_hustle", name:"Nike Team Hustle D-11 Kids", type:"Basketball Shoes", price:"$65", img:"kids/nike team hustle D-11 kids.jpg", category:"kids", gender: "kids"},

  // JORDANS
  {id:"aj1_kids_low", name:"Nike Air Jordan 1 Kids Low GS", type:"Kids Basketball Shoes", price:"$100", img:"jordans/Air Jordan 1 Kids Low GS.webp", category:"jordan", gender: "kids"},
  {id:"aj1_retro", name:"Nike Air Jordan 1 Retro High Off-White 'University Blue'", type:"Limited Edition", price:"$260", img:"Jordan1RetroHighOff-WhiteUniversityBlue.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_mens_low", name:"Nike Air Jordan 1 Men's Low", type:"Men's Basketball Shoes", price:"$130", img:"jordans/Air Jordan 1 Mens Low.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_mens_mid", name:"Nike Air Jordan 1 Men's Mid", type:"Men's Basketball Shoes", price:"$135", img:"jordans/Air Jordan 1 Mens Mid.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_retro_low", name:"Nike Air Jordan 1 Men's Retro Low OG", type:"Men's Basketball Shoes", price:"$170", img:"jordans/Air Jordan 1 Mens Retro Low OG.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_retro_high", name:"Nike Air Jordan 1 Retro High OG", type:"Classic Retro", price:"$235", img:"Air-Jordan-1-Retro-High-OG.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_womens_mom", name:"Nike Air Jordan 1 Women's Method of Make", type:"Women's Basketball Shoes", price:"$150", img:"jordans/Air Jordan 1 Womens Method of Make.webp", category:"jordan", gender: "women"},
  {id:"aj1_womens_high", name:"Nike Air Jordan 1 Women's Retro High OG", type:"Women's Basketball Shoes", price:"$180", img:"jordans/Air Jordan 1 Womens Retro High OG.webp", category:"jordan", gender: "women"},
  {id:"aj3_black_cement", name:"Nike Air Jordan 3 Men's Retro Black Cement", type:"Men's Basketball Shoes", price:"$210", img:"jordans/Air Jordan 3 Mens Retro “Black Cement”.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_travis_scott", name:"Nike Air Jordan 1 Retro Low OG SP Travis Scott", type:"Limited Edition", price:"$250", img:"jordans/Jordan 1 Retro Low OG SP Travis Scott Medium Olive.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_mid_gs", name:"Nike Jordan Air 1 Mid GS", type:"Kids Basketball Shoes", price:"$110", img:"jordans/jordan-air-1-mid-gs.jpg", category:"jordan", gender: "kids"},
  {id:"aj1_mens_low_white", name:"Nike Air Jordan 1 Low White Black Metallic Gold", type:"Men's Basketball Shoes", price:"$140", img:"jordans/MENS-AIR-JORDAN-1-LOW-WHITE-BLACK-METALLIC-GOLD.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_mid_yellow", name:"Nike Air Jordan 1 Mid Yellow Ochre White Black", type:"Men's Basketball Shoes", price:"$145", img:"jordans/nike air jordan 1 mid yellow ochre white black.webp", category:"jordan", gender: "unisex"},
  {id:"aj1_retro_1985", name:"Nike Air Jordan 1 Retro High OG 1985 Black and White", type:"Classic Retro", price:"$220", img:"jordans/nike air jordan 1 retro high og 1985 black and white 2023 summit.jpg", category:"jordan", gender: "unisex"}
];

const sizeRanges = {
    men: ["M 6", "M 6.5", "M 7", "M 7.5", "M 8", "M 8.5", "M 9", "M 9.5", "M 10", "M 10.5", "M 11", "M 11.5", "M 12", "M 13", "M 14"],
    women: ["W 5", "W 5.5", "W 6", "W 6.5", "W 7", "W 7.5", "W 8", "W 8.5", "W 9", "W 9.5", "W 10", "W 10.5", "W 11"],
    kids: ["K 10C", "K 11C", "K 12C", "K 13C", "K 1Y", "K 2Y", "K 3Y", "K 4Y", "K 5Y", "K 6Y"],
    unisex: ["M 6 / W 7.5", "M 6.5 / W 8", "M 7 / W 8.5", "M 7.5 / W 9", "M 8 / W 9.5", "M 8.5 / W 10", "M 9 / W 10.5", "M 9.5 / W 11", "M 10 / W 11.5", "M 10.5 / W 12", "M 11 / W 12.5", "M 11.5 / W 13", "M 12 / W 13.5", "M 13 / W 14.5", "M 14 / W 15.5"]
};

// Function to get sizes for a specific category
function getSizesForCategory(category) {
    return sizeRanges[category] || sizeRanges.men;
}

// Helper function to get sizes based on shoe object
function getSizesForShoe(shoe) {
    // Use gender property if available, otherwise fall back to category
    if (shoe.gender && sizeRanges[shoe.gender]) {
        return sizeRanges[shoe.gender];
    }
    return sizeRanges[shoe.category] || sizeRanges.men;
}

// Make shoesData available globally
window.shoesData = shoesData;