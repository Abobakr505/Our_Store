import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useState } from 'react';
import { Check, CreditCard, Truck, User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
  const { t, lang } = useLanguage();
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === 'ar' ? 'تم تأكيد الطلب بنجاح! 🎉' : 'Order confirmed successfully! 🎉');
    clearCart();
  };

  const shippingCompanies = lang === 'ar'
    ? ['أرامكس', 'SMSA', 'DHL', 'فيديكس']
    : ['Aramex', 'SMSA', 'DHL', 'FedEx'];

  const paymentMethods = lang === 'ar'
    ? ['فيزا / ماستركارد', 'مدى', 'محفظة إلكترونية', 'الدفع عند الاستلام']
    : ['Visa / Mastercard', 'Mada', 'E-Wallet', 'Cash on Delivery'];

  const steps = [
    { num: 1, label: t('customerInfo'), icon: User },
    { num: 2, label: t('shippingInfo'), icon: Truck },
    { num: 3, label: t('paymentInfo'), icon: CreditCard },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">{t('checkout')}</h1>

        {/* Steps */}
        <div className="mb-10 flex items-center justify-center gap-4">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                step >= s.num ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'
              }`}>
                {step > s.num ? <Check className="h-5 w-5" /> : s.num}
              </div>
              <span className={`hidden text-sm font-medium sm:block ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && <div className={`mx-2 h-0.5 w-8 rounded ${step > s.num ? 'bg-accent' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border bg-card p-6 shadow-sm space-y-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <User className="h-5 w-5 text-accent" /> {t('customerInfo')}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><Label>{t('name')}</Label><Input required className="mt-2" /></div>
                  <div><Label>{t('phoneNumber')}</Label><Input required type="tel" className="mt-2" dir="ltr" /></div>
                  <div><Label>{t('emailAddress')}</Label><Input type="email" className="mt-2" dir="ltr" /></div>
                  <div><Label>{t('city')}</Label><Input required className="mt-2" /></div>
                </div>
                <div><Label>{t('addressField')}</Label><Input required className="mt-2" /></div>
                <Button type="button" onClick={() => setStep(2)} className="bg-accent text-accent-foreground hover:bg-gold-dark px-8">
                  {t('nextStep')}
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border bg-card p-6 shadow-sm space-y-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <Truck className="h-5 w-5 text-accent" /> {t('shippingCompany')}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {shippingCompanies.map((c) => (
                    <label key={c} className="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors hover:border-accent">
                      <input type="radio" name="shipping" value={c} className="accent-[hsl(var(--accent))]" />
                      <span className="font-medium">{c}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>{t('prevStep')}</Button>
                  <Button type="button" onClick={() => setStep(3)} className="bg-accent text-accent-foreground hover:bg-gold-dark px-8">{t('nextStep')}</Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border bg-card p-6 shadow-sm space-y-5">
                <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <CreditCard className="h-5 w-5 text-accent" /> {t('paymentMethod')}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {paymentMethods.map((m) => (
                    <label key={m} className="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors hover:border-accent">
                      <input type="radio" name="payment" value={m} className="accent-[hsl(var(--accent))]" />
                      <span className="font-medium">{m}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>{t('prevStep')}</Button>
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-gold-dark px-8 text-lg py-6 shadow-gold">
                    {t('confirmOrder')}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm h-fit space-y-4 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-foreground">{t('orderSummary')}</h2>
            <div className="max-h-60 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{lang === 'ar' ? item.name : item.nameEn}</p>
                    <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-accent">{item.price * item.quantity} {t('currency')}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('subtotal')}</span>
                <span>{totalPrice()} {t('currency')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('shipping')}</span>
                <span className="text-xs text-muted-foreground">{t('shippingCalc')}</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <span className="text-lg font-bold">{t('cartTotal')}</span>
              <span className="text-2xl font-black text-accent">{totalPrice()} {t('currency')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4" /> {t('secureCheckout')}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
