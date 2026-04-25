export function Footer() {
  return (
    <footer className="bg-[#111111] text-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Newsletter / Contact Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-12 mb-12 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Get In Touch</h3>
            <div className="flex flex-col gap-1 text-gray-400 text-sm">
              <p>Email: support@formula188cm.com</p>
              <p>WhatsApp: +91 8989252740</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Subscribe for Updates</h3>
            <div className="flex w-full">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border border-gray-700 text-white px-4 py-2 w-full rounded-l-md focus:outline-none focus:border-white"
              />
              <button className="bg-white text-black px-6 py-2 font-bold uppercase rounded-r-md hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-xl uppercase tracking-wider">Formula188</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Premium height growth supplement for natural development. 100% safe, clinically tested, and trusted by thousands.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/product" className="hover:text-white transition-colors">Shop Product</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider">Legal Policies</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Formula188CM. Powered by Excellence.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Secured Checkout</span>
            <span>✓ SSL Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
