"use client";

import Link from "next/link";
import {
    TextReveal,
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

import {
    DEFAULT_BENEFIT_CARDS,
    type BenefitCardItem,
} from "@/lib/cms-defaults";

export default function Benefits({
    cards = DEFAULT_BENEFIT_CARDS,
}: {
    cards?: BenefitCardItem[];
}) {
    const benefitCards = cards.length > 0 ? cards : DEFAULT_BENEFIT_CARDS;
    return (
        <section className="benefits section-spacing" id="services">
            <div className="container px-4 lg:px-6 xl:px-[240px]">
                <div className="benefits__header">
                    <TextReveal as="h2" className="benefits__heading">
                        {"You'll love"}
                        {<br />}
                        {"this course"}
                    </TextReveal>
                    <FadeSlideIn delay={0.15}>
                        <p className="benefits__subtitle text-subtitle">
                            Pilih program intensif yang sesuai dengan minat dan
                            tujuan karir kamu di industri digital kreatif.
                        </p>
                    </FadeSlideIn>
                </div>

                <StaggerContainer className="benefits__grid" stagger={0.12}>
                    {benefitCards.map((card, i) => (
                        <StaggerItem className="benefit-card" key={i}>
                            <Link href={`/${card.slug}`} scroll={true} className="block h-full">
                                <div className="benefit-card__image">
                                    <img src={card.image} alt={card.title} style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined} />
                                </div>
                                <div className="benefit-card__gradient"></div>
                                <div className="benefit-card__content">
                                    <div className="benefit-card__tag">
                                        {card.tag}
                                    </div>
                                    <h3 className="benefit-card__title">
                                        {card.title}
                                    </h3>
                                    <p className="benefit-card__desc">
                                        {card.desc}
                                    </p>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
