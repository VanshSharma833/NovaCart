import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Banknote,
  Edit2,
  Package,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/formatPrice';
import { generateOrderId } from '../../lib/helpers';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

type CheckoutStep = 'shipping' | 'payment' | 'confirmed';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, couponDiscount, shippingFee, finalTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('demo@upi');
  const [confirmedOrderId, setConfirmedOrderId] = useState('NC720458');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shipping Form State
  const [address, setAddress] = useState({
    fullName: 'Vansh Sharma',
    phone: '+91 98765 43210',
    street: '123 Green Park, Hauz Khas',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110016',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!address.fullName.trim()) errors.fullName = 'Full name is required';
    if (!address.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (address.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!address.street.trim()) errors.street = 'Street address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.postalCode.trim()) {
      errors.postalCode = 'PIN / Postal code is required';
    } else if (address.postalCode.trim().length < 5) {
      errors.postalCode = 'Please enter a valid postal code';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddress()) {
      showToast('Please fix the shipping address errors', 'error');
      setIsEditingAddress(true);
      return;
    }
    setIsEditingAddress(false);
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    if (isSubmitting) return;

    if (paymentMethod === 'UPI' && !upiId.trim()) {
      showToast('Please enter a valid UPI ID (e.g. yourname@upi)', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate safe order placement processing
    setTimeout(() => {
      const newOrderId = generateOrderId();
      setConfirmedOrderId(newOrderId);
      setStep('confirmed');
      clearCart();
      setIsSubmitting(false);
      showToast(`Order #${newOrderId} simulation created!`, 'success');
    }, 700);
  };

  // If cart is empty and not confirmed, redirect
  if (items.length === 0 && step !== 'confirmed') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <Package className="w-12 h-12 text-[#737373] mb-4 stroke-1" />
        <h2 className="text-xl font-medium tracking-tight text-[#171717]">No items in cart</h2>
        <p className="text-xs text-[#737373] mt-1">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="mt-6">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  // 1. Order Confirmation Screen
  if (step === 'confirmed') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-[#FAF9F6]">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-[#E7E5E4] p-8 sm:p-12 text-center space-y-6 shadow-2xs">
          {/* Subtle Green Checkmark */}
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E7E5E4] text-[10px] font-medium uppercase tracking-widest text-[#737373] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9]" />
              Demo Order Simulated
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
              Order Receipt Generated
            </h1>
            <p className="text-[#737373] text-xs sm:text-sm mt-2">
              Reference code <strong className="text-[#171717] font-mono">#{confirmedOrderId}</strong>
            </p>
          </div>

          <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#E7E5E4] text-left space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#737373]">Estimated Delivery:</span>
              <span className="font-medium text-[#171717]">3-5 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737373]">Shipping To:</span>
              <span className="font-medium text-[#171717] truncate max-w-xs">{address.street}, {address.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737373]">Payment Simulation:</span>
              <span className="font-medium text-emerald-600">{paymentMethod} (Demo Mode)</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E7E5E4] text-[11px] text-[#737373] text-left flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#737373] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#171717]">College Hackathon Demo:</strong> This interface demonstrates a full frontend checkout cycle without processing actual currency.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link to="/account">
              <Button variant="outline" size="md" className="w-full">
                View Orders
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="primary" size="md" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step === 'shipping'
                    ? 'bg-[#171717] text-white'
                    : 'bg-[#171717] text-white'
                }`}
              >
                {step === 'payment' ? '✓' : '1'}
              </div>
              <span className="text-xs font-medium text-[#171717]">Shipping</span>
            </div>

            <div className="flex-1 h-px mx-4 bg-[#E7E5E4]" />

            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step === 'payment'
                    ? 'bg-[#171717] text-white'
                    : 'bg-white border border-[#E7E5E4] text-[#737373]'
                }`}
              >
                2
              </div>
              <span className={`text-xs font-medium ${step === 'payment' ? 'text-[#171717]' : 'text-[#737373]'}`}>Payment</span>
            </div>

            <div className="flex-1 h-px mx-4 bg-[#E7E5E4]" />

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white border border-[#E7E5E4] text-[#737373] flex items-center justify-center text-xs font-medium">
                3
              </div>
              <span className="text-xs font-medium text-[#737373]">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Checkout Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6 shadow-2xs">
            {step === 'shipping' && (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                  <h2 className="text-base font-semibold text-[#171717]">Shipping Details</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-xs text-[#171717] hover:text-[#6554D9] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{isEditingAddress ? 'Done' : 'Change Address'}</span>
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      value={address.fullName}
                      error={formErrors.fullName}
                      onChange={(e) => {
                        setAddress({ ...address, fullName: e.target.value });
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                      }}
                      required
                    />
                    <Input
                      label="Mobile Phone *"
                      value={address.phone}
                      error={formErrors.phone}
                      onChange={(e) => {
                        setAddress({ ...address, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      required
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Street Address / Area *"
                        value={address.street}
                        error={formErrors.street}
                        onChange={(e) => {
                          setAddress({ ...address, street: e.target.value });
                          if (formErrors.street) setFormErrors({ ...formErrors, street: '' });
                        }}
                        required
                      />
                    </div>
                    <Input
                      label="City *"
                      value={address.city}
                      error={formErrors.city}
                      onChange={(e) => {
                        setAddress({ ...address, city: e.target.value });
                        if (formErrors.city) setFormErrors({ ...formErrors, city: '' });
                      }}
                      required
                    />
                    <Input
                      label="Postal Code (PIN) *"
                      value={address.postalCode}
                      error={formErrors.postalCode}
                      onChange={(e) => {
                        setAddress({ ...address, postalCode: e.target.value });
                        if (formErrors.postalCode) setFormErrors({ ...formErrors, postalCode: '' });
                      }}
                      required
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-[#E7E5E4] bg-[#FAF9F6] space-y-1">
                    <p className="text-sm font-semibold text-[#171717]">{address.fullName}</p>
                    <p className="text-xs text-[#737373]">{address.street}, {address.city} - {address.postalCode}</p>
                    <p className="text-xs text-[#737373]">Phone: {address.phone}</p>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full font-medium"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                  <h2 className="text-base font-semibold text-[#171717]">Select Payment Method</h2>
                  <button
                    onClick={() => setStep('shipping')}
                    className="text-xs text-[#737373] hover:text-[#171717] underline font-medium transition-colors cursor-pointer"
                  >
                    Back to Address
                  </button>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#171717] bg-[#FAF9F6] ring-1 ring-[#171717]'
                        : 'border-[#E7E5E4] hover:bg-[#FAF9F6]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-1 text-[#171717] focus:ring-[#171717]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#171717] flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-[#171717]" /> UPI Instant (GPay, PhonePe, Paytm)
                        </span>
                        <span className="text-[10px] font-medium bg-[#171717] text-white px-2 py-0.5 rounded-full">
                          Fastest
                        </span>
                      </div>
                      <p className="text-xs text-[#737373] mt-0.5">Pay seamlessly with zero surcharge</p>
                      {paymentMethod === 'UPI' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter your UPI ID (e.g. mobile@upi)"
                            className="w-full bg-white border border-[#E7E5E4] rounded-lg px-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#171717] bg-[#FAF9F6] ring-1 ring-[#171717]'
                        : 'border-[#E7E5E4] hover:bg-[#FAF9F6]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="mt-1 text-[#171717] focus:ring-[#171717]"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#171717] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#171717]" /> Credit / Debit Card (Visa, Mastercard, RuPay)
                      </span>
                      <p className="text-xs text-[#737373] mt-0.5">All major cards accepted</p>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#171717] bg-[#FAF9F6] ring-1 ring-[#171717]'
                        : 'border-[#E7E5E4] hover:bg-[#FAF9F6]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 text-[#171717] focus:ring-[#171717]"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#171717] flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-[#171717]" /> Cash on Delivery (COD)
                      </span>
                      <p className="text-xs text-[#737373] mt-0.5">Pay in cash or digital scan at your doorstep</p>
                    </div>
                  </label>
                </div>

                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E7E5E4] text-xs text-[#737373]">
                  ⚡ <strong className="text-[#171717]">Demo Sandbox Mode:</strong> Clicking &quot;Place Order&quot; creates an instant simulated order confirmation with receipt.
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full font-medium"
                  onClick={handleCompleteOrder}
                  leftIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
                >
                  {isSubmitting ? 'Authorizing Order...' : `Place Order (${formatPrice(finalTotal)})`}
                </Button>
              </div>
            )}
          </div>

          {/* Right Order Review Column */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 space-y-6 shadow-2xs">
            <h3 className="text-base font-semibold text-[#171717] pb-3 border-b border-[#E7E5E4]">
              Order Summary ({items.length} items)
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 no-scrollbar divide-y divide-[#E7E5E4]">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#171717] truncate">{item.product.name}</p>
                    <p className="text-[11px] text-[#737373]">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#171717]">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-[#E7E5E4] space-y-2 text-xs">
              <div className="flex justify-between text-[#737373]">
                <span>Subtotal</span>
                <span className="font-medium text-[#171717]">{formatPrice(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-medium">-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#737373]">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-[#171717]">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="pt-3 border-t border-[#E7E5E4] flex justify-between text-base font-semibold text-[#171717]">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#737373]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-1" />
              <span>Safe & Secure 256-Bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
