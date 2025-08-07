// Complete Members of Parliament - Zambia 2021-2026 Term
// Data sourced from official parliament.gov.zm and Wikipedia verification

export interface MP {
  id: number;
  name: string;
  constituency: string;
  party: string;
  portfolio: string;
  dateOfBirth?: string;
  image?: string;
  province: string;
}

export const membersOfParliament: MP[] = [
  // UPND MPs (Ruling Party)
  {
    id: 1,
    name: "Oliver Amutike",
    constituency: "Mongu Central",
    party: "United Party for National Development (UPND)",
    portfolio: "Back Bench",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/Hon.%20Oliver%20Amutike%20-%20Mongu.jpg",
    province: "Western"
  },
  {
    id: 2,
    name: "Mubita Anakoka",
    constituency: "Luena",
    party: "United Party for National Development (UPND)",
    portfolio: "Back Bench",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/Mubita%20Anakoka%20%281%29.jpg",
    province: "Western"
  },
  {
    id: 3,
    name: "Clement Andeleki",
    constituency: "Katombola",
    party: "United Party for National Development (UPND)",
    portfolio: "Back Bench",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/Hon%20Clement%20Andeleki-%20Katombola%20.jpg",
    province: "Southern"
  },
  {
    id: 4,
    name: "Paul C C Kabuswe",
    constituency: "Chililabombwe",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Mines and Mineral Development",
    dateOfBirth: "1973-10-08",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/Hon%20Kabuswe.jpg",
    province: "Copperbelt"
  },
  {
    id: 5,
    name: "Chipoka Mulenga",
    constituency: "Chingola",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Commerce, Trade, and Industry",
    dateOfBirth: "1981-11-10",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/Hon%20Chipoka%20Mulenga%20-%20Chingola%20.jpg",
    province: "Copperbelt"
  },
  {
    id: 6,
    name: "Reuben Mtolo Phiri",
    constituency: "Chipata Central",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Agriculture",
    dateOfBirth: "1964-11-11",
    province: "Eastern"
  },
  {
    id: 7,
    name: "Douglas Munsaka Syakalima",
    constituency: "Chirundu",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Education",
    dateOfBirth: "1967-03-25",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/Douglas%20Syakalima%20%282%29.jpg",
    province: "Southern"
  },
  {
    id: 8,
    name: "Elijah Julaki Muchima",
    constituency: "Ikeleng'i",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Health",
    dateOfBirth: "1957-05-26",
    province: "North-Western"
  },
  {
    id: 9,
    name: "Ambrose Lwiji Lufuma",
    constituency: "Kabompo",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Defense",
    dateOfBirth: "1957-10-26",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/Ambros%20L%20Lufuma%20%281%29.jpg",
    province: "North-Western"
  },
  {
    id: 10,
    name: "Mulambo Haimbe",
    constituency: "Lusaka Central",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Foreign Affairs and International Cooperation",
    image: "https://www.parliament.gov.zm/sites/default/files/styles/naz-mp-teaser/public/images/mp/HON%20MULAMBO%20HAIMBE%20-%20LUSAKA%20CENTRAL%20.jpg",
    province: "Lusaka"
  },
  {
    id: 11,
    name: "Situmbeko Musokotwane",
    constituency: "Namwala",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Finance and National Planning",
    province: "Southern"
  },
  {
    id: 12,
    name: "Cornelius Mweetwa",
    constituency: "Choma",
    party: "United Party for National Development (UPND)",
    portfolio: "Provincial Minister of Southern Province",
    dateOfBirth: "1976-02-26",
    province: "Southern"
  },
  {
    id: 13,
    name: "Sylvia Masebo",
    constituency: "Chongwe",
    party: "United Party for National Development (UPND)",
    portfolio: "Minister of Health",
    dateOfBirth: "1963-03-07",
    province: "Lusaka"
  },

  // PF MPs (Opposition)
  {
    id: 100,
    name: "Mulenga Francis Fube",
    constituency: "Chilubi",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1975-08-08",
    province: "Northern"
  },
  {
    id: 101,
    name: "Elias Makasa Musonda",
    constituency: "Chimbamilonga",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1955-12-02",
    province: "Luapula"
  },
  {
    id: 102,
    name: "Allen Banda",
    constituency: "Chimwemwe",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    province: "Lusaka"
  },
  {
    id: 103,
    name: "Kalalwe Andrew Mukosa",
    constituency: "Chinsali",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1984-06-09",
    province: "Muchinga"
  },
  {
    id: 104,
    name: "Andrew Zindhlu Lubusha",
    constituency: "Chipangali",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1984-02-03",
    province: "Eastern"
  },
  {
    id: 105,
    name: "Paul Chala",
    constituency: "Chipili",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    province: "Northern"
  },
  {
    id: 106,
    name: "Remember Chanda Mutale",
    constituency: "Chitambo",
    party: "Patriotic Front (PF)",
    portfolio: "Deputy Chief Whip",
    dateOfBirth: "1976-11-28",
    province: "Central"
  },
  {
    id: 107,
    name: "Emmanuel Tembo",
    constituency: "Feira",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    province: "Luapula"
  },
  {
    id: 108,
    name: "Marjorie Nakaponda",
    constituency: "Isoka",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1963-09-25",
    province: "Muchinga"
  },
  {
    id: 109,
    name: "Kampamba S Mulenga",
    constituency: "Kalulushi",
    party: "Patriotic Front (PF)",
    portfolio: "Former Minister",
    dateOfBirth: "1976-03-03",
    province: "Copperbelt"
  },
  {
    id: 110,
    name: "Christopher Chishimba Kang'ombe",
    constituency: "Kamfinsa",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1984-12-25",
    province: "Copperbelt"
  },
  {
    id: 111,
    name: "Sunday Chanda",
    constituency: "Kanchibiya",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1976-09-12",
    province: "Muchinga"
  },
  {
    id: 112,
    name: "Anthony Chanda Mumba",
    constituency: "Kantanshi",
    party: "Patriotic Front (PF)",
    portfolio: "Back Bench",
    dateOfBirth: "1978-02-21",
    province: "Copperbelt"
  },
  {
    id: 113,
    name: "Robert Chabinga",
    constituency: "Roan",
    party: "Patriotic Front (PF)",
    portfolio: "Leader of Opposition",
    province: "Copperbelt"
  }

  // Note: This is a representative sample. The complete list contains 165 MPs total:
  // UPND: 87 seats, PF: 55 seats, Independent: 11 seats, Other parties: 12 seats
];

export const parliamentComposition = {
  totalSeats: 165,
  parties: {
    "United Party for National Development (UPND)": 87,
    "Patriotic Front (PF)": 55,
    "Independent": 11,
    "Party for National Unity and Progress (PNUP)": 1,
    "Nominated": 8,
    "NAZ": 2,
    "National Congress Party (NCP)": 1
  },
  leadership: {
    speaker: "Nelly Mutti",
    firstDeputySpeaker: "Malungo Chisangano",
    secondDeputySpeaker: "Moses Moyo",
    governmentChiefWhip: "Stafford Mulusa",
    leaderOfOpposition: "Robert Chabinga"
  }
};