
// Zambia Provinces Data
export const provinces = [
  {
    id: "lusaka",
    name: "Lusaka",
    population: 3.3,
    capital: "Lusaka City",
    coordinates: [28.2826, -15.4167],
    gdp: 11.2,
    literacy: 85.1,
    urbanization: 78.3,
    description: "Lusaka Province is the smallest but most populous province of Zambia and is home to the nation's capital city.",
    image: "https://images.unsplash.com/photo-1533105045747-12baf9d9d8ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "copperbelt",
    name: "Copperbelt",
    population: 2.5,
    capital: "Ndola",
    coordinates: [28.6372, -12.7916],
    gdp: 9.4,
    literacy: 83.7,
    urbanization: 81.5,
    description: "The Copperbelt Province is the center of Zambia's copper mining industry and was once the most urbanized and developed province in the nation.",
    image: "https://images.unsplash.com/photo-1687124939665-8e32c3832262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "central",
    name: "Central",
    population: 1.8,
    capital: "Kabwe",
    coordinates: [28.4465, -14.4426],
    gdp: 5.7,
    literacy: 76.3,
    urbanization: 42.1,
    description: "Central Province is located in the center of the country and is an important agricultural and mining region.",
    image: "https://images.unsplash.com/photo-1695747553472-f1c0fcba96a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "eastern",
    name: "Eastern",
    population: 2.0,
    capital: "Chipata",
    coordinates: [32.6459, -13.6391],
    gdp: 4.1,
    literacy: 65.9,
    urbanization: 23.7,
    description: "Eastern Province borders Malawi and Mozambique and is primarily agricultural with some tourism around South Luangwa National Park.",
    image: "https://images.unsplash.com/photo-1510690657315-8c9701da7f81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "northern",
    name: "Northern",
    population: 1.3,
    capital: "Kasama",
    coordinates: [31.1254, -10.1679],
    gdp: 3.2,
    literacy: 70.8,
    urbanization: 28.4,
    description: "Northern Province is known for its lakes, waterfalls, and historical sites including early human settlements.",
    image: "https://images.unsplash.com/photo-1619468129361-605ebea04b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "muchinga",
    name: "Muchinga",
    population: 0.9,
    capital: "Chinsali",
    coordinates: [32.0819, -10.5596],
    gdp: 2.1,
    literacy: 68.4,
    urbanization: 18.9,
    description: "Muchinga Province was created in 2011 when it was split from Northern Province and is the newest province in Zambia.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "southern",
    name: "Southern",
    population: 1.9,
    capital: "Choma",
    coordinates: [26.9815, -16.8012],
    gdp: 6.3,
    literacy: 75.2,
    urbanization: 35.6,
    description: "Southern Province is home to tourism hotspots including Victoria Falls and Mosi-oa-Tunya National Park.",
    image: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "western",
    name: "Western",
    population: 1.0,
    capital: "Mongu",
    coordinates: [23.1378, -14.9784],
    gdp: 2.8,
    literacy: 62.1,
    urbanization: 16.3,
    description: "Western Province is home to the Lozi people and the Kuomboka ceremony, with the Zambezi floodplains defining much of its geography.",
    image: "https://images.unsplash.com/photo-1613576508359-0ea4a3f2b66a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "luapula",
    name: "Luapula",
    population: 1.2,
    capital: "Mansa",
    coordinates: [28.8901, -11.1994],
    gdp: 3.3,
    literacy: 64.5,
    urbanization: 21.8,
    description: "Luapula Province borders the Democratic Republic of Congo and is centered around the Luapula River.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: "northwestern",
    name: "North-Western",
    population: 0.9,
    capital: "Solwezi",
    coordinates: [25.8253, -12.1774],
    gdp: 7.6,
    literacy: 69.7,
    urbanization: 30.2,
    description: "North-Western Province has become increasingly important due to the development of new copper mines.",
    image: "https://images.unsplash.com/photo-1613979718592-81671507605d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80",
  }
];

