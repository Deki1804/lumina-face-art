import { ContactButtons } from "@/components/ContactButton";
import { Footer } from "@/components/Footer";
import { GalleryPreview } from "@/components/GalleryPreview";
import { Hero } from "@/components/Hero";
import { SectionCard, SectionWrapper } from "@/components/SectionCard";
import { services } from "@/lib/profile";

export default function HomePage() {
  return (
    <main className="relative z-10 min-h-dvh overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-lg">
        <Hero />
        <ContactButtons />

        <div className="gold-line mx-auto my-2 w-32 opacity-60" />

        <GalleryPreview />

        <SectionWrapper title="Što nudim">
          <div className="grid gap-4">
            {services.map((service) => (
              <SectionCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </SectionWrapper>

        <Footer />
      </div>
    </main>
  );
}
