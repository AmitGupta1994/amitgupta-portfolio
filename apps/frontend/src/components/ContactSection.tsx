"use client";

import { useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // The form data can be easily sent to Formspree, Web3Forms, or your own API
    const formData = new FormData(e.currentTarget);
    
    try {
      // For now, we simulate a successful submission. 
      // To make this fully functional without a backend, 
      // you can replace this with a fetch call to Formspree or Web3Forms.
      // Example: await fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: formData, headers: { Accept: "application/json" } });
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">Get in Touch</h2>
        <p className="text-lg text-neutral-600 max-w-2xl">
          Have a question, a project idea, or just want to say hi? Leave a message and I'll get back to you as soon as possible.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm max-w-3xl">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Message Sent Successfully!</h3>
            <p className="text-neutral-600 mb-8">Thanks for reaching out. I've received your message and will reply shortly.</p>
            <button 
              onClick={() => setStatus("idle")}
              className="px-6 py-2.5 bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-neutral-900">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-neutral-900">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-neutral-900">Message</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={5}
                placeholder="How can I help you?"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none placeholder:text-neutral-400"
              ></textarea>
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm font-medium">Something went wrong sending your message. Please try again.</p>
            )}

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="self-start px-8 py-3.5 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 mt-2"
            >
              {status === "submitting" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
