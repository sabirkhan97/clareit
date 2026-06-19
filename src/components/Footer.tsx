import { Linkedin, Twitter, Github, Instagram, ArrowUpRight } from 'lucide-react'
import company from '@/data/company.json'
import Logo from './Logo'

const FOOTER_LINKS = {
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  Services: [
    { label: 'Frontend Engineering', href: '#services' },
    { label: 'Backend & APIs', href: '#services' },
    { label: '.NET Development', href: '#services' },
    { label: 'Cloud & DevOps', href: '#services' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

const SOCIALS = [
  { icon: Linkedin, href: company.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: company.social.twitter, label: 'Twitter' },
  { icon: Github, href: company.social.github, label: 'GitHub' },
  { icon: Instagram, href: company.social.instagram, label: 'Instagram' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href === '#') return
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink pt-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-6">
          <div className="col-span-2">
            <a href="#top" className="flex items-center gap-2 font-display text-xl font-semibold text-paper hover:opacity-80 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center">
                <Logo width={32} height={32} />
              </div>
              {company.brand.name}
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
              {company.brand.tagline} A full-stack consultancy building frontend,
              backend, .NET, and cloud systems for teams who need it done right.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-paper/40 hover:text-paper"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="col-span-1">
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-400">
                {heading}
              </h4>
              <ul className="mt-5 flex flex-col gap-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-left text-sm text-ink-300 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink-400">
              Get in touch
            </h4>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-ink-300">
              <li>{company.contact.email}</li>
              <li>{company.contact.phone}</li>
              <li className="max-w-[14rem] leading-relaxed">{company.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 py-7 text-xs text-ink-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} {company.brand.name} Technologies. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Founded by {company.brand.founder.name}
            <a
              href={company.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 text-ink-300 hover:text-paper"
            >
              Gurugram, India <ArrowUpRight size={12} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
