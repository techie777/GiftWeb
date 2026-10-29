'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LifeBuoy, MessageSquare, Plus, X, Send, Clock, CheckCircle2, 
  AlertCircle, ChevronRight, Mail, Phone, Package, Sparkles, ShieldCheck, ArrowLeft
} from 'lucide-react';
import { db } from '../lib/db';

export default function SupportModal({ isOpen, onClose, user, onRequireAuth }) {
  const [view, setView] = useState('list'); // 'list' | 'create' | 'detail'
  const [tickets, setTickets] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Delivery & Order Tracking');
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [formError, setFormError] = useState('');

  const loadData = async () => {
    if (!user) return;
    const t = await db.getSupportTickets(user.username);
    setTickets(t || []);
    const orders = await db.getOrders(user.username);
    setUserOrders(orders || []);
    setEmail(user.email || '');
    setPhone(user.phone || '');
  };

  useEffect(() => {
    if (isOpen) {
      if (!user) {
        if (onRequireAuth) onRequireAuth();
        onClose();
        return;
      }
      loadData();
      setView('list');
      setSuccessMessage('');
      setFormError('');
    }
  }, [isOpen, user]);

  const handleCreateTicket = async (e) => {
    if (e) e.preventDefault();
    if (!subject.trim()) {
      setFormError('Please enter a ticket subject / title');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid contact email for admin replies');
      return;
    }
    if (!message.trim()) {
      setFormError('Please describe your issue or question in detail');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const created = await db.createSupportTicket({
        customerUsername: user.username,
        customerName: user.name || user.username,
        email: email.trim(),
        phone: phone.trim(),
        orderId: orderId.trim(),
        subject: subject.trim(),
        category,
        priority,
        message: message.trim()
      });

      setTickets(prev => [created, ...prev]);
      setSuccessMessage(`Ticket #${created.id} submitted! Our concierge team will reply to ${email.trim()} shortly.`);
      // Reset form
      setSubject('');
      setMessage('');
      setOrderId('');
      setTimeout(() => {
        setView('list');
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      console.error(err);
      setFormError('Could not submit ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-hidden font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-rose-100 flex flex-col max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-900 via-rose-850 to-slate-900 text-white p-5 sm:p-6 relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
                <LifeBuoy size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                    Concierge Desk
                  </span>
                  <span className="text-[10px] font-bold text-rose-200">24/7 Dedicated Support</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                  Help & Support Center
                </h3>
              </div>
            </div>

            {/* Quick tabs */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  view === 'list' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-rose-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare size={14} />
                <span>My Tickets ({tickets.length})</span>
              </button>
              <button
                onClick={() => setView('create')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  view === 'create' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-rose-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Plus size={14} />
                <span>Raise New Ticket</span>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
            
            {/* Success Alert */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2.5 shadow-2xs"
              >
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {/* VIEW 1: TICKETS LIST */}
            {view === 'list' && (
              <div className="space-y-4">
                {tickets.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                      <MessageSquare size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">No support tickets yet</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Have an issue with delivery, personalized message, or quality? Raise a ticket and our luxury team will reply via email promptly.
                      </p>
                    </div>
                    <button
                      onClick={() => setView('create')}
                      className="inline-flex items-center gap-2 bg-rose-700 hover:bg-rose-800 text-white font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                    >
                      <Plus size={16} />
                      <span>Raise Your First Ticket</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tickets.map(t => {
                      const statusColor = 
                        t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                        t.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-blue-100 text-blue-800 border-blue-200';

                      const lastMsg = t.messages?.[t.messages.length - 1];

                      return (
                        <div
                          key={t.id}
                          onClick={() => { setSelectedTicket(t); setView('detail'); }}
                          className="bg-white hover:bg-rose-50/40 border border-slate-200 hover:border-rose-300 rounded-2xl p-4.5 transition-all shadow-2xs cursor-pointer space-y-2.5 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                  #{t.id}
                                </span>
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${statusColor}`}>
                                  {t.status}
                                </span>
                                {t.orderId && (
                                  <span className="text-[10px] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded flex items-center gap-1">
                                    <Package size={11} className="text-rose-600" /> Order #{t.orderId}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-bold text-slate-900 text-sm mt-1.5 group-hover:text-rose-700 transition-colors">
                                {t.subject}
                              </h4>
                            </div>
                            <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                              {new Date(t.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            </span>
                          </div>

                          {lastMsg && (
                            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                              <span className="font-black text-[10px] uppercase text-rose-700 shrink-0 mt-0.5">
                                {lastMsg.from === 'admin' ? '✉️ Admin Reply:' : '💬 You:'}
                              </span>
                              <p className="line-clamp-2 text-[11px] leading-relaxed">
                                {lastMsg.text}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-1">
                            <span>Category: {t.category}</span>
                            <span className="text-rose-700 font-extrabold flex items-center gap-1">
                              View Thread & Email Responses <ChevronRight size={12} />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* VIEW 2: CREATE TICKET */}
            {view === 'create' && (
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Subject / Summary *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiring about delivery slot for Order 3007"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Issue Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    >
                      <option value="Delivery & Order Tracking">🚚 Delivery & Live Tracking</option>
                      <option value="Damaged / Freshness Issue">🌸 Freshness & Quality Issue</option>
                      <option value="Custom Text / Photo Personalization">🖼️ Personalization & Custom Text</option>
                      <option value="Payment & Refund Inquiry">💳 Payment & Refund Inquiry</option>
                      <option value="Vendor Inquiry">🏬 Vendor Service</option>
                      <option value="General Question">💬 General Question</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Link Existing Order (Optional)
                    </label>
                    <select
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    >
                      <option value="">-- No specific order --</option>
                      {userOrders.map(o => (
                        <option key={o.id} value={o.id}>
                          Order #{o.id} (₹{o.total} - {o.status})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Your Email (For Admin Reply) *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rohan@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      Priority Level
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs font-bold text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                    >
                      <option value="Normal">Normal (Standard Inquiry)</option>
                      <option value="High">High (Urgent Delivery Issue)</option>
                      <option value="Urgent">Urgent (Midnight / Today Event)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your query, desired changes, or any concern..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-medium text-slate-900 outline-none focus:border-rose-600 focus:bg-white"
                  />
                </div>

                {formError && (
                  <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <AlertCircle size={14} /> {formError}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    className="px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Support Ticket'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* VIEW 3: TICKET DETAIL & MESSAGE THREAD */}
            {view === 'detail' && selectedTicket && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <button
                    onClick={() => setView('list')}
                    className="text-xs font-bold text-slate-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Back to all tickets
                  </button>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Ticket ID: #{selectedTicket.id}
                  </span>
                </div>

                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">
                      {selectedTicket.subject}
                    </h3>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white border border-rose-200 text-rose-800">
                      {selectedTicket.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 font-medium">
                    <span>Category: <strong>{selectedTicket.category}</strong></span>
                    {selectedTicket.orderId && <span>Order: <strong>#{selectedTicket.orderId}</strong></span>}
                    <span>Contact: <strong>{selectedTicket.email}</strong></span>
                  </div>
                </div>

                {/* Conversation Messages */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Conversation History & Email Updates
                  </h4>

                  {(selectedTicket.messages || []).map((msg, index) => {
                    const isAdmin = msg.from === 'admin';
                    return (
                      <div
                        key={msg.id || index}
                        className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                          isAdmin 
                            ? 'bg-gradient-to-br from-rose-50 to-amber-50/60 border-rose-200 ml-4' 
                            : 'bg-white border-slate-200 mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-black text-[11px] flex items-center gap-1.5 ${isAdmin ? 'text-rose-800' : 'text-slate-800'}`}>
                            {isAdmin ? <Mail size={13} className="text-rose-600" /> : <MessageSquare size={13} className="text-slate-500" />}
                            {isAdmin ? `${msg.senderName} (Replied via Email)` : `${msg.senderName} (You)`}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(msg.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                          {msg.text}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <span>
                    Our concierge team responds to tickets via verified email ({selectedTicket.email}). All replies are recorded in this thread automatically.
                  </span>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
