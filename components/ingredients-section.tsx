"use client"
import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

const ingredients = [
  { name: "Ashwagandha", desc: "Stimulates growth hormone production" },
  { name: "Calcium Citrate", desc: "Strengthens bone density & growth" },
  { name: "Vitamin D3", desc: "Enhances calcium absorption" },
  { name: "Zinc", desc: "Supports cellular growth & repair" },
  { name: "L-Arginine", desc: "Boosts HGH levels naturally" },
  { name: "Shatavari", desc: "Promotes bone & cartilage health" },
]

export function IngredientsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#111111] rounded-t-3xl md:rounded-3xl max-w-7xl mx-auto my-12 shadow-2xl overflow-hidden relative">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#16a34a]/10 to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Bento Images Section */}
          <div className="relative w-full mb-10 pb-12 pr-12">
            <img src="/c3.jpeg" alt="Premium Formula" className="w-full h-auto aspect-[4/5] object-cover rounded-2xl shadow-lg" />
            <img src="/c4.jpeg" alt="Herbal Extracts" className="absolute bottom-0 right-0 w-[55%] md:w-[45%] aspect-square object-cover rounded-xl shadow-2xl border-4 border-[#111111]" />
          </div>
          <span className="text-[11px] md:text-xs font-bold tracking-widest uppercase text-[#FFD700] mb-3 block">
            POWERED BY NATURE
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            21 Premium Herbal Extracts Inside
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed mb-10 max-w-2xl">
            Each tablet is packed with a precise blend of clinically studied natural ingredients — no fillers, no chemicals, no shortcuts.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {ingredients.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 bg-[#1A1A1A] border border-[#333333] p-4 rounded-xl hover:border-[#16a34a] transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#16a34a]/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm md:text-base mb-0.5">{item.name}</h3>
                <p className="text-[#64748B] text-xs md:text-sm m-0">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
