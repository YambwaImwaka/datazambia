// Comprehensive Zambia Government Data
export const cabinetMinisters = [
  {
    id: 1,
    name: "Hakainde Hichilema",
    position: "President",
    party: "United Party for National Development (UPND)",
    constituency: "National",
    portfolio: "Head of State and Government",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-08-24",
    contact: {
      office: "State House, Lusaka",
      phone: "+260-211-254500",
      email: "president@statehouse.gov.zm"
    }
  },
  {
    id: 2,
    name: "Mutale Nalumango",
    position: "Vice President",
    party: "United Party for National Development (UPND)",
    constituency: "National",
    portfolio: "Vice President",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-08-24",
    contact: {
      office: "Cabinet Office, Lusaka",
      phone: "+260-211-254380",
      email: "vp@cabinet.gov.zm"
    }
  },
  {
    id: 3,
    name: "Paul C C Kabuswe",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Chililabombwe",
    portfolio: "Mines and Minerals Development",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Mines, Lusaka",
      phone: "+260-211-252066",
      email: "info@mines.gov.zm"
    }
  },
  {
    id: 4,
    name: "Chipoka Mulenga",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Chingola",
    portfolio: "Commerce, Trade and Industry",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Commerce, Lusaka",
      phone: "+260-211-228301",
      email: "info@mcti.gov.zm"
    }
  },
  {
    id: 5,
    name: "Frank Tayali",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Ndola Central",
    portfolio: "Transport and Logistics",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Transport, Lusaka",
      phone: "+260-211-251055",
      email: "info@transport.gov.zm"
    }
  },
  {
    id: 6,
    name: "Reuben Mtolo Phiri",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Chipata Central",
    portfolio: "Agriculture",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Agriculture, Lusaka",
      phone: "+260-211-252377",
      email: "info@agriculture.gov.zm"
    }
  },
  {
    id: 7,
    name: "Douglas Munsaka Syakalima",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Chirundu",
    portfolio: "Health",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Health, Lusaka",
      phone: "+260-211-253344",
      email: "info@health.gov.zm"
    }
  },
  {
    id: 8,
    name: "Situmbeko Musokotwane",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Namwala",
    portfolio: "Finance and National Planning",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Finance, Lusaka",
      phone: "+260-211-250773",
      email: "info@mof.gov.zm"
    }
  },
  {
    id: 9,
    name: "Douglas Syakalima",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Chirundu",
    portfolio: "Education",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Education, Lusaka",
      phone: "+260-211-254608",
      email: "info@moe.gov.zm"
    }
  },
  {
    id: 10,
    name: "Jack Mwiimbu",
    position: "Minister",
    party: "United Party for National Development (UPND)",
    constituency: "Monze Central",
    portfolio: "Home Affairs and Internal Security",
    image: "/api/placeholder/150/150",
    appointmentDate: "2021-09-13",
    contact: {
      office: "Ministry of Home Affairs, Lusaka",
      phone: "+260-211-254777",
      email: "info@homeaffairs.gov.zm"
    }
  }
];

export const governmentStatistics = {
  civilService: {
    totalEmployees: 247000,
    breakdown: {
      teachers: 89500,
      healthWorkers: 34200,
      police: 18700,
      military: 16000,
      administration: 42800,
      technical: 28400,
      others: 17400
    },
    payrollBudget: "ZMW 24.7 billion",
    averageSalary: "ZMW 8,400",
    retirementAge: 65,
    pensionFund: "ZMW 47.3 billion"
  },
  defence: {
    zambianDefenceForce: {
      total: 16000,
      army: 13500,
      airForce: 2500,
      budget: "ZMW 4.2 billion",
      commandStructure: [
        "Commander-in-Chief: President Hakainde Hichilema",
        "Chief of Defence Staff: General Dennis Alibuzwi",
        "Army Commander: Lieutenant General Geoffrey Zyambo",
        "Air Force Commander: Air Marshal Collin Barry"
      ]
    },
    zambiaPoliceService: {
      total: 18700,
      regularPolice: 14200,
      paramilitaryUnit: 2800,
      specialUnits: 1700,
      budget: "ZMW 3.8 billion",
      commandStructure: [
        "Inspector General: Lemmy Kajoba",
        "Deputy Inspector General (Operations): Bonny Kapeso",
        "Deputy Inspector General (Administration): Eugene Sibote"
      ]
    },
    zambianNationalService: {
      total: 3200,
      budget: "ZMW 450 million",
      activities: ["Youth training", "Agriculture", "Infrastructure development"],
      commander: "Major General Nathan Mulenga"
    }
  },
  judiciary: {
    supremeCourt: {
      judges: 9,
      chiefJustice: "Dr. Mumba Malila"
    },
    courtOfAppeal: {
      judges: 12,
      president: "Justice Christopher Chanda Kajimanga"
    },
    highCourt: {
      judges: 45,
      chiefJustice: "Justice Dr. Mumba Malila"
    },
    magistrateCourts: {
      courts: 147,
      magistrates: 287
    },
    localCourts: {
      courts: 542,
      justices: 1284
    }
  }
};

