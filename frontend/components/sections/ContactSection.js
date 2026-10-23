import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/data/portfolioData";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactSection() {
  const details = [
    { Icon: Mail, text: contact.email, href: contact.email && `mailto:${contact.email}` },
    { Icon: Phone, text: contact.phone, href: contact.phone && `tel:${contact.phone.replace(/\s/g, "")}` },
    { Icon: MapPin, text: contact.location },
  ].filter((item) => item.text);

  return (
    <section id="contact" className="section-gradient px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Contact Us" subtitle="Have a project in mind? Let's connect and discuss how I can help bring your ideas to life." />
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold">{contact.heading}</h3>
            <p className="mt-3 max-w-sm text-sm text-ink-soft">{contact.text}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {details.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-neon-cyan" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="hover:text-neon-cyan">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
