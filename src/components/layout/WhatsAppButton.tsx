import React, { useState } from "react";
import {
  Headset,
  X,
  PhoneCall,
  MessageCircle,
  Brush,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { useLanguage } from "@/i18n/LanguageContext";
export function WhatsAppButton() {
    const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const phoneNumber = "01093954137"; // Replace with actual phone number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const isRtl = lang === 'ar';

  // Animation variants for child icons
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
    exit: { opacity: 0, scale: 0.5, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-center">
        {/* Support icons with entrance animation */}
        <AnimatePresence>
          {open && (
            <div className="flex flex-col items-center mb-4 space-y-3">
              {[
                {
                  Icon: FaWhatsapp,
                  label: isRtl ? " واتساب" : "WhatsApp",
                  href: whatsappUrl,
                },
                {
                  Icon: PhoneCall,
                  label: isRtl ? " هاتف" :"Phone",
                  href: `tel:${phoneNumber}`,
                },
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={iconVariants}
                  href={item.href}
                  target={item.label.includes("واتساب") ? "_blank" : undefined}
                  rel={
                    item.label.includes("واتساب")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={item.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group bg-gradient-gold text-accent-foreground rounded-full p-3 shadow-lg"
                >
                  <item.Icon className="h-6 w-6 text-accent-foreground" />
                  {/* Tooltip */}
                  <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gradient-gold text-accent-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 accent-foregroundspace-nowrap">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <motion.button
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "إغلاق خيارات الدعم" : "تواصل معنا"}
          className="bg-gradient-gold  text-accent-foreground p-4 rounded-full shadow-2xl focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {open ? <X className="h-6 w-6" /> : <Headset className="h-6 w-6" />}
        </motion.button>
      </div>
    </div>
  );
}

export default WhatsAppButton;
