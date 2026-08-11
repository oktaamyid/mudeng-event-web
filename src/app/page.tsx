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

export default async function Home() {
    const { data: activeEvent } = await getActiveEvent();
    return (
        <main>
            <Navbar />

            <Hero event={activeEvent} />

            <About event={activeEvent} />

            <Benefits />

            <Approach />

            <System />

            <Events />

            <Curriculum />

            <Preview />

            <Testimonials />

            <FAQ />

            <CTA />

            <Footer />
        </main>
    );
}