export const provincialGovernment = {
  lusaka: {
    name: "Lusaka Province",
    provincialMinister: {
      name: "Obvious Mwaliteta",
      party: "UPND",
      appointmentDate: "2021-10-15"
    },
    permanentSecretary: {
      name: "Robert Kamalata",
      appointmentDate: "2022-03-12"
    },
    districts: [
      {
        name: "Lusaka",
        mayor: "Miles Sampa",
        townClerk: "Alex Mwansa",
        population: 3200000,
        constituencies: [
          "Lusaka Central", "Kabwata", "Matero", "Munali", "Chongwe"
        ]
      },
      {
        name: "Chongwe",
        councilChairperson: "Given Katuta",
        councilSecretary: "Mary Phiri",
        population: 247000,
        constituencies: ["Chongwe"]
      },
      {
        name: "Kafue",
        mayor: "Christopher Konga",
        townClerk: "Patricia Mwanza",
        population: 285000,
        constituencies: ["Kafue"]
      },
      {
        name: "Chilanga",
        councilChairperson: "Joseph Malama",
        councilSecretary: "Susan Banda",
        population: 89000,
        constituencies: ["Chilanga"]
      }
    ]
  },
  copperbelt: {
    name: "Copperbelt Province",
    provincialMinister: {
      name: "Elisha Matambo",
      party: "UPND",
      appointmentDate: "2021-10-15"
    },
    permanentSecretary: {
      name: "Bright Nundwe",
      appointmentDate: "2022-04-20"
    },
    districts: [
      {
        name: "Ndola",
        mayor: "Amon Chisenga",
        townClerk: "Anthony Mubanga",
        population: 627000,
        constituencies: ["Ndola Central", "Kabushi", "Chifubu"]
      },
      {
        name: "Kitwe",
        mayor: "Christopher Kang'ombe",
        townClerk: "Godwin Musenga",
        population: 738000,
        constituencies: ["Kitwe Central", "Chimwemwe", "Kamfinsa", "Kwacha"]
      },
      {
        name: "Luanshya",
        mayor: "Nathan Chanda",
        townClerk: "Memory Sililo",
        population: 156000,
        constituencies: ["Luanshya"]
      },
      {
        name: "Mufulira",
        mayor: "Peter Ng'andu",
        townClerk: "Fred Simunyama",
        population: 140000,
        constituencies: ["Mufulira"]
      },
      {
        name: "Chingola",
        mayor: "Carl Zimba",
        townClerk: "Rose Chanda",
        population: 216000,
        constituencies: ["Chingola"]
      }
    ]
  },
  central: {
    name: "Central Province",
    provincialMinister: {
      name: "Sydney Mushanga",
      party: "UPND",
      appointmentDate: "2021-10-15"
    },
    permanentSecretary: {
      name: "Chanda Kabwe",
      appointmentDate: "2022-02-18"
    },
    districts: [
      {
        name: "Kabwe",
        mayor: "Knowledge Miyoba",
        townClerk: "Francis Kapembwa",
        population: 230000,
        constituencies: ["Kabwe Central", "Bwacha"]
      },
      {
        name: "Kapiri Mposhi",
        councilChairperson: "Joseph Katongo",
        councilSecretary: "Agnes Mwanza",
        population: 240000,
        constituencies: ["Kapiri Mposhi"]
      },
      {
        name: "Mkushi",
        councilChairperson: "Paul Musonda",
        councilSecretary: "Janet Phiri",
        population: 167000,
        constituencies: ["Mkushi North", "Mkushi South"]
      }
    ]
  }
};

