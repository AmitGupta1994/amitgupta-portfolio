"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ScrollReveal id="contact" direction="up" distance={30} className="w-full scroll-mt-24">
      <section className="w-full flex flex-col gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight mb-2">Get in Touch</h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Have a question, a project idea, or just want to connect? Send a message and I&apos;ll respond shortly.
          </p>
        </div>

        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 md:p-8 shadow-xs max-w-3xl dark:bg-neutral-900/60 dark:border-neutral-800">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Message Sent Successfully!</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Thanks for reaching out. I&apos;ve received your message and will reply shortly.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="px-5 py-2 bg-neutral-100 text-neutral-900 font-semibold text-xs rounded-full hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-400 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-400 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-400 transition-all resize-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                ></textarea>
              </div>

              {status === "error" && (
                <p className="text-red-600 text-xs font-medium">Something went wrong sending your message. Please try again.</p>
              )}

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="self-start px-6 py-2.5 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold rounded-full hover:bg-neutral-800 dark:hover:bg-white transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 mt-1"
              >
                {status === "submitting" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-3.5 h-3.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}
