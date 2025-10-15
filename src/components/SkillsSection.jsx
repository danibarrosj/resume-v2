import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // BBA
  { name: "Intro to Business Management", level: 85, category: "BBA" },
  { name: "Principles of Macroeconomics", level: 82, category: "BBA" },
  { name: "Principles of Microeconomics", level: 83, category: "BBA" },
  { name: "Introduction to Statistics", level: 88, category: "BBA" },
  { name: "Introduction to Research", level: 86, category: "BBA" },
  { name: "Intro to Academic Writing II", level: 80, category: "BBA" },
  { name: "Academic Writing I", level: 78, category: "BBA" },
  { name: "Mathematical Literature", level: 82, category: "BBA" },
  { name: "Sociology", level: 79, category: "BBA" },
  { name: "Oral Communications", level: 85, category: "BBA" },
  { name: "Principles of Accounting I", level: 87, category: "BBA" },
  { name: "Principles of Accounting II", level: 88, category: "BBA" },
  { name: "Human Resource Management", level: 90, category: "BBA" },
  { name: "Management and Organizational Theory", level: 91, category: "BBA" },
  { name: "Business Law I", level: 84, category: "BBA" },
  { name: "Business Ethics", level: 86, category: "BBA" },
  { name: "Marketing Principles", level: 89, category: "BBA" },
  { name: "Advanced Business Writing", level: 83, category: "BBA" },
  { name: "Organizational Leadership", level: 90, category: "BBA" },
  { name: "Strategic Management", level: 92, category: "BBA" },
  { name: "Fundamentals of Building Wealth", level: 88, category: "BBA" },
  { name: "Business Finance", level: 90, category: "BBA" },

  // MBA
  { name: "Business Competencies", level: 88, category: "MBA" },
  { name: "Corporate Financial Management", level: 90, category: "MBA" },
  { name: "Financial & Managerial Accounting", level: 85, category: "MBA" },
  { name: "Lead & Influence", level: 92, category: "MBA" },
  { name: "Social & Legal Responsibility in Business", level: 80, category: "MBA" },
  { name: "Strategic Integration", level: 89, category: "MBA" },
  { name: "Diversity & Inclusion", level: 86, category: "MBA" },
  { name: "Business Analytics", level: 91, category: "MBA" },
  { name: "Business Law", level: 84, category: "MBA" },

  // MSCSIT
  { name: "Structure Programming (C++)", level: 90, category: "MSCSIT" },
  { name: "Data Structures (C++)", level: 70, category: "MSCSIT" },
  { name: "Programming Using Scripting (Python)", level: 85, category: "MSCSIT" },
  { name: "Object-Oriented Programming (Java)", level: 95, category: "MSCSIT" },
  { name: "Database Design (SQL)", level: 80, category: "MSCSIT" },
  { name: "Machine Learning (Jupyter, Pandas, Numpy)", level: 88, category: "MSCSIT" },
  { name: "Information Systems Security", level: 90, category: "MSCSIT" },
  { name: "Intro to Artificial Intelligence", level: 92, category: "MSCSIT" },
  { name: "Concepts & Apps of Info Tech", level: 85, category: "MSCSIT" },
  { name: "Information Systems in Organizations", level: 87, category: "MSCSIT" },

  // MSCYB
  { name: "Computer Networks", level: 90, category: "MSCYB" },
  { name: "Intro to Cybersecurity", level: 88, category: "MSCYB" },
  { name: "Network Security I", level: 92, category: "MSCYB" },
  { name: "Securing the Cloud", level: 91, category: "MSCYB" },
];


// "all" category temporarily disabled
const categories = ["MSCSIT","MSCYB", "MBA", "BBA",];

export const SkillsSection = () => {
  // Start on the first tab (e.g., MSCSIT). Change to "BBA" if you prefer.
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Filter strictly by the active category
  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Education</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
