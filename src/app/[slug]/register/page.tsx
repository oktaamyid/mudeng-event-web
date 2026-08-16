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
        <div className="flex min-h-screen flex-col bg-gray-50 overflow-x-clip">
            <Navbar />
            <main className="flex-1 px-4 pt-32 pb-20 overflow-x-clip">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h1 className="font-display mb-4 text-4xl text-[#6849E1]">
                        Register to {event.title}
                    </h1>
                    
                    {!event.isRegistrationOpen ? (
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center mt-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">Pendaftaran Ditutup</h2>
                            <p className="text-gray-600">
                                Mohon maaf, pendaftaran untuk event ini sudah tidak tersedia. 
                                Silakan nantikan event menarik kami selanjutnya!
                            </p>
                        </div>
                    ) : (
                        <>
                            {event.formDescription ? (
                                <div 
                                    className="prose prose-sm md:prose-base prose-p:text-gray-600 prose-headings:text-gray-900 mx-auto text-left max-w-none text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: event.formDescription }}
                                />
                            ) : (
                                <p className="text-gray-600 whitespace-pre-line text-lg">
                                    Fill in the details below to join the event.
                                </p>
                            )}
                        </>
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
