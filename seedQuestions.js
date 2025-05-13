const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("./models/Question");

dotenv.config();

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const questions = [
  // ✅ VECTORS QUESTIONS (Maths) - KEPT AS IT IS
  {
    subject: "Maths",
    topic: "Vectors",
    questionText: "What is the dot product of vectors A = (2,3) and B = (4,5)?",
    options: ["10", "23", "19", "26"],
    correctAnswer: "23",
    solution: "Dot Product = (2×4) + (3×5) = 8 + 15 = 23"
  },
  {
    subject: "Maths",
    topic: "Vectors",
    questionText: "What is the cross product of vectors A = (i + 2j + 3k) and B = (4i - j + 2k)?",
    options: ["2i - 6j - 9k", "i + j + k", "5i - j + 2k", "-2i + 6j + 9k"],
    correctAnswer: "-2i + 6j + 9k",
    solution: "Using determinant rule: |i  j  k| |1  2  3| |4 -1  2| gives -2i + 6j + 9k"
  },

  // ✅ 3D GEOMETRY QUESTIONS (Maths) - KEPT AS IT IS
  {
    subject: "Maths",
    topic: "3D Geometry",
    questionText: "Find the distance between the points A(1,2,3) and B(4,6,8).",
    options: ["5", "6", "7", "9"],
    correctAnswer: "7",
    solution: "Distance formula: √[(4-1)² + (6-2)² + (8-3)²] = √[9+16+25] = 7"
  },
  {
    subject: "Maths",
    topic: "3D Geometry",
    questionText: "The equation of a plane passing through (1,2,3) and perpendicular to vector (2,-1,4) is:",
    options: ["2x - y + 4z = 9", "x + y + z = 6", "3x - 2y + z = 5", "2x - y + 4z = 5"],
    correctAnswer: "2x - y + 4z = 9",
    solution: "Equation of plane: a(x-x₁) + b(y-y₁) + c(z-z₁) = 0. Using given data: 2(x-1) - 1(y-2) + 4(z-3) = 0 → 2x - y + 4z = 9"
  },

  // ✅ SOLID STATE QUESTIONS (Chemistry) - ADDED NEW
  {
    subject: "Chemistry",
    topic: "Solid State",
    questionText: "Which type of solid has the highest melting point?",
    options: ["Molecular solid", "Ionic solid", "Metallic solid", "Covalent solid"],
    correctAnswer: "Covalent solid",
    solution: "Covalent solids have strong bonding and the highest melting points."
  },
  {
    subject: "Chemistry",
    topic: "Solid State",
    questionText: "What is the coordination number of Na+ in NaCl crystal?",
    options: ["4", "6", "8", "12"],
    correctAnswer: "6",
    solution: "Each Na+ is surrounded by 6 Cl- ions in NaCl lattice."
  },
  {
    subject: "Chemistry",
    topic: "Solid State",
    questionText: "Which type of crystal defect is Schottky defect?",
    options: ["Point defect", "Line defect", "Surface defect", "Volume defect"],
    correctAnswer: "Point defect",
    solution: "Schottky defect occurs due to missing cations and anions, making it a point defect."
  },
  {
    subject: "Chemistry",
    topic: "Solid State",
    questionText: "Which of the following is an amorphous solid?",
    options: ["Diamond", "Quartz", "Glass", "Graphite"],
    correctAnswer: "Glass",
    solution: "Glass lacks a long-range order in its structure, making it an amorphous solid."
  },
  {
    subject: "Chemistry",
    topic: "Solid State",
    questionText: "What is the number of atoms in a face-centered cubic (FCC) unit cell?",
    options: ["2", "4", "6", "8"],
    correctAnswer: "4",
    solution: "FCC unit cells contain 4 atoms per unit cell."
  }
];

// ✅ Function to Seed Database
const seedDB = async () => {
  try {
    // ✅ Only delete **Solid State** from Chemistry
    await Question.deleteMany({
      subject: "Chemistry",
      topic: "Solid State"
    });

    console.log("✅ Removed old Solid State questions (Chemistry)!");

    // ✅ Insert new questions WITHOUT affecting Vectors or 3D Geometry
    await Question.insertMany(questions);
    console.log("✅ New Solid State questions added! Maths topics remain unchanged.");

    // ✅ Close MongoDB connection after inserting
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// ✅ Run the seed function
seedDB();
