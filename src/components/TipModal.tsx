import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Smartphone, ArrowRight, CheckCircle2, Lock, Landmark, Award, QrCode, Download, Check } from 'lucide-react';
import { generateSecureQrCode } from '../lib/qr';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  amount: number;
  paymentMethod: 'gcash' | 'maya' | 'bank';
  onPaymentSuccess: (donorName: string, message: string) => void;
  donorName: string;
  message: string;
  gcashQrUrl?: string;
  mayaQrUrl?: string;
  gcashNumber?: string;
  mayaNumber?: string;
}

export default function TipModal({
  isOpen,
  onClose,
  creatorName,
  amount,
  paymentMethod,
  onPaymentSuccess,
  donorName,
  message,
  gcashQrUrl,
  mayaQrUrl,
  gcashNumber,
  mayaNumber
}: TipModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Info/Number, 2: OTP, 3: Success
  const [phoneNumber, setPhoneNumber] = useState('0917 123 4567');
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(59);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bankAccount, setBankAccount] = useState('');
  const [bankUser, setBankUser] = useState('');
  const [paymentType, setPaymentType] = useState<'phone_otp' | 'qr_scan'>('qr_scan');
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    if (paymentMethod === 'gcash' && gcashNumber) {
      setPhoneNumber(gcashNumber);
    } else if (paymentMethod === 'maya' && mayaNumber) {
      setPhoneNumber(mayaNumber);
    } else {
      setPhoneNumber('0917 123 4567');
    }
    setHasDownloaded(false);
  }, [paymentMethod, gcashNumber, mayaNumber, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsProcessing(false);
      setOtpCode('');
      setTimer(59);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
      setTimer(59);
    }, 1200);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      // Trigger success callback
      onPaymentSuccess(donorName || 'Anonymous Pinoy', message || 'Mabuhay! Keep up the great content!');
    }, 1500);
  };

  const getThemeDetails = () => {
    switch (paymentMethod) {
      case 'gcash':
        return {
          brand: 'GCash',
          primary: 'bg-[#0052cc]',
          text: 'text-[#0052cc]',
          logoBg: 'bg-[#0052cc]/10',
          accent: 'border-[#0052cc]',
          glow: 'shadow-[0_0_15px_rgba(0,82,204,0.3)]'
        };
      case 'maya':
        return {
          brand: 'Maya',
          primary: 'bg-[#00E676]',
          text: 'text-zinc-950 font-semibold',
          logoBg: 'bg-[#00E676]/10',
          accent: 'border-[#00E676]',
          glow: 'shadow-[0_0_15px_rgba(0,230,118,0.3)]'
        };
      case 'bank':
      default:
        return {
          brand: 'InstaPay Secure',
          primary: 'bg-zinc-850',
          text: 'text-amber-500',
          logoBg: 'bg-amber-500/10',
          accent: 'border-amber-500/40',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]'
        };
    }
  };

  const themeByMethod = getThemeDetails();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step !== 3 ? onClose : undefined}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl"
          id="custom-tip-modal"
        >
          {/* Top Decorative bar */}
          <div className={`h-1.5 w-full ${themeByMethod.primary}`} />

          {/* Close button */}
          {step !== 3 && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              id="tip-modal-close"
            >
              <X size={18} />
            </button>
          )}

          <div className="p-6">
            {/* Payment Brand Logo Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${themeByMethod.logoBg}`}>
                {paymentMethod === 'bank' ? (
                  <Landmark className="text-amber-500" size={22} />
                ) : (
                  <Smartphone className={themeByMethod.brand === 'GCash' ? 'text-blue-500' : 'text-emerald-400'} size={22} />
                )}
              </div>
              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-widest font-mono">Secure Transfer</div>
                <div className="font-bold tracking-tight text-white flex items-center gap-1">
                  {themeByMethod.brand} portal
                  <Shield size={12} className="text-emerald-400" />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="mb-5 rounded-2xl bg-zinc-900/60 p-4 border border-zinc-800/80">
                    <div className="text-xs text-zinc-400">Total Support Amount</div>
                    <div className="text-3xl font-extrabold text-white font-sans mt-1">
                      ₱{amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                      Supporting <span className="font-medium text-zinc-300">{creatorName}</span>
                    </div>
                  </div>

                  {paymentMethod === 'bank' ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Cardholder / Account Name</label>
                        <input
                          type="text"
                          required
                          value={bankUser}
                          onChange={(e) => setBankUser(e.target.value)}
                          placeholder="e.g. Juan Dela Cruz"
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/75 p-3 text-sm text-white focus:border-amber-500 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Bank Account Number</label>
                        <input
                          type="text"
                          required
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          placeholder="e.g. 1092 3456 7890"
                          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/75 p-3 text-sm text-white focus:border-amber-500 focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`mt-4 w-full rounded-2xl ${isProcessing ? 'bg-zinc-800' : 'bg-amber-500 hover:bg-amber-600'} py-3.5 text-center font-semibold text-zinc-950 transition-all flex items-center justify-center gap-2`}
                        id="tip-bank-submit"
                      >
                        {isProcessing ? 'Validating Bank...' : 'Confirm Secure Bank Deposit'}
                        {!isProcessing && <ArrowRight size={16} />}
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      {/* Sub Selector for QR vs direct OTP payment */}
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-900 border border-zinc-850 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setPaymentType('qr_scan')}
                          className={`py-1.5 px-2.5 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            paymentType === 'qr_scan'
                              ? 'bg-zinc-800 text-white shadow-xs'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          <QrCode size={12} />
                          Secure QR
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentType('phone_otp')}
                          className={`py-1.5 px-2.5 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            paymentType === 'phone_otp'
                              ? 'bg-zinc-800 text-white shadow-xs'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          <Smartphone size={12} />
                          Phone OTP
                        </button>
                      </div>

                      {paymentType === 'qr_scan' ? (
                        <div className="space-y-4 text-center">
                          {/* Inner Display Container for the scanned or uploaded QR image */}
                          <div className="mx-auto flex flex-col items-center p-3 rounded-2xl bg-white text-zinc-900 border border-zinc-200 shadow-xl max-w-[210px]">
                            <img
                              src={
                                paymentMethod === 'gcash'
                                  ? gcashQrUrl || generateSecureQrCode(creatorName, phoneNumber, 'GCash', amount)
                                  : mayaQrUrl || generateSecureQrCode(creatorName, phoneNumber, 'Maya', amount)
                              }
                              className="h-44 w-44 object-contain shadow-xs"
                              alt={`${themeByMethod.brand} secure portal qr code`}
                              id="active-payment-qr-image"
                            />
                            <p className="text-[9.5px] font-extrabold text-zinc-400 uppercase tracking-wider font-mono mt-2">
                              {paymentMethod === 'gcash' ? 'GCash Integrated QR' : 'Maya Integrated QR'}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs text-zinc-350 leading-normal">
                              Protect your billing info &amp; payment numbers. Scan code directly in-app or download it to your gallery to pay securely!
                            </p>
                            
                            {/* Real trigger download button */}
                            <a
                              href={
                                paymentMethod === 'gcash'
                                  ? gcashQrUrl || generateSecureQrCode(creatorName, phoneNumber, 'GCash', amount)
                                  : mayaQrUrl || generateSecureQrCode(creatorName, phoneNumber, 'Maya', amount)
                              }
                              download={`Merqato-${paymentMethod}-QR-₱${amount}.svg`}
                              onClick={() => {
                                setHasDownloaded(true);
                              }}
                              className={`w-full py-2.5 font-mono text-xs font-bold rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 text-white flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                hasDownloaded ? 'border-emerald-500/30 text-emerald-400 bg-emerald-950/10' : ''
                              }`}
                            >
                              {hasDownloaded ? (
                                <>
                                  <Check size={14} className="stroke-current" />
                                  Saved in Device Gallery!
                                </>
                              ) : (
                                <>
                                  <Download size={14} className="stroke-current" />
                                  Download Secure QR Code
                                </>
                              )}
                            </a>
                          </div>

                          {/* Trigger complete scanned payment manually */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsProcessing(true);
                              setTimeout(() => {
                                setIsProcessing(false);
                                setStep(3);
                                onPaymentSuccess(donorName || 'Anonymous Pinoy', message || 'Mabuhay! Keep up the great content!');
                              }, 1500);
                            }}
                            className={`w-full rounded-2xl ${themeByMethod.primary} py-3.5 text-center font-bold text-xs ${paymentMethod === 'gcash' ? 'text-white' : 'text-zinc-950'} hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg`}
                          >
                            {isProcessing ? (
                              'Confirming scanned gateway...'
                            ) : (
                              <>
                                <CheckCircle2 size={14} />
                                I've completed scanning &amp; transfer
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                          <div>
                            <label className="block text-xs text-zinc-400 mb-1.5 font-medium">
                              Registered {themeByMethod.brand} Mobile Number
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-3.5 text-sm text-zinc-500 font-mono">+63</span>
                              <input
                                type="tel"
                                required
                                pattern="09[0-9]{9}|[0-9]{9}"
                                placeholder="917 123 4567"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/75 py-3.5 pl-14 pr-4 font-mono text-sm tracking-widest text-white focus:border-white/20 focus:outline-hidden"
                              />
                            </div>
                            <p className="mt-1.5 text-[11px] text-zinc-500 leading-normal">
                              A simulated secure login OTP (One-Time PIN) will be sent to confirm support.
                            </p>
                          </div>

                          <button
                            type="submit"
                            disabled={isProcessing}
                            className={`mt-4 w-full rounded-2xl ${isProcessing ? 'bg-zinc-800' : themeByMethod.primary} py-3.5 text-center font-bold text-xs ${paymentMethod === 'gcash' ? 'text-white' : 'text-zinc-950'} transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-105`}
                            id="tip-modal-number-submit"
                          >
                            {isProcessing ? 'Connecting...' : 'Securely Open Integration'}
                            {!isProcessing && <ArrowRight size={14} />}
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                    <Lock size={10} /> Secure 256-Bit SSL Encryption • Merqato PH
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="mb-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-4 text-center">
                    <div className="text-xs text-zinc-400">Authenticating Mobile</div>
                    <div className="text-sm font-semibold text-white mt-1">Verification Code Sent!</div>
                    <div className="text-xs text-indigo-400 font-mono mt-1">
                      Your Safe OTP: <span className="font-bold text-white text-base underline decoration-indigo-400">842 109</span>
                    </div>
                  </div>

                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5 text-center font-medium">
                        Enter Code to Safely Approve ₱{amount}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        pattern="[0-9]{6}"
                        placeholder="842109"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full text-center rounded-xl border border-zinc-850 bg-zinc-900/80 py-4 font-mono text-xl tracking-widest text-white focus:border-white/20 focus:outline-hidden focus:ring-1 focus:ring-white/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`mt-4 w-full rounded-2xl ${isProcessing ? 'bg-zinc-800' : 'bg-emerald-500 hover:bg-emerald-600'} py-3.5 text-center font-semibold text-zinc-950 transition-all flex items-center justify-center gap-2`}
                      id="tip-modal-otp-submit"
                    >
                      {isProcessing ? 'Authorizing Payment...' : 'Verify & Authorize Safe payment'}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      disabled={timer > 0}
                      onClick={() => setTimer(59)}
                      className="text-xs text-zinc-400 hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-zinc-400"
                    >
                      {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend Verification SMS Code'}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-4"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 className="text-xl font-extrabold text-white">Transacted Successfully</h3>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    Your direct tip was instantly funneled to <span className="font-semibold text-zinc-200">{creatorName}</span>!
                  </p>

                  <div className="my-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-left">
                    <div className="flex justify-between items-center text-xs text-zinc-500 pb-2 border-b border-zinc-800/80">
                      <span>Secure Reference</span>
                      <span className="font-mono text-zinc-400">MQ-984A28X</span>
                    </div>
                    <div className="flex justify-between items-center text-xs py-2 border-b border-zinc-800/80">
                      <span className="text-zinc-400">Payment Channel</span>
                      <span className="font-semibold text-zinc-200 capitalize">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-2 font-mono">
                      <span className="text-zinc-400">Tipped Sum</span>
                      <span className="font-bold text-emerald-400">₱{amount.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 italic mb-5 leading-relaxed">
                    "Salamat po! Your support helps fuel my creativity and digital products journey."
                  </p>

                  <button
                    onClick={onClose}
                    className="w-full rounded-2xl bg-zinc-800 hover:bg-zinc-700 py-3 text-center font-semibold text-white transition-colors"
                    id="tip-modal-success-close"
                  >
                    Return to Merqato Profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