export const constituencies = [
  // Lusaka Province
  { name: "Lusaka Central", province: "Lusaka", mp: "Given Lubinda", party: "PF" },
  { name: "Kabwata", province: "Lusaka", mp: "Clement Andeleki", party: "UPND" },
  { name: "Matero", province: "Lusaka", mp: "Lloyd Kaziya", party: "UPND" },
  { name: "Munali", province: "Lusaka", mp: "Professor Nkandu Luo", party: "PF" },
  { name: "Chongwe", province: "Lusaka", mp: "Sylvia Masebo", party: "UPND" },
  
  // Copperbelt Province
  { name: "Ndola Central", province: "Copperbelt", mp: "Frank Tayali", party: "UPND" },
  { name: "Kabushi", province: "Copperbelt", mp: "Bowman Lusambo", party: "PF" },
  { name: "Chifubu", province: "Copperbelt", mp: "Frank Ng'ambi", party: "UPND" },
  { name: "Kitwe Central", province: "Copperbelt", mp: "Christopher Kang'ombe", party: "UPND" },
  { name: "Chimwemwe", province: "Copperbelt", mp: "Ronald Chitotela", party: "PF" },
  
  // Central Province
  { name: "Kabwe Central", province: "Central", mp: "Tutwa Ngulube", party: "UPND" },
  { name: "Bwacha", province: "Central", mp: "Sydney Mushanga", party: "UPND" },
  { name: "Kapiri Mposhi", province: "Central", mp: "Stanley Kakubo", party: "UPND" },
  
  // Eastern Province
  { name: "Chipata Central", province: "Eastern", mp: "Reuben Mtolo Phiri", party: "UPND" },
  { name: "Lundazi", province: "Eastern", mp: "Brenda Tambatamba", party: "UPND" },
  { name: "Petauke Central", province: "Eastern", mp: "Emmanuel Jay Banda", party: "UPND" },
  
  // Southern Province
  { name: "Livingstone", province: "Southern", mp: "Mathews Jere", party: "UPND" },
  { name: "Choma", province: "Southern", mp: "Cornelius Mweetwa", party: "UPND" },
  { name: "Monze Central", province: "Southern", mp: "Jack Mwiimbu", party: "UPND" },
  
  // Western Province
  { name: "Mongu Central", province: "Western", mp: "Peter Daka", party: "UPND" },
  { name: "Senanga", province: "Western", mp: "Francine Yamba", party: "UPND" },
  { name: "Kalabo Central", province: "Western", mp: "Nickson Chilangwa", party: "UPND" },
  
  // Northern Province
  { name: "Kasama Central", province: "Northern", mp: "Kelvin Sampa", party: "UPND" },
  { name: "Mbala", province: "Northern", mp: "Mwalimu Simfukwe", party: "UPND" },
  { name: "Mpika", province: "Northern", mp: "Francis Kapyanga", party: "UPND" },
  
  // Muchinga Province
  { name: "Chinsali", province: "Muchinga", mp: "Kalaluka Mukaluke", party: "UPND" },
  { name: "Isoka", province: "Muchinga", mp: "Mulenga Fube", party: "UPND" },
  { name: "Nakonde", province: "Muchinga", mp: "Yotam Mtayachalo", party: "UPND" },
  
  // Luapula Province
  { name: "Mansa Central", province: "Luapula", mp: "Chitalu Chilufya", party: "PF" },
  { name: "Samfya", province: "Luapula", mp: "Chanda Chilufya", party: "UPND" },
  { name: "Kawambwa", province: "Luapula", mp: "Nixon Chilangwa", party: "UPND" },
  
  // North-Western Province
  { name: "Solwezi Central", province: "North-Western", mp: "Sarah Sayifwanda", party: "UPND" },
  { name: "Kabompo", province: "North-Western", mp: "Ambrose Lufuma", party: "UPND" },
  { name: "Zambezi East", province: "North-Western", mp: "Brian Mundubile", party: "PF" }
];

export const traditionalLeaders = [
  {
    title: "Litunga",
    name: "Lubosi Imwiko II",
    people: "Lozi",
    province: "Western",
    palace: "Lealui Palace",
    established: "1878",
    ceremony: "Kuomboka"
  },
  {
    title: "Chitimukulu",
    name: "Kanyanta Manga II",
    people: "Bemba",
    province: "Northern/Muchinga",
    palace: "Mungule Palace",
    established: "1760",
    ceremony: "Ukusefya Pa Ng'wena"
  },
  {
    title: "Gawa Undi",
    name: "Gomani Undi VII",
    people: "Chewa",
    province: "Eastern",
    palace: "Mkaika Palace",
    established: "1500",
    ceremony: "Nc'wala"
  },
  {
    title: "Monze",
    name: "Monze Muyunda",
    people: "Tonga",
    province: "Southern",
    palace: "Monze Palace",
    established: "1700",
    ceremony: "Lwiindi"
  }
];

export const politicalParties = [
  {
    name: "United Party for National Development",
    abbreviation: "UPND",
    president: "Hakainde Hichilema",
    foundedYear: 1998,
    ideology: "Liberal Democracy",
    currentSeats: 82,
    strongholds: ["Southern", "Western", "North-Western"]
  },
  {
    name: "Patriotic Front",
    abbreviation: "PF",
    president: "Edgar Lungu",
    foundedYear: 2001,
    ideology: "Social Democracy",
    currentSeats: 62,
    strongholds: ["Lusaka", "Copperbelt", "Northern"]
  },
  {
    name: "United Kwacha Alliance",
    abbreviation: "UKA",
    president: "Miles Sampa",
    foundedYear: 2023,
    ideology: "Populism",
    currentSeats: 8,
    strongholds: ["Urban areas"]
  }
];