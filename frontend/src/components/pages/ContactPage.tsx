import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';

interface ContactPageProps {
  onNavigateToHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export function ContactPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'support@eduaid.com',
      description: 'We typically respond within 24 hours',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+63 961 811 6449',
      description: 'Mon-Fri, 9am-5pm EST',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      detail: 'Ayala Blvd., Ermita, Manila, 1000, Philippines',
      description: 'By appointment only',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={onNavigateToHome}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl text-slate-800 dark:text-slate-100 mb-3">Contact Us</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="mt-1.5 dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="mt-1.5 dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="text-sm">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  required
                  className="mt-1.5 dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more..."
                  required
                  rows={6}
                  className="mt-1.5 dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            <h2 className="text-xl text-slate-800 dark:text-slate-100 mb-4">Other Ways to Reach Us</h2>
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base text-slate-800 dark:text-slate-100 mb-1">{method.title}</h3>
                      <div className="text-sm text-blue-600 dark:text-blue-400 mb-1.5">{method.detail}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{method.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* FAQ Link */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="text-lg mb-2">Looking for Quick Answers?</h3>
              <p className="text-sm text-white/90 mb-4">Check out our FAQ section for instant answers to common questions.</p>
              <button className="px-5 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-white/90 transition-colors text-sm">
                Visit FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
