import { useLanguage } from '@/i18n/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { t, lang } = useLanguage();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
        </motion.div>
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">{t('cartEmpty')}</h2>
          <p className="mb-6 max-w-md text-muted-foreground">{t('cartEmptyDesc')}</p>
        </div>
        <Link to="/categories">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark gap-2 px-8">
            {t('continueShopping')}
            <ArrowIcon className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">{t('cart')}</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 rounded-2xl border bg-card p-4 shadow-sm md:p-6"
              >
                <img src={item.image} alt={lang === 'ar' ? item.name : item.nameEn} className="h-28 w-28 rounded-xl object-cover md:h-32 md:w-32" />
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-bold text-foreground">{lang === 'ar' ? item.name : item.nameEn}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.size && <>{t('size')}: {item.size}</>}
                    {item.color && <> | {t('color')}: {item.color}</>}
                  </p>
                  {(item.customization.embroideryName || item.customization.logoFile || item.customization.printLocation) && (
                    <div className="rounded-lg bg-accent/5 p-2 text-xs text-muted-foreground">
                      <span className="mb-1 block font-semibold text-accent">{t('customizationDetails')}</span>
                      {item.customization.embroideryName && <p>{t('embroideryName')}: {item.customization.embroideryName}</p>}
                      {item.customization.logoFile && <p>{t('uploadLogo')}: {item.customization.logoFile}</p>}
                      {item.customization.printLocation && <p>{t('printLocation')}: {item.customization.printLocation}</p>}
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="text-xl font-bold text-accent">{item.price * item.quantity} {t('currency')}</span>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-foreground">{t('orderSummary')}</h2>
              
              {/* Coupon */}
              <div className="flex gap-2">
                <Input placeholder={t('couponCode')} className="flex-1" />
                <Button variant="outline" className="shrink-0">
                  <Tag className="me-2 h-4 w-4" />
                  {t('applyCoupon')}
                </Button>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('subtotal')}</span>
                  <span className="font-medium">{totalPrice()} {t('currency')}</span>
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

              <Link to="/checkout" className="block">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-gold-dark text-lg py-7 rounded-xl shadow-gold">
                  {t('checkout')}
                  <ArrowIcon className="ms-2 h-5 w-5" />
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-4 w-4" />
                {t('secureCheckout')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
