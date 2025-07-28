'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setErrors({})
    
    // Simulate form submission
    setTimeout(() => {
      // Simulate random error for demo
      const success = Math.random() > 0.2
      
      if (success) {
        console.log('Form submitted:', formData)
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
      
      setIsSubmitting(false)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 animate-fade-in text-center">
          <h1 className="text-6xl md:text-7xl mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            I'd love to hear from you. Whether you're interested in purchasing an artwork, 
            commissioning a piece, or simply want to connect about art.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white p-8 lg:p-12 rounded-lg shadow-lg">
              <h2 className="text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all ${
                        errors.name ? 'border-red-500 input-error' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="error-message" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500 input-error' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="error-message" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all"
                  >
                    <option value="">Select a topic...</option>
                    <option value="artwork-inquiry">Artwork Inquiry</option>
                    <option value="commission">Commission Request</option>
                    <option value="exhibition">Exhibition Opportunity</option>
                    <option value="general">General Question</option>
                    <option value="press">Press/Media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all resize-none ${
                      errors.message ? 'border-red-500 input-error' : 'border-gray-300'
                    }`}
                    placeholder="Tell me about your interest in my work..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="error-message" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 font-medium tracking-wider transition-all transform ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#d4a574] hover:bg-[#b8935f] hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                  } text-white rounded-lg`}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center animate-fade-in" role="status" aria-live="polite">
                    <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Thank you for your message! I'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center animate-fade-in" role="alert" aria-live="assertive">
                    <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Direct Contact */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-[#d4a574] mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:info@gichevaart.com" className="text-[#d4a574] hover:text-[#b8935f] transition-colors">
                      info@gichevaart.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-[#d4a574] mr-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Studio Location</p>
                    <p className="text-gray-600">Sofia, Bulgaria</p>
                    <p className="text-sm text-gray-500 mt-1">Visits by appointment only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Connect Online</h3>
              <div className="space-y-4">
                <a 
                  href="https://instagram.com/gicheva.art" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-all group"
                >
                  <svg className="w-8 h-8 text-[#d4a574] mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    <path d="M12 5.838c-3.405 0-6.162 2.757-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-[#d4a574] transition-colors">Instagram</p>
                    <p className="text-gray-600">@gicheva.art</p>
                  </div>
                </a>

                <a 
                  href="#" 
                  className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-all group"
                >
                  <svg className="w-8 h-8 text-[#d4a574] mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8.5 18.5h-3v-9h3v9zM7 8.25C6.175 8.25 5.5 7.575 5.5 6.75S6.175 5.25 7 5.25 8.5 5.925 8.5 6.75 7.825 8.25 7 8.25zm11.5 10.25h-3v-4.74c0-3.187-3.75-2.937-3.75 0v4.74h-3v-9h3v1.322c1.313-2.433 6.75-2.613 6.75 2.329v5.359z"/>
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-[#d4a574] transition-colors">Saatchi Art</p>
                    <p className="text-gray-600">View Gallery</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-[#d4a574] bg-opacity-10 p-6 rounded-lg border border-[#d4a574] border-opacity-20">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Response Time:</span> I typically respond to inquiries within 24-48 hours. 
                For urgent matters, please mention it in your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}