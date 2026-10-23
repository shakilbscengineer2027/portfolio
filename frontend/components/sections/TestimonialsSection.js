import SectionHeading from "@/components/ui/SectionHeading";
import ReviewCarousel from "@/components/reviews/ReviewCarousel";
import ReviewForm from "@/components/reviews/ReviewForm";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-dark px-5 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Testimonials" subtitle="Feedback from clients and collaborators I've worked with on real projects and web applications." />
        <ReviewCarousel />
        <div className="mt-10 flex justify-center">
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}
