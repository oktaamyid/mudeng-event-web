"use client";

import Link from "next/link";
import {
    TextReveal,
    FadeSlideIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/ui/motion-primitives";

const benefitCards = [
    {
        slug: "ui-craft",
        image: "/event/assets/uiux1.png",
        tag: "Real momentum",
        title: "UI Craft",
        desc: "Pelatihan pembuatan desain antarmuka aplikasi dan website modern.",
    },
    {
        slug: "graphic-desain",
        image: "/event/assets/gd1.png",
        tag: "No more falling off",
        title: "Graphic Design",
        desc: "Pelatihan eksklusif komunikasi visual dan desain grafis modern.",
    },
    {
        slug: "photography",
        image: "/event/assets/pd1.png",
        tag: "Never stuck again",
        title: "Photography",
        desc: "Pelatihan eksklusif teknik fotografi digital dan komposisi visual.",
    },
    {
        slug: "videography",
        image: "/event/assets/vg1.png",
        tag: "Growth with payoff",
        title: "Videography",
        desc: "Pelatihan eksklusif produksi video kreatif dan teknik sinematografi.",
    },
    {
        slug: "digital-art",
        image: "/event/assets/dg1.png",
        tag: "Likes, comments, saves",
        title: "Digital ART",
        desc: "Pelatihan eksklusif ilustrasi digital dan seni visual modern.",
        objectPosition: "right center",
    },
    {
        slug: "motion-graphic",
        image: "/event/assets/mg1.png",
        tag: "You're ready now",
        title: "Motion Graphic",
        desc: "Pelatihan eksklusif animasi grafis dan efek visual modern.",
    },
];

export default function Benefits() {
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
                            <Link href={`/course/${card.slug}`} scroll={true} className="block h-full">
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
