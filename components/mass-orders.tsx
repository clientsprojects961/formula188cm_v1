import Image from "next/image"

export function MassOrders() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12 animate-fade-in-up">
      <div className="bg-[#111111] rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative shadow-[0_20px_60px_rgba(22,163,74,0.1)] border-2 border-[#222222]">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#16a34a]/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16a34a]/20 border border-[#16a34a]/30">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
              <span className="text-xs font-bold text-[#16a34a] uppercase tracking-wider">High Demand</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white leading-tight tracking-tight">
              Mass Order Packing Daily
            </h2>
            
            <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
              Due to overwhelming demand, our fulfillment center is dispatching over <span className="text-[#FFD700] font-bold">450+ orders daily</span> to trusted customers across India. We ensure fresh batches and discrete packaging for every shipment.
            </p>
            
            <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] bg-gray-800 flex items-center justify-center font-bold text-xs text-white">JD</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] bg-primary flex items-center justify-center font-bold text-xs text-white">AK</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] bg-gray-700 flex items-center justify-center font-bold text-xs text-white">RV</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#111111] bg-[#FFD700] flex items-center justify-center font-bold text-xs text-[#111111]">10k+</div>
              </div>
              <div className="text-sm text-gray-400">
                <strong className="text-white">450+</strong> shipments today
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative flex gap-4 md:gap-6 justify-center">
              <div className="w-1/2 relative mt-8 md:mt-16">
                <img 
                  src="/pack1.jpeg" 
                  alt="Packing orders" 
                  className="w-full h-auto aspect-[4/5] object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-[#222222] transition-transform hover:scale-105" 
                />
              </div>
              <div className="w-1/2 relative mb-8 md:mb-16">
                <img 
                  src="/pack2.jpeg" 
                  alt="Ready to ship" 
                  className="w-full h-auto aspect-[4/5] object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-[#222222] transition-transform hover:scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
