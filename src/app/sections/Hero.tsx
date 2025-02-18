
import HeroExperience from "../components/HeroExperience";

export default function Hero() {
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full h-100vh absolute inset-0">
        <HeroExperience />
      </div>
    </section>
  );
}
