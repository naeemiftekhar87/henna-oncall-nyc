import { Hand, Sparkles } from "lucide-react";

const GuidePage = () => {
  const prepSteps = [
    {
      title: "Manicure & Pedicure",
      description:
        "Complete nail services before henna to prevent chemicals affecting stain development.",
    },
    {
      title: "Shower & Gentle Exfoliation",
      description:
        "Shower the evening before and gently exfoliate areas where henna will be applied.",
    },
    {
      title: "Hair Removal",
      description:
        "Remove hair 24 hours before appointment to prevent skin irritation.",
    },
    {
      title: "Avoid Oils & Lotions",
      description:
        "Do not apply oils, creams, or moisturizers. These block the stain from binding properly.",
    },
    {
      title: "Dress Comfortably",
      description:
        "Wear loose comfortable clothing since bridal sessions may last several hours.",
    },
  ];

  const aftercareSteps = [
    {
      title: "Leave the Paste On",
      description: "Keep paste 4–8 hours or overnight for best results.",
    },
    {
      title: "Do Not Wash Off With Water",
      description: "Scrape dried paste off gently using tissue or a towel.",
    },
    {
      title: "Lemon Sugar Seal & Clove Steam",
      description:
        "Apply lemon sugar mixture to help the paste stay longer. Warm hands gently over clove steam to activate the stain.",
    },
    {
      title: "Stain Development",
      description:
        "Color will begin orange then deepen to reddish-brown within 24–48 hours. Keep design dry for first 24 hours.",
    },
  ];
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Preparation Guide */}
        <div>
          <h2 className="font-playfair text-4xl tracking-tight font-normal text-[#FFFFFF] mb-4 flex items-center gap-4">
            <div className="p-2 bg-[#D4AF37]/10 rounded-xl">
              <Sparkles className="text-[#D4AF37] w-6 h-6" />
            </div>
            Bridal Preparation
          </h2>
          <p className="text-base text-[#A0A0A0] font-light mb-10 leading-relaxed">
            To achieve the richest darkest stain follow these steps 1–2 days
            before your appointment.
          </p>

          <div className="space-y-6">
            {prepSteps.map((step) => (
              <div
                key={step.title}
                className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#D4AF37] before:rounded-full"
              >
                <h4 className="text-base text-[#FFFFFF] font-normal mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Aftercare Guide */}
        <div>
          <h2 className="font-playfair text-4xl tracking-tight font-normal text-[#FFFFFF] mb-4 flex items-center gap-4">
            <div className="p-2 bg-[#D4AF37]/10 rounded-xl">
              <Hand className="text-[#D4AF37] w-6 h-6" />
            </div>
            Henna Aftercare
          </h2>
          <p className="text-base text-[#A0A0A0] font-light mb-10 leading-relaxed">
            Proper aftercare ensures deep rich stains.
          </p>

          <div className="space-y-4">
            {aftercareSteps.map((step) => (
              <div
                key={step.title}
                className="bg-[#111111] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <h4 className="text-base text-[#FFFFFF] font-normal mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-[#A0A0A0] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Jagua & General Care */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-white/5 rounded-2xl p-6 bg-white/2">
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-3 font-medium">
                Jagua Aftercare
              </h4>
              <ul className="text-sm text-[#A0A0A0] font-light space-y-2 pl-0 list-none">
                <li>• Keep dry for 24 hours</li>
                <li>• Avoid chlorine water</li>
                <li>• Lasts 7–10 days</li>
              </ul>
            </div>
            <div className="border border-white/5 rounded-2xl p-6 bg-white/2">
              <h4 className="text-sm text-[#D4AF37] uppercase tracking-widest mb-3 font-medium">
                General Care
              </h4>
              <ul className="text-sm text-[#A0A0A0] font-light space-y-2 pl-0 list-none">
                <li>• Avoid excessive water</li>
                <li>• No scrubbing</li>
                <li>• Moisturize well</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidePage;