// Key Metrics Data
export const keyMetrics = [
  {
    id: "population",
    title: "Population",
    value: "17.9M",
    change: "+2.9%",
    isPositive: true,
    description: "Total population of Zambia"
  },
  {
    id: "gdp",
    title: "GDP",
    value: "$25.5B",
    change: "+3.7%",
    isPositive: true,
    description: "Gross Domestic Product"
  },
  {
    id: "literacy",
    title: "Literacy Rate",
    value: "73.2%",
    change: "+1.5%",
    isPositive: true,
    description: "Adult literacy rate"
  },
  {
    id: "urbanization",
    title: "Urbanization",
    value: "44.6%",
    change: "+2.1%",
    isPositive: true,
    description: "Urban population percentage"
  }
];

// Economic Sectors Data
export const economicSectors = [
  { name: "Agriculture", value: 32.4 },
  { name: "Mining", value: 26.2 },
  { name: "Manufacturing", value: 8.1 },
  { name: "Tourism", value: 7.5 },
  { name: "Construction", value: 6.8 },
  { name: "Transport", value: 5.4 },
  { name: "Financial Services", value: 4.9 },
  { name: "Other Services", value: 8.7 }
];

// Health Data
export const healthMetrics = {
  infantMortality: [
    { province: "Lusaka", value: 28 },
    { province: "Copperbelt", value: 31 },
    { province: "Central", value: 39 },
    { province: "Eastern", value: 45 },
    { province: "Northern", value: 42 },
    { province: "Muchinga", value: 47 },
    { province: "Southern", value: 36 },
    { province: "Western", value: 49 },
    { province: "Luapula", value: 44 },
    { province: "North-Western", value: 40 }
  ],
  lifeExpectancy: [
    { province: "Lusaka", value: 65.2 },
    { province: "Copperbelt", value: 64.1 },
    { province: "Central", value: 60.8 },
    { province: "Eastern", value: 58.7 },
    { province: "Northern", value: 59.2 },
    { province: "Muchinga", value: 58.3 },
    { province: "Southern", value: 61.4 },
    { province: "Western", value: 57.9 },
    { province: "Luapula", value: 58.5 },
    { province: "North-Western", value: 60.1 }
  ],
  accessToHealthcare: [
    { province: "Lusaka", value: 82 },
    { province: "Copperbelt", value: 79 },
    { province: "Central", value: 68 },
    { province: "Eastern", value: 59 },
    { province: "Northern", value: 62 },
    { province: "Muchinga", value: 57 },
    { province: "Southern", value: 65 },
    { province: "Western", value: 54 },
    { province: "Luapula", value: 60 },
    { province: "North-Western", value: 64 }
  ]
};

// Education Data
export const educationMetrics = {
  primaryEnrollment: [
    { province: "Lusaka", value: 92 },
    { province: "Copperbelt", value: 90 },
    { province: "Central", value: 85 },
    { province: "Eastern", value: 79 },
    { province: "Northern", value: 82 },
    { province: "Muchinga", value: 80 },
    { province: "Southern", value: 84 },
    { province: "Western", value: 76 },
    { province: "Luapula", value: 78 },
    { province: "North-Western", value: 81 }
  ],
  secondaryEnrollment: [
    { province: "Lusaka", value: 68 },
    { province: "Copperbelt", value: 65 },
    { province: "Central", value: 57 },
    { province: "Eastern", value: 49 },
    { province: "Northern", value: 53 },
    { province: "Muchinga", value: 51 },
    { province: "Southern", value: 58 },
    { province: "Western", value: 45 },
    { province: "Luapula", value: 48 },
    { province: "North-Western", value: 54 }
  ],
  tertiaryEnrollment: [
    { province: "Lusaka", value: 22 },
    { province: "Copperbelt", value: 18 },
    { province: "Central", value: 12 },
    { province: "Eastern", value: 8 },
    { province: "Northern", value: 10 },
    { province: "Muchinga", value: 7 },
    { province: "Southern", value: 13 },
    { province: "Western", value: 6 },
    { province: "Luapula", value: 9 },
    { province: "North-Western", value: 11 }
  ]
};

