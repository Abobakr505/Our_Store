import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { t, lang } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === 'ar' ? 'تم بنجاح! ✓' : 'Success! ✓');
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center py-12">
      <div className="absolute inset-0 bg-secondary/30" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold">
                <span className="text-xl font-bold text-accent-foreground">M</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                {isLogin ? t('welcomeBack') : t('createYourAccount')}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <Label>{t('name')}</Label>
                  <div className="relative mt-2">
                    <User className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input required className="ps-10" />
                  </div>
                </div>
              )}
              <div>
                <Label>{t('emailAddress')}</Label>
                <div className="relative mt-2">
                  <Mail className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input required type="email" className="ps-10" dir="ltr" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>{t('password')}</Label>
                  {isLogin && (
                    <button type="button" className="text-xs text-accent hover:underline">
                      {t('forgotPassword')}
                    </button>
                  )}
                </div>
                <div className="relative mt-2">
                  <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input required type={showPassword ? 'text' : 'password'} className="ps-10 pe-10" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div>
                  <Label>{t('confirmPassword')}</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input required type="password" className="ps-10" />
                  </div>
                </div>
              )}
              <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-gold-dark shadow-gold text-lg">
                {isLogin ? t('login') : t('signup')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground"
              >
                {isLogin ? t('noAccount') : t('haveAccount')}{' '}
                <span className="font-semibold text-accent hover:underline">
                  {isLogin ? t('createAccount') : t('loginNow')}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
