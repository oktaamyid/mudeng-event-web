export default function EventFAQ({ faqs = [] }: { faqs?: { question: string; answer: string }[] }) {
  const defaultFaqs = [
    {
      q: "How does the subscription work?",
      a: "Pendaftaran dapat dilakukan kapan saja selama kuota masih tersedia.",
    },
    {
      q: "What is the turnaround time?",
      a: "Kelas dimulai secara serentak sesuai tanggal kickoff.",
    },
    {
      q: "What happens if I need a revision?",
      a: "Mentor akan membimbing Anda sampai karya Anda mencapai standar portofolio.",
    },
    {
      q: "Can I share my subscription with others?",
      a: "Satu tiket hanya berlaku untuk satu peserta terdaftar.",
    },
    {
      q: "How do I submit requests?",
      a: "Melalui dashboard student yang akan diberikan setelah pendaftaran.",
    },
    {
      q: "What happens if I miss a class?",
      a: "Semua sesi live akan direkam dan bisa diakses selamanya.",
    },
  ];

  const displayFaqs = faqs.length > 0 
    ? faqs.map(f => ({ q: f.question, a: f.answer })) 
    : defaultFaqs;

  return (
    <section
      className="border-divider border-t bg-white py-[100px] md:py-[160px]"
      id="faq"
    >
      <div className="mx-auto max-w-360 px-6 lg:px-[120px] xl:px-[240px]">
        <div className="mb-[80px] text-center">
          <h2 className="font-display text-text-main mx-auto mb-4 max-w-[500px] text-[36px] leading-[40px] font-normal md:text-[50px] md:leading-[52px]">
            Common <span className="text-text-muted">questions</span> about our
            program.
          </h2>
          <p className="font-body text-text-muted mx-auto max-w-[500px] text-[16px] font-medium">
            Browse through these common inquiries to learn more about how our
            elite creative subscription model works daily
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative flex h-[300px] w-full flex-col justify-end overflow-hidden rounded-[32px] bg-[#1a1a1a] p-10 lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=600&h=800&fit=crop"
              className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay"
            />
            <div className="relative z-10">
              <div className="mb-6 h-12 w-12 overflow-hidden rounded-full">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
              </div>
              <h3 className="font-body mb-2 text-[24px] font-semibold text-white">
                Book an intro Call
              </h3>
              <p className="font-body mb-6 text-sm font-medium text-white/70">
                Book a free discovery call to explore our unique creative
                process.
              </p>
              <button className="font-body w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100">
                Get started
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {displayFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer items-center justify-between rounded-[16px] bg-[#F8F9FB] p-5 transition-colors hover:bg-[#F2F4F7]"
              >
                <span className="font-body text-text-main font-medium">
                  {faq.q}
                </span>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6849E1]">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
