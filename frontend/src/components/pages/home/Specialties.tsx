import Container from "@/components/layout/Container";
import React from "react";

const data = [
  {
    title: "Curated destinations",
    value: "12400+",
  },
  {
    title: "Countries Covered",
    value: "140",
  },
  {
    title: "Verified reviews",
    value: "86K",
  },
  {
    title: "Average reviews",
    value: "4.8",
  },
];
function Specialties() {
  return (
    <section className="border-b border-border bg-surface py-10 md:py-12">
      <Container>
        <div className="grid grid-cols-2  md:grid-cols-4 ">
          {data.map((sp) => (
            <div
              key={sp.title}
              className="flex lg:flex-row flex-col  items-center justify-center gap-3 px-4 py-5 text-center md:py-2"
            >
              <h2 className="font-heading text-extra-huge font-bold tracking-tight md:text-5xl">
                {sp.value}
              </h2>

              <p className="md:mt-6 text-small leading-tight text-muted-foreground">
                {sp.title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Specialties;
