"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useParams } from "next/navigation";

function ArticlePage() {
  const { slug } = useParams();
  
  return <div>Article: {slug}</div>;
}

const ContactPage = () => {
  const form = useRef(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setError(false);
    setSuccess(false);
    setIsSending(true);

    const formEl = form.current;
    if (!formEl) {
      setError(true);
      setIsSending(false);
      return;
    }

  
    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || 
        serviceId.includes('xxx') || templateId.includes('xxx') || publicKey.includes('xxx')) {
      console.log("EmailJS configuration needed. Check EMAILJS_SETUP.md for instructions.");
      alert("⚠️ EmailJS yapılandırması gerekli!\n\n1. https://www.emailjs.com adresinde hesap oluşturun\n2. Gmail servisini cemreegnr9@gmail.com ile bağlayın\n3. .env.local dosyasındaki xxx değerlerini gerçek API anahtarlarınızla değiştirin\n4. Sunucuyu yeniden başlatın\n\nDetaylı talimatlar için EMAILJS_SETUP.md dosyasına bakın.");
      setError(true);
      setIsSending(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formEl, publicKey).then(
      (result) => {
        console.log("Email sent successfully:", result.text);
        setSuccess(true);
        formEl.reset();
        setIsSending(false);
      },
      (error) => {
        console.error("EmailJS error:", error.text);
        setError(true);
        setIsSending(false);
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-transparent">
      <form
        onSubmit={sendEmail}
        ref={form}
        className="w-full max-w-md rounded-xl text-lg flex flex-col gap-4 p-6 bg-transparent"
      >
        
        <label className="font-semibold">Email Address</label>
        <input
          name="user_email"
          type="email"
          required
          className="bg-transparent border-b-2 border-b-black outline-none py-2 text-lg"
          aria-label="Email Address"
          placeholder="your.email@example.com"
        />

        
        <label className="font-semibold">Name (optional)</label>
        <input
          name="user_name"
          type="text"
          className="bg-transparent border-b-2 border-b-black outline-none py-2 text-lg"
          placeholder="Your name"
        />

        
        <label className="font-semibold">Message</label>
        <textarea
          rows={6}
          className="bg-transparent border-2 border-black resize-y py-3 px-3 rounded-md min-h-32 text-lg"
          name="user_message"
          placeholder="Write your message here..."
          required
        />

      
        <button
          type="submit"
          disabled={isSending}
          className="bg-primary rounded font-semibold text-white py-3 mt-1 disabled:opacity-60"
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>

        
        {success && (
          <div className="text-green-600 font-semibold mt-2">Message sent successfully!</div>
        )}

        
        {error && (
          <div className="text-red-600 font-semibold mt-2">Failed to send message. Please try again.</div>
        )}
      </form>
    </div>
  );
};

export default ContactPage;