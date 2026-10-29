import Link from 'next/link';

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/legal', label: 'Legal Disclaimer' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/risk', label: 'Risk' },
] as const;

export default function MuscadineFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-400 mb-3 max-w-3xl mx-auto leading-relaxed">
          Muscadine is a personal, non-commercial project. Disclaimer: Nothing on this website is an offer to sell or a solicitation to buy any product, service, or investment. Past performance is not a reliable indicator of future results. Yields are variable and not guaranteed. Muscadine does not provide investment advice and does not hold your assets; seek your own professional advice before making any decision.
        </p>
        <p className="text-xs text-gray-500">© 2026 Muscadine. All rights reserved.</p>
      </div>
    </footer>
  );
}
