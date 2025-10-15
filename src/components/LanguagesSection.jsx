import { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
  { name: "English", level: 100, category: "Human" },
  { name: "Spanish", level: 100, category: "Human" },
  { name: "Japanese", level: 65, category: "Human" },
];

// Include "all" so the filter works as written
const categories = ["Human"];

export const LanguagesSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredLanguages =
    activeCategory === "all"
      ? languages
      : languages.filter((l) => l.category === activeCategory);

  return (
    <section id="languages" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Languages</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((lang) => (
            <div
              key={lang.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover text-left"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">{lang.name}</h3>
                <span className="text-sm text-muted-foreground">
                  {lang.level}%
                </span>
              </div>

              <div
                className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={lang.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${lang.name} proficiency`}
              >
                <div
                  className="bg-primary h-2 rounded-full transition-[width] duration-700 ease-out"
                  style={{ width: `${lang.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
