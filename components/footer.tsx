export function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-300 pt-12 pb-32 md:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Contact Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-12 mb-12 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wide text-white">Get In Touch</h3>
            <div className="flex flex-col gap-1 text-gray-400 text-sm">
              <p>Email: formula188cm@gmail.com</p>
              <p>WhatsApp: +91 8989252740</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest font-sans">Formula188CM</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-sm">
              India&apos;s leading height growth formula designed specifically for adults. Formulated with clinically tested ingredients to support bone density and natural growth.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#FFD700] transition-colors">Home</a></li>
              <li><a href="#benefits" className="hover:text-[#FFD700] transition-colors">Benefits</a></li>
              <li><a href="#testimonials" className="hover:text-[#FFD700] transition-colors">Success Stories</a></li>
              <li><a href="#reviews" className="hover:text-[#FFD700] transition-colors">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 tracking-wide uppercase text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/terms" className="hover:text-[#FFD700] transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-[#FFD700] transition-colors">Privacy Policy</a></li>
              <li><a href="/refund" className="hover:text-[#FFD700] transition-colors">Refund Policy</a></li>
              <li><a href="/shipping" className="hover:text-[#FFD700] transition-colors">Shipping Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Formula188CM. All rights reserved.</p>
          <div className="flex gap-4">
            <p>Designed by <a href="https://www.servexpert.in/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD700] transition-colors font-semibold">ServeXpert</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
