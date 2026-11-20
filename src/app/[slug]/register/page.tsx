import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/actions/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import { FormDescriptionCard } from "@/components/FormDescriptionCard";

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
        <div className="flex min-h-screen flex-col bg-gray-50 overflow-x-clip">
            <Navbar />
            <main className="flex-1 px-3 pt-24 pb-12 sm:px-6 sm:pt-32 sm:pb-20 overflow-x-clip">
                <div className="mx-auto mb-4 max-w-3xl sm:mb-5">
                    {!event.isRegistrationOpen ? (
                        <>
                            <h1 className="font-display mb-5 text-center text-4xl text-[#6849E1] sm:text-5xl">
                                Register to {event.title}
                            </h1>
                            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                </div>
                                <h2 className="mb-2 text-2xl font-semibold">Pendaftaran Ditutup</h2>
                                <p className="text-gray-600">
                                    Mohon maaf, pendaftaran untuk event ini sudah tidak tersedia. 
                                    Silakan nantikan event menarik kami selanjutnya!
                                </p>
                            </div>
                        </>
                    ) : (
                        <FormDescriptionCard
                            title={event.title}
                            html={event.formDescription}
                        />
                    )}
                </div>

                {event.isRegistrationOpen && (
                    <RegistrationForm event={event} />
                )}
            </main>
            <Footer />
        </div>
    );
}
