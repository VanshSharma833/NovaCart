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

  // Shipping Form State
  const [address, setAddress] = useState({
    fullName: 'Vansh Sharma',
    phone: '+91 98765 43210',
    street: '123 Green Park, Hauz Khas',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110016',
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    const newOrderId = generateOrderId();
    setConfirmedOrderId(newOrderId);
    setStep('confirmed');
    clearCart();
    showToast(`Order #${newOrderId} confirmed!`, 'success');
  };

  // If cart is empty and not confirmed, redirect
  if (items.length === 0 && step !== 'confirmed') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <Package className="w-12 h-12 text-slate-400 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">No items to checkout</h2>
        <p className="text-xs text-slate-500 mt-1">Please add items to your cart before proceeding.</p>
        <Link to="/shop" className="mt-6">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  // 1. Order Confirmation Screen
  if (step === 'confirmed') {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center space-y-6">
          {/* Animated Green Checkmark */}
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Success
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Order Confirmed!
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              Your order <strong className="text-slate-900 font-mono">#{confirmedOrderId}</strong> has
              been placed successfully.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Delivery:</span>
              <span className="font-bold text-slate-800">3-5 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping To:</span>
              <span className="font-medium text-slate-800 truncate max-w-xs">{address.street}, {address.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Status:</span>
              <span className="font-bold text-emerald-600">Simulated / Demo Paid</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-800 text-left">
            <strong>Note:</strong> This is a frontend demo sandbox. No real monetary transactions or real deliveries were initiated.
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
    <div className="min-h-screen bg-slate-50/50 pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 'shipping'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {step === 'payment' ? '✓' : '1'}
              </div>
              <span className="text-xs font-bold text-slate-800">Shipping</span>
            </div>

            <div className="flex-1 h-0.5 mx-4 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 'payment'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                2
              </div>
              <span className="text-xs font-bold text-slate-800">Payment</span>
            </div>

            <div className="flex-1 h-0.5 mx-4 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-xs font-bold text-slate-400">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Checkout Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-6 sm:p-8 space-y-6">
            {step === 'shipping' && (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">Shipping Address</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{isEditingAddress ? 'Done' : 'Edit'}</span>
                  </button>
                </div>

                {isEditingAddress ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      required
                    />
                    <Input
                      label="Mobile Phone"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      required
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Street Address / Area"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        required
                      />
                    </div>
                    <Input
                      label="City"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      required
                    />
                    <Input
                      label="Postal Code (PIN)"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      required
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-indigo-100 bg-indigo-50/40 space-y-1">
                    <p className="text-sm font-bold text-slate-900">{address.fullName}</p>
                    <p className="text-xs text-slate-600">{address.street}, {address.city} - {address.postalCode}</p>
                    <p className="text-xs text-slate-600">Phone: {address.phone}</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h2 className="text-lg font-bold text-slate-900">Select Payment Method</h2>
                  <button
                    onClick={() => setStep('shipping')}
                    className="text-xs text-indigo-600 hover:underline font-semibold"
                  >
                    Back to Address
                  </button>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-indigo-600" /> UPI Instant (GPay, PhonePe, Paytm)
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Fastest
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Pay seamlessly with zero payment surcharge</p>
                      {paymentMethod === 'UPI' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter your UPI ID (e.g. mobile@upi)"
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-indigo-600" /> Credit / Debit Card (Visa, Master, RuPay)
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">All major Indian and international cards accepted</p>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-indigo-600" /> Cash on Delivery (COD)
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">Pay in cash or digital scan at your doorstep upon arrival</p>
                    </div>
                  </label>
                </div>

                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-900">
                  ⚡ <strong>Demo Sandbox Mode:</strong> Clicking "Place Order" will simulate order authorization and generate an official receipt.
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold"
                  onClick={handleCompleteOrder}
                >
                  Place Order ({formatPrice(finalTotal)})
                </Button>
              </div>
            )}
          </div>

          {/* Right Order Review Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-subtle p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Review ({items.length} items)
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 no-scrollbar divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-semibold">-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
                <span>Total Amount</span>
                <span className="text-indigo-600 font-extrabold">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safe & Secure 256-Bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
