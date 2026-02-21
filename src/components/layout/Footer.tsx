import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold">
                <span className="text-lg font-bold text-accent-foreground">M</span>
              </div>
              <span className="text-xl font-bold text-primary-foreground">
                {lang === 'ar' ? 'متجرنا' : 'Our Store'}
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-primary-foreground/60">
              {t('footerTagline')}
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-light text-primary-foreground/60 transition-all hover:bg-accent hover:text-accent-foreground hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-accent">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('home') },
                { to: '/categories', label: t('categories') },
                { to: '/about', label: t('about') },
                { to: '/contact', label: t('contact') },
                { to: '/return-policy', label: t('returnPolicy') },
                { to: '/track-order', label: t('trackOrder') },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-primary-foreground/60 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
{/* Services */}
<div>
  <h3 className="mb-5 text-lg font-bold text-accent">
    {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
  </h3>

  <ul className="space-y-3">
    {[
      lang === 'ar' ? 'توصيل سريع' : 'Fast Delivery',
      lang === 'ar' ? 'دفع عند الاستلام' : 'Cash on Delivery',
      lang === 'ar' ? 'سياسة استرجاع مرنة' : 'Easy Returns',
      lang === 'ar' ? 'دعم فني 24/7' : '24/7 Support',
    ].map((service, i) => (
      <li
        key={i}
        className="text-sm text-primary-foreground/60 transition-colors hover:text-accent"
      >
         {service}
      </li>
    ))}
  </ul>
</div>
          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-accent">{t('contactInfo')}</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span dir="ltr">+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <span>info@ourstore.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span>{lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
              </li>
            </ul>
          </div>


        </div>

        <div className="mt-12 border-t border-navy-light pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">
            © 2026 {lang === 'ar' ? 'متجرنا' : 'Our Store'}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
