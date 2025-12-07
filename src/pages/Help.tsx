import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MessageCircle, HelpCircle, BookOpen, Users, ShieldCheck, CreditCard } from "lucide-react";

const Help = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      question: t('helpFaq1Question'),
      answer: t('helpFaq1Answer'),
      icon: Users,
    },
    {
      question: t('helpFaq2Question'),
      answer: t('helpFaq2Answer'),
      icon: ShieldCheck,
    },
    {
      question: t('helpFaq3Question'),
      answer: t('helpFaq3Answer'),
      icon: HelpCircle,
    },
    {
      question: t('helpFaq4Question'),
      answer: t('helpFaq4Answer'),
      icon: CreditCard,
    },
    {
      question: t('helpFaq5Question'),
      answer: t('helpFaq5Answer'),
      icon: BookOpen,
    },
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('helpContactSuccess'),
      description: t('helpContactSuccessDesc'),
    });
    
    setContactForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t('helpTitle')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('helpSubtitle')}
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/services')}>
            <CardHeader className="text-center">
              <BookOpen className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>{t('helpGetStarted')}</CardTitle>
              <CardDescription>{t('helpGetStartedDesc')}</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/auth')}>
            <CardHeader className="text-center">
              <Users className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>{t('helpBecomeVendor')}</CardTitle>
              <CardDescription>{t('helpBecomeVendorDesc')}</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <ShieldCheck className="h-10 w-10 mx-auto text-primary mb-2" />
              <CardTitle>{t('helpTrustSafety')}</CardTitle>
              <CardDescription>{t('helpTrustSafetyDesc')}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('helpFaqTitle')}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <faq.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{t('helpContactTitle')}</h2>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder={t('helpContactName')}
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={t('helpContactEmail')}
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder={t('helpContactMessage')}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('helpContactSending') : t('helpContactSend')}
                  </Button>
                </form>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t space-y-4">
                  <h3 className="font-medium text-foreground">{t('helpOtherWays')}</h3>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>support@lokai.in</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+91 1800-123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>{t('helpLiveChat')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
