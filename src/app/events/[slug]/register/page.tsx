import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/actions/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default async function RegisterEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const { data: event } = await getEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#050505]">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-white mb-2">Register to {event.title}</h1>
          <p className="text-white/60">Fill in the details below to join the event.</p>
        </div>
        
        <RegistrationForm event={event} />
      </main>
      <Footer />
    </div>
  );
}
