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
        <div className="flex min-h-screen flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1 px-4 pt-32 pb-20">
                <div className="mb-10 text-center">
                    <h1 className="font-display mb-2 text-4xl text-gray-900">
                        Register to {event.title}
                    </h1>
                    <p className="text-gray-600">
                        Fill in the details below to join the event.
                    </p>
                </div>

                <RegistrationForm event={event} />
            </main>
            <Footer />
        </div>
    );
}
