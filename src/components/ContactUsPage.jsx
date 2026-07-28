import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const ContactUsPage = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('✨ Message sent successfully! Our fashion concierge will reply within 2 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'We offer Express 2-3 business day shipping across North America and standard international shipping (5-7 days). Orders over $150 receive free express shipping.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We accept returns within 30 days of delivery for all unworn items in original packaging with tags intact. Returns are completely free.'
    },
    {
      q: 'Are your handbag materials authentic vegan leather?',
      a: 'Yes! All our leather goods are crafted from ultra-premium, eco-friendly PETA-approved vegan lambskin leather.'
    },
    {
      q: 'How do I care for my 18k gold-dipped jewelry?',
      a: 'Keep jewelry away from harsh chemicals, perfumes, and water. Store in your Bella Store velvet pouch when not in use.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-pink-600 text-xs font-bold uppercase tracking-widest">
          We'd Love To Hear From You
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-slate-900">
          Contact Bella Atelier
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Have questions about sizing, styling advice, or an existing order? Our team is available 24/7.
        </p>
      </div>

      {/* Info Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-slate-900">Flagship Boutique</h3>
              <p className="text-xs text-slate-500 mt-1">742 Evergreen Terrace, Rodeo Drive</p>
              <p className="text-xs text-slate-500">Beverly Hills, CA 90210</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-slate-900">Phone Support</h3>
              <p className="text-xs text-slate-500 mt-1">+1 (800) 555-BELLA (23552)</p>
              <p className="text-xs font-semibold text-pink-600">Toll-Free 24/7 Assistance</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-slate-900">Email Concierge</h3>
              <p className="text-xs text-slate-500 mt-1">support@bellastore.com</p>
              <p className="text-xs text-slate-500">VIP Styling: vip@bellastore.com</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif-luxury text-lg font-bold">Message Received!</h3>
              <p className="text-xs">
                Thank you for contacting Bella Atelier. A senior fashion consultant will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-pink-600 underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sophia Loren"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sophia@example.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Order inquiry, sizing help..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist your shopping experience?"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 rounded-xl p-3 text-xs font-medium focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-pink-200 transition flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Concierge Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 bg-slate-50/70 hover:bg-pink-50/60 font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-pink-600 transition-transform ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="p-4 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
