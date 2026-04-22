import {
  Megaphone,
  Cake,
  Droplets,
  Leaf,
  FlaskConical,
  GlassWater,
  HandMetal,
  Book,
  Brush,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { name: "Promos", icon: Megaphone },
  { name: "Snacks", icon: Cake },
  { name: "Fats & Oils", icon: Droplets },
  { name: "Vegetables", icon: Leaf },
  { name: "Food Additives", icon: FlaskConical },
  { name: "Beverage", icon: GlassWater },
  { name: "Cleaning", icon: HandMetal },
  { name: "Stationery", icon: Book },
  { name: "Cosmetics", icon: Brush },
];

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]">
      {/* Header - Hides on small screens like your CSS */}
      <div className="hidden min-[815px]:flex bg-success text-white py-2 justify-center rounded-t-[5px]">
        <h3 className="font-bold">Top Sales</h3>
      </div>

      {/* Items List - Hides on small screens like your CSS */}
      <ul className="hidden min-[815px]:flex flex-col bg-white p-2 gap-2.5">
        {SIDEBAR_ITEMS.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-4 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <item.icon size={20} className="text-success" />
            <span className="text-sm whitespace-nowrap text-gray-700">
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
