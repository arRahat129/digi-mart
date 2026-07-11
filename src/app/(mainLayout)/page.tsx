'use client';
import Banner from "@/components/homepage/Banner";
import Categories from "@/components/homepage/Categories";
import CTA from "@/components/homepage/CTA";
import FAQ from "@/components/homepage/FAQ";
import Highlights from "@/components/homepage/Highlights";
import Newsletter from "@/components/homepage/Newsletter";
import Statistics from "@/components/homepage/Statistics";
import Testimonials from "@/components/homepage/Testimonials";

export default function Home() {
    return (
        <div>
            <Banner />
            <Categories />
            <Statistics />
            <Highlights />
            <Testimonials />
            <FAQ />
            <Newsletter />
            <CTA />
        </div>
    );
}
