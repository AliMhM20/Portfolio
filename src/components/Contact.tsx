import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import { Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from './icons/SocialIcons';

export const Contact: React.FC = () => {
  const { content, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText(content.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 900);
  };

  return (
    <section id="contact" className="py-8 lg:py-12 relative flex flex-col justify-center min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-[#222634] pb-4 mb-8">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-fuchsia-600 dark:text-orange-400 tracking-widest uppercase">
              // {content.contact.sectionNum} // CONNECT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
              {content.contact.title}
            </h2>
          </div>
          <p className={language === 'fa' ? "text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-2 md:mt-0 font-medium" : "font-serif-editorial italic text-base sm:text-xl text-neutral-500 dark:text-neutral-400 mt-2 md:mt-0"}>
            {content.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6 text-start">
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              {content.contact.leadText}
            </p>

            {/* Email Box */}
            <div className="p-4 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] space-y-2 relative">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                DIRECT_CHANNEL // EMAIL
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                  {content.contact.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 border border-neutral-300 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                      <span>{content.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{content.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Channels List */}
            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
              <a
                href="https://github.com/AliMhM20"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-neutral-100 dark:bg-[#1b1f2b] border border-neutral-200 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 hover:text-black dark:hover:text-orange-400 transition-colors flex items-center justify-center gap-1.5 font-bold"
              >
                <GithubIcon size={14} />
                <span>GITHUB</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ali-mohamadi-aut"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-neutral-100 dark:bg-[#1b1f2b] border border-neutral-200 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 hover:text-black dark:hover:text-orange-400 transition-colors flex items-center justify-center gap-1.5 font-bold"
              >
                <LinkedinIcon size={14} />
                <span>LINKEDIN</span>
              </a>
              <a
                href="https://t.me/alimhm_20"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-neutral-100 dark:bg-[#1b1f2b] border border-neutral-200 dark:border-[#2a2e3d] hover:border-black dark:hover:border-orange-500 hover:text-black dark:hover:text-orange-400 transition-colors flex items-center justify-center gap-1.5 font-bold"
              >
                <TelegramIcon size={14} />
                <span>TELEGRAM</span>
              </a>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 relative">
            <div className="p-6 sm:p-8 bg-white dark:bg-[#161922] border border-neutral-300 dark:border-[#2a2e3d] shadow-sm relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-start">
                    <label className={`text-xs ${language === 'fa' ? 'font-bold' : 'font-mono uppercase'} text-neutral-600 dark:text-neutral-400`}>
                      {language === 'fa' ? 'نام و نام خانوادگی *' : 'NAME *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={language === 'fa' ? 'نام شما' : 'Your name'}
                      className="w-full px-4 py-3 bg-[#fafafc] dark:bg-[#10131b] border border-neutral-300 dark:border-[#2a2e3d] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1 text-start">
                    <label className={`text-xs ${language === 'fa' ? 'font-bold' : 'font-mono uppercase'} text-neutral-600 dark:text-neutral-400`}>
                      {language === 'fa' ? 'ایمیل تماس *' : 'EMAIL *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-[#fafafc] dark:bg-[#10131b] border border-neutral-300 dark:border-[#2a2e3d] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-start">
                  <label className={`text-xs ${language === 'fa' ? 'font-bold' : 'font-mono uppercase'} text-neutral-600 dark:text-neutral-400`}>
                    {language === 'fa' ? 'متن پیام *' : 'MESSAGE *'}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={content.contact.form.message}
                    className="w-full px-4 py-3 bg-[#fafafc] dark:bg-[#10131b] border border-neutral-300 dark:border-[#2a2e3d] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full py-3.5 bg-black hover:bg-neutral-800 text-white dark:bg-orange-500 dark:hover:bg-orange-400 dark:text-black text-sm ${language === 'fa' ? 'font-bold' : 'font-mono font-bold tracking-wider'} flex items-center justify-center gap-2 transition-colors cursor-pointer`}
                >
                  <span>{status === 'sending' ? content.contact.form.sending : content.contact.form.submit}</span>
                </button>

                {status === 'sent' && (
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/40 border border-orange-300 dark:border-orange-600/40 text-xs text-orange-800 dark:text-orange-300 text-center font-bold">
                    {content.contact.form.sent}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
