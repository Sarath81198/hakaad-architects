const projects = [
  // ===============================
  // Architecture
  // ===============================
  {
    id: 1,
    category: "architecture",
    title: "The Garden Residence",
    image: "/hakaad-architects/assets/images/Architecture/Architect1.jpg",
  },
  {
    id: 2,
    category: "architecture",
    title: "Courtyard Villa",
    image: "/hakaad-architects/assets/images/Architecture/Architect2.jpg",
  },
  {
    id: 3,
    category: "architecture",
    title: "The Garden Residence",
    image: "/hakaad-architects/assets/images/Architecture/Architect4.jpg",
  },
  {
    id: 4,
    category: "architecture",
    title: "Courtyard Villa",
    image: "/hakaad-architects/assets/images/Architecture/Architect5.jpg",
  },
  {
    id: 5,
    category: "architecture",
    title: "The Garden Residence",
    image: "/hakaad-architects/assets/images/Architecture/Architect7.jpg",
  },
  {
    id: 6,
    category: "architecture",
    title: "Courtyard Villa",
    image: "/hakaad-architects/assets/images/Architecture/Architect8.jpg",
  },

  // ===============================
  // Interior
  // ===============================
  {
    id: 101,
    category: "interior",
    title: "Minimalist Living Space",
    image: "/hakaad-architects/assets/images/Architecture/Architect3.jpg",
  },
  {
    id: 102,
    category: "interior",
    title: "Minimalist Living Space",
    image: "/hakaad-architects/assets/images/Architecture/Architect6.jpg",
  },
  {
    id: 103,
    category: "interior",
    title: "Modern Interior 9",
    image: "/hakaad-architects/assets/images/Interior/Interior9.jpg",
  },
  {
    id: 104,
    category: "interior",
    title: "Modern Interior 11",
    image: "/hakaad-architects/assets/images/Interior/Interior11.jpg",
  },
  {
    id: 105,
    category: "interior",
    title: "Modern Interior 51",
    image: "/hakaad-architects/assets/images/Interior/Interior51.jpg",
  },
  {
    id: 106,
    category: "interior",
    title: "Modern Interior 52",
    image: "/hakaad-architects/assets/images/Interior/Interior52.jpg",
  },
  {
    id: 107,
    category: "interior",
    title: "Modern Interior 53",
    image: "/hakaad-architects/assets/images/Interior/Interior53.jpg",
  },
  {
    id: 108,
    category: "interior",
    title: "Modern Interior 54",
    image: "/hakaad-architects/assets/images/Interior/Interior54.jpg",
  },
  {
    id: 109,
    category: "interior",
    title: "Modern Interior 55",
    image: "/hakaad-architects/assets/images/Interior/Interior55.jpg",
  },

  // ===============================
  // Commercial
  // ===============================
  {
    id: 201,
    category: "commercial",
    title: "Commercial Project 1",
    image: "/hakaad-architects/assets/images/Commercial/Commercial1.jpg",
  },

  // ===============================
  // Completed
  // ===============================
  ...Array.from({ length: 39 }, (_, i) => ({
    id: 301 + i,
    category: "completed",
    title: `Completed Project ${i + 1}`,
    image: `/hakaad-architects/assets/images/Completed/Completed${i + 1}.jpg`,
  })),
];