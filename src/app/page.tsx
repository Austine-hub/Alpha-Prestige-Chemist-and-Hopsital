//src/app/page.tsx

import DealsOfTheDay from "@/components/deals/Deals";
import Hero from "@/components/hero/Hero";
import type { Metadata } from "next";
import PopularProducts from "@/components/new/PopularProducts";
import ProductsGrid from "@/components/new/ProductsGrid";
import TodayDeals from "@/components/today/TodayDeals";
import Grid from "@/components/today/Products/Grid1";
import GetStarted from "@/components/getStarted/GetStarted";


export const metadata: Metadata = {
  title: "Alpha Prestige Pharmaceuticals",
  description: "Modern Pharmacy solutions — caring beyond prescriptions.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Accessible page heading for screen readers & SEO */}

            {/* Hero */}
      <section aria-labelledby="hero-heading" className="w-full">
        <Hero />
      </section>


            {/* Hero */}
      <section aria-labelledby="hero-heading" className="w-full">
        <GetStarted />
      </section>

             {/*DealsOfTheDay */}
      <section aria-labelledby="hero-heading" className="w-full">
        <DealsOfTheDay/>
      </section>

            {/* TodayDeals*/}
      <section
        aria-label="PopularProducts"
        className="w-full px-4 sm:px-6 lg:px-8 -mt-4"
      >
        <TodayDeals/>
      </section>

           {/* PopularProducts*/}
      <section
        aria-label="PopularProducts"
        className="w-full px-4 sm:px-6 lg:px-8 -mt-4"
      >
        <PopularProducts/>
      </section>

        {/*BoxesGrid */}
      <section aria-labelledby="ProductsGrid" className="w-full">
        <Grid/>
      </section>
      

       {/*ProductsGrid */}
      <section aria-labelledby="ProductsGrid" className="w-full">
        <ProductsGrid/>
      </section>

    </main>
  );
}
