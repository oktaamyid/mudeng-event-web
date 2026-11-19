import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Approach from "@/components/Approach";
import System from "@/components/System";
import Events from "@/components/Events";
import Curriculum from "@/components/Curriculum";
import Preview from "@/components/Preview";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getActiveEvent } from "@/lib/actions/events";
import { getHomeCmsContent } from "@/lib/actions/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
    const [{ data: activeEvent }, cms] = await Promise.all([
        getActiveEvent(),
        getHomeCmsContent(),
    ]);

    return (
        <main>
            <Navbar />

            <Hero event={activeEvent} />

            <About event={activeEvent} stats={cms.about.stats} />

            <Benefits cards={cms.benefits} />

            <Approach />

            <System />

            <Events />

            <Curriculum />

            <Preview />

            <Testimonials config={cms.testimonials} />

            <FAQ items={cms.faqs} />

            <CTA />

            <Footer />
        </main>
    );
}
