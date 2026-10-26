export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-light text-gray-900 leading-tight mb-6 sm:mb-8 font-serif text-3xl sm:text-4xl">Contact</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto px-4">
          Questions or a partnership? Email us and we&apos;ll get back to you.
        </p>
      </div>

      <div className="mx-4 sm:mx-0 flex justify-center">
        <a
          href="mailto:muscadinelabs@gmail.com"
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-6 flex items-center space-x-3 transition-colors duration-200"
        >
          <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-gray-900 font-medium">muscadinelabs@gmail.com</span>
        </a>
      </div>
    </div>
  );
}