// Agriculture Data
export const agricultureMetrics = {
  cropProduction: [
    { province: "Lusaka", maize: 210, cassava: 65, sorghum: 42, rice: 15 },
    { province: "Copperbelt", maize: 180, cassava: 55, sorghum: 30, rice: 12 },
    { province: "Central", maize: 320, cassava: 80, sorghum: 65, rice: 25 },
    { province: "Eastern", maize: 380, cassava: 95, sorghum: 85, rice: 35 },
    { province: "Northern", maize: 260, cassava: 210, sorghum: 45, rice: 60 },
    { province: "Muchinga", maize: 240, cassava: 185, sorghum: 50, rice: 55 },
    { province: "Southern", maize: 290, cassava: 70, sorghum: 75, rice: 20 },
    { province: "Western", maize: 150, cassava: 260, sorghum: 40, rice: 85 },
    { province: "Luapula", maize: 170, cassava: 290, sorghum: 35, rice: 70 },
    { province: "North-Western", maize: 190, cassava: 140, sorghum: 45, rice: 30 }
  ],
  livestock: [
    { province: "Lusaka", cattle: 120, goats: 180, pigs: 95, poultry: 650 },
    { province: "Copperbelt", cattle: 90, goats: 140, pigs: 85, poultry: 580 },
    { province: "Central", cattle: 280, goats: 210, pigs: 110, poultry: 720 },
    { province: "Eastern", cattle: 310, goats: 290, pigs: 130, poultry: 780 },
    { province: "Northern", cattle: 160, goats: 240, pigs: 105, poultry: 690 },
    { province: "Muchinga", cattle: 150, goats: 220, pigs: 100, poultry: 670 },
    { province: "Southern", cattle: 350, goats: 270, pigs: 115, poultry: 750 },
    { province: "Western", cattle: 270, goats: 250, pigs: 90, poultry: 620 },
    { province: "Luapula", cattle: 130, goats: 200, pigs: 120, poultry: 700 },
    { province: "North-Western", cattle: 180, goats: 230, pigs: 95, poultry: 640 }
  ]
};

// Historical Data
export const historicalData = {
  population: [
    { year: 2012, value: 14.8 },
    { year: 2013, value: 15.2 },
    { year: 2014, value: 15.6 },
    { year: 2015, value: 16.0 },
    { year: 2016, value: 16.4 },
    { year: 2017, value: 16.8 },
    { year: 2018, value: 17.2 },
    { year: 2019, value: 17.6 },
    { year: 2020, value: 18.0 },
    { year: 2021, value: 18.4 },
    { year: 2022, value: 18.9 }
  ],
  gdp: [
    { year: 2012, value: 20.5 },
    { year: 2013, value: 22.4 },
    { year: 2014, value: 23.1 },
    { year: 2015, value: 21.2 },
    { year: 2016, value: 20.8 },
    { year: 2017, value: 21.7 },
    { year: 2018, value: 22.8 },
    { year: 2019, value: 23.3 },
    { year: 2020, value: 21.5 },
    { year: 2021, value: 22.9 },
    { year: 2022, value: 25.5 }
  ],
  inflation: [
    { year: 2012, value: 6.5 },
    { year: 2013, value: 7.1 },
    { year: 2014, value: 7.8 },
    { year: 2015, value: 10.1 },
    { year: 2016, value: 17.9 },
    { year: 2017, value: 15.5 },
    { year: 2018, value: 9.2 },
    { year: 2019, value: 11.7 },
    { year: 2020, value: 15.7 },
    { year: 2021, value: 16.4 },
    { year: 2022, value: 12.2 }
  ]
};

// Time periods for historical data
export const timePeriods = [
  { id: "1yr", name: "Last Year" },
  { id: "5yr", name: "Last 5 Years" },
  { id: "10yr", name: "Last 10 Years" },
  { id: "all", name: "All Time" }
];

// Data categories
export const dataCategories = [
  { id: "overview", name: "Overview", icon: "layout-dashboard" },
  { id: "health", name: "Health", icon: "heart" },
  { id: "education", name: "Education", icon: "book" },
  { id: "agriculture", name: "Agriculture", icon: "plant" },
  { id: "economy", name: "Economy", icon: "bar-chart-2" },
  { id: "infrastructure", name: "Infrastructure", icon: "building-2" }
];
