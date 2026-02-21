"use client";

import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { 
  Package, Truck, RotateCcw, Clock, MapPin, CreditCard, ShieldCheck, 
  ShoppingBag, CalendarDays, ChevronRight, AlertCircle,
  User, Mail, Phone, Home, Edit2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// ── Mock Data ──
const mockOrders = [
  {
    id: 'ORD-202602-7842',
    date: '15 فبراير 2026',
    status: 'delivered',
    total: 1249,
    itemsCount: 3,
    previewItems: ['سماعة لاسلكية برو', 'حافظة جلد', 'شاحن 65W'],
    tracking: { company: 'أرامكس', number: 'ABC987654321EG' },
  },
  {
    id: 'ORD-202601-3190',
    date: '28 يناير 2026',
    status: 'processing',
    total: 349,
    itemsCount: 1,
    previewItems: ['شاحن سريع 65W'],
    tracking: null,
  },
];

const statusConfig = {
  pending:    { label: 'قيد الانتظار',    color: 'bg-amber-100 text-amber-800 border-amber-300', icon: AlertCircle },
  processing: { label: 'جاري التجهيز',   color: 'bg-blue-100 text-blue-800 border-blue-300',   icon: Clock },
  shipped:    { label: 'تم الشحن',        color: 'bg-purple-100 text-purple-800 border-purple-300', icon: Truck },
  delivered:  { label: 'تم التسليم',      color: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: ShieldCheck },
  cancelled:  { label: 'ملغي',            color: 'bg-rose-100 text-rose-800 border-rose-300',   icon: AlertCircle },
};

// ── Mock User Data ──
const mockUser = {
  name: 'أبو بكر أحمد',
  email: 'abobakr@example.com',
  phone: '+20 101 234 5678',
  joinDate: '15 أكتوبر 2024',
  addresses: [
    {
      id: 1,
      label: 'العنوان الرئيسي',
      fullAddress: 'القاهرة - مدينة نصر - شارع عباس العقاد',
      details: 'برج التحرير - الدور 12 - شقة 45'
    },
    {
      id: 2,
      label: 'عنوان العمل',
      fullAddress: 'القاهرة - وسط البلد - شارع طلعت حرب',
      details: 'مبنى الإدارة - الدور 5'
    }
  ]
};

const AccountDashboard = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'orders' | 'track' | 'reorder' | 'account'>('orders');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const isRtl = lang === 'ar';

  const handleReorder = (order: any) => {
    toast.success(
      isRtl 
        ? 'تم إضافة المنتجات إلى السلة مجدداً ✨'
        : 'Items re-added to cart ✨'
    );
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast.error(isRtl ? 'يرجى إدخال رقم التتبع' : 'Please enter tracking number');
      return;
    }
    toast.loading(isRtl ? 'جاري البحث...' : 'Tracking...');
    setTimeout(() => {
      toast.dismiss();
      toast.success(isRtl ? 'تم العثور على معلومات الطلب!' : 'Order tracked successfully!');
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pb-12 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-5 lg:px-8 pt-8 sm:pt-10">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-accent to-primary-foreground bg-clip-text text-transparent">
            {t('myAccount')}
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-muted-foreground">
            {isRtl ? 'إدارة طلباتك • تتبع شحناتك • إعادة طلب بسهولة' : 'Manage orders • Track shipments • Reorder easily'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 sm:mb-12 flex flex-col items-center justify-center overflow-x-auto pb-2 scrollbar-hide">
          <div className="inline-flex rounded-full bg-slate-100/80 dark:bg-slate-800/60 backdrop-blur-md p-1 sm:p-1.5 shadow-lg border border-slate-200/50 dark:border-slate-700/50 min-w-fit">
            {[
              { id: 'account',  icon: User,       label: isRtl ? 'بيانات الحساب' : 'Account Info' },
              { id: 'orders',   icon: ShoppingBag, label: t('myOrders')   },
              { id: 'track',    icon: Truck,       label: t('trackOrder')  },
              { id: 'reorder',  icon: RotateCcw,   label: t('reorder')     },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                className={`
                  rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-accent' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }
                `}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <tab.icon className="mr-1.5 sm:mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* بيانات الحساب */}
          {activeTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Avatar + Name Header */}
              <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border p-10 text-center shadow-xl">
                <div className="w-32 h-32 mx-auto bg-gradient-gold rounded-full flex items-center justify-center text-6xl font-bold text-white ring-8 ring-white dark:ring-slate-900 shadow-2xl">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight">{mockUser.name}</h2>
                <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
                  <CalendarDays className="h-5 w-5" /> 
                  {isRtl ? 'عضو منذ' : 'Member since'} {mockUser.joinDate}
                </p>
              </div>

              <div className="grid lg:grid-cols-5 gap-6">
                {/* المعلومات الشخصية */}
                <div className="lg:col-span-3 rounded-3xl border bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-semibold flex items-center gap-3">
                      <User className="h-6 w-6 text-accent" /> 
                      {isRtl ? 'المعلومات الشخصية' : 'Personal Information'}
                    </h3>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit2 className="h-4 w-4" /> 
                      {isRtl ? 'تعديل' : 'Edit'}
                    </Button>
                  </div>

                  <div className="space-y-7">
                    <div>
                      <Label className="text-base">
                        {isRtl ? 'الاسم الكامل' : 'Full Name'}
                      </Label>
                      <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl text-lg font-medium">
                        {mockUser.name}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-base">
                          {isRtl ? 'البريد الإلكتروني' : 'Email'}
                        </Label>
                        <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center gap-3 text-lg">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          {mockUser.email}
                        </div>
                      </div>
                      <div>
                        <Label className="text-base">
                          {isRtl ? 'رقم الجوال' : 'Phone Number'}
                        </Label>
                        <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center gap-3 text-lg">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          {mockUser.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* العناوين */}
                <div className="lg:col-span-2 rounded-3xl border bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-semibold flex items-center gap-3">
                      <Home className="h-6 w-6 text-accent" /> 
                      {isRtl ? 'العناوين المحفوظة' : 'Saved Addresses'}
                    </h3>
                  </div>

                  {mockUser.addresses.map((addr) => (
                    <div key={addr.id} className="p-6 border rounded-2xl bg-white dark:bg-slate-900 mb-4 last:mb-0">
                      <Badge variant="secondary" className="mb-3">
                        {addr.label}
                      </Badge>
                      <p className="font-medium leading-relaxed">{addr.fullAddress}</p>
                      <p className="text-sm text-muted-foreground mt-2">{addr.details}</p>
                    </div>
                  ))}

                  <Button className="w-full mt-6" variant="outline">
                    {isRtl ? '+ إضافة عنوان توصيل جديد' : '+ Add New Shipping Address'}
                  </Button>
                </div>
              </div>

              {/* قسم الأمان */}
              <div className="rounded-3xl border p-8 bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/30 dark:to-slate-900">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6" /> 
                  {isRtl ? 'الأمان والخصوصية' : 'Security & Privacy'}
                </h3>
                <Button variant="outline" className="border-rose-300 text-rose-700 dark:text-rose-400 hover:bg-rose-100">
                  {isRtl ? 'تغيير كلمة المرور' : 'Change Password'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* طلباتي */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
              className="space-y-5 sm:space-y-6"
            >
              {mockOrders.length === 0 ? (
                <div className="rounded-2xl sm:rounded-3xl border bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl p-8 sm:p-12 text-center shadow-xl">
                  <Package className="mx-auto h-14 w-14 sm:h-16 sm:w-16 text-muted-foreground/50" strokeWidth={1.2} />
                  <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-semibold">{t('noOrdersYet')}</h3>
                  <Button size="lg" className="mt-6 sm:mt-8 text-base sm:text-lg px-6 sm:px-8">
                    {isRtl ? 'ابدأ التسوق الآن' : 'Start Shopping Now'}
                  </Button>
                </div>
              ) : (
                mockOrders.map((order) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig];
                  const isExpanded = expandedOrder === order.id;

                  return (
                    <motion.div
                      key={order.id}
                      layout
                      className={`
                        rounded-2xl sm:rounded-3xl border bg-white/70 dark:bg-slate-800/50 backdrop-blur-lg shadow-md sm:shadow-lg overflow-hidden
                        hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300
                        ${isExpanded ? 'ring-2 ring-accent/30 sm:ring-accent/40' : ''}
                      `}
                    >
                      <div 
                        className="p-4 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6"
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${status.color} border`}>
                            <status.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                              <span className="font-mono font-semibold text-base sm:text-lg">{order.id}</span>
                              <Badge variant="outline" className={`${status.color} border font-medium px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm`}>
                                {status.label}
                              </Badge>
                            </div>
                            <p className="mt-1 text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              {order.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-normal sm:gap-8 md:gap-10 w-full sm:w-auto">
                          <div className="text-right sm:text-right">
                            <p className="text-xl sm:text-2xl font-bold text-accent">
                              {order.total} {t('currency')}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {order.itemsCount} {isRtl ? 'منتجات' : 'items'}
                            </p>
                          </div>
                          <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform hidden sm:block ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t bg-slate-50/70 dark:bg-slate-900/30"
                          >
                            <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
                              <div>
                                <h4 className="font-semibold mb-2.5 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                  <ShoppingBag className="h-4 w-4 text-accent" />
                                  {isRtl ? 'تفاصيل المنتجات' : 'Order Items'}
                                </h4>
                                <div className="space-y-2 text-sm">
                                  {order.previewItems.map((item, i) => (
                                    <div key={i} className="flex justify-between">
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {order.tracking && (
                                <div className="pt-4 border-t">
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                    <MapPin className="h-4 w-4 text-accent" />
                                    {isRtl ? 'تتبع الشحنة' : 'Tracking'}
                                  </div>
                                  <p className="mt-1.5 font-mono text-sm text-muted-foreground break-all">
                                    {order.tracking.company} – {order.tracking.number}
                                  </p>
                                </div>
                              )}

                              <Button 
                                variant="outline" 
                                className="mt-3 sm:mt-4 w-full sm:w-auto border-accent/40 hover:bg-accent/10 hover:text-accent"
                                onClick={() => handleReorder(order)}
                              >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                {t('reorder')}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}

          {/* تتبع الطلب */}
          {activeTab === 'track' && (
            <motion.div
              key="track"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="max-w-lg sm:max-w-2xl mx-auto"
            >
              <div className="rounded-2xl sm:rounded-3xl border bg-gradient-to-br from-white/70 to-slate-50/70 dark:from-slate-800/50 dark:to-slate-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-12 shadow-xl sm:shadow-2xl">
                <div className="text-center mb-8 sm:mb-10">
                  <div className="inline-flex p-3 sm:p-4 rounded-full bg-accent/10 mb-4">
                    <Truck className="h-8 w-8 sm:h-10 sm:w-10 text-accent" strokeWidth={1.8} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                    {t('trackYourOrder')}
                  </h2>
                </div>

                <form onSubmit={handleTrack} className="space-y-5 sm:space-y-6">
                  <div>
                    <Label className="text-base sm:text-lg font-medium">
                      {t('trackingNumber')}
                    </Label>
                    <Input
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder={isRtl ? 'مثال: ABC987654321EG' : 'e.g. ABC987654321EG'}
                      className="mt-2 h-12 sm:h-14 text-base sm:text-lg rounded-xl border-2 focus-visible:ring-accent/50"
                      dir="ltr"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full h-12 sm:h-14 text-white text-base sm:text-lg font-semibold bg-gradient-to-r from-accent to-primary-foreground hover:from-accent/90 hover:to-primary-foreground shadow-lg shadow-accent/20"
                  >
                    {t('trackNow')}
                  </Button>
                </form>

                <div className="mt-8 sm:mt-10 flex justify-center items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>{t('secureTracking')}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* إعادة الطلب */}
          {activeTab === 'reorder' && (
            <motion.div
              key="reorder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent/5 to-primary-foreground/5 dark:from-accent/10 dark:to-primary-foreground/10 p-6 sm:p-8 text-center border border-accent/20">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{t('quickReorder')}</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                  {isRtl 
                    ? 'اختر طلباً سابقاً وأعد طلبه بنقرة واحدة' 
                    : 'Select a previous order and reorder with one click'}
                </p>
              </div>

              <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {mockOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className="rounded-2xl sm:rounded-3xl border bg-white/70 dark:bg-slate-800/50 backdrop-blur-lg p-5 sm:p-6 shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3 sm:gap-0">
                      <div>
                        <p className="font-semibold text-base sm:text-lg">{order.id}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {order.date} • {order.itemsCount} {isRtl ? 'منتج' : 'items'}
                        </p>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-accent">
                        {order.total} {t('currency')}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleReorder(order)}
                      className="w-full h-11 sm:h-12 text-sm sm:text-base"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      {t('reorder')}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccountDashboard;