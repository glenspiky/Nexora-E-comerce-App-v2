import { Sidebar } from "./Sidebar";
import { HeroSlider } from "./HeroSlider";

export const TopSellers = () => {
  return (
    <section className="mt-[10px] w-full max-w-[1440px] mx-auto px-4 lg:px-10">
      <div className="flex flex-col-reverse min-[815px]:flex-row gap-[10px] min-[815px]:gap-5">
        {/* Left Sidebar */}
        <div className="w-full min-[815px]:w-[250px] shrink-0">
          <Sidebar />
        </div>

        {/* Right Slider */}
        <div className="flex-1 overflow-hidden rounded-sm">
          <HeroSlider />
        </div>
      </div>
    </section>
  );
};
