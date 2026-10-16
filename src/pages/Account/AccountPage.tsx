import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  User,
  MapPin,
  Heart,
  CreditCard,
  LogOut,
  Shield,
} from 'lucide-react';
import { formatPrice } from '../../lib/formatPrice';
import { useWishlist } from '../../context/WishlistContext';
import { Button } from '../../components/ui/Button';
import { PRODUCT_FALLBACK_IMAGE } from '../../lib/helpers';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'payments'>('orders');
  const { wishlistCount } = useWishlist();

  // Sensible demo order history
  const demoOrders = [
    {
      id: 'NC720458',
      date: 'Oct 12, 2026',
      total: 31894,
      status: 'In Transit',
      itemsCount: 3,
      estimatedDelivery: 'Oct 16, 2026',
      items: [
        {
          name: "Nike Air Force 1 '07",
          price: 7995,
          image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80',
          size: 'UK 8',
          color: 'Triple White',
        },
        {
          name: 'Apple AirPods Pro (2nd Gen)',
          price: 24900,
          image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=300&q=80',
          color: 'White',
        },
      ],
    },
    {
      id: 'NC589104',
      date: 'Sep 28, 2026',
      total: 74999,
      status: 'Delivered',
      itemsCount: 1,
      estimatedDelivery: 'Oct 02, 2026',
      items: [
        {
          name: 'Samsung Galaxy S24 Ultra',
          price: 74999,
          image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=300&q=80',
          color: 'Titanium Gray',
        },
      ],
    },
    {
      id: 'NC392180',
      date: 'Aug 14, 2026',
      total: 2499,
      status: 'Delivered',
      itemsCount: 1,
      estimatedDelivery: 'Aug 18, 2026',
      items: [
        {
          name: "Levi's Oversized Heavyweight Hoodie",
          price: 2499,
          image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80',
          color: 'Washed Black',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Greeting Banner */}
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF9F6] border border-[#E7E5E4] flex items-center justify-center text-[#171717] font-semibold text-lg tracking-wider">
              VS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-medium text-[#171717] tracking-tight">Vansh Sharma</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E7E5E4] text-[10px] font-medium text-[#171717]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6554D9]" />
                  Member
                </span>
              </div>
              <p className="text-xs text-[#737373] mt-0.5">vansh.sharma@example.com • +91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/wishlist">
              <Button variant="outline" size="sm" leftIcon={<Heart className="w-3.5 h-3.5" />}>
                Wishlist ({wishlistCount})
              </Button>
            </Link>
            <Button variant="secondary" size="sm" leftIcon={<LogOut className="w-3.5 h-3.5" />}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E7E5E4] p-3 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#171717] text-white'
                  : 'text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 stroke-1" />
                <span>Orders</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-[#FAF9F6] text-[#737373] border border-[#E7E5E4]'
                }`}
              >
                {demoOrders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#171717] text-white'
                  : 'text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <User className="w-4 h-4 stroke-1" />
              <span>Personal Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#171717] text-white'
                  : 'text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <MapPin className="w-4 h-4 stroke-1" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                activeTab === 'payments'
                  ? 'bg-[#171717] text-white'
                  : 'text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <CreditCard className="w-4 h-4 stroke-1" />
              <span>Payment Methods</span>
            </button>
          </aside>

          {/* Main Tab Panels */}
          <main className="lg:col-span-9 bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-[#171717]">Order History</h2>
                  <p className="text-xs text-[#737373] mt-0.5">
                    Track shipments, view details, and manage past orders
                  </p>
                </div>

                <div className="space-y-4">
                  {demoOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#E7E5E4] rounded-xl p-5 hover:border-[#171717]/30 transition-colors space-y-4"
                    >
                      {/* Order top bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E7E5E4] text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-[#171717]">#{order.id}</span>
                          <span className="text-[#E7E5E4]">•</span>
                          <span className="text-[#737373]">{order.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-[#FAF9F6] text-[#171717] border-[#E7E5E4]'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items previews */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3.5">
                            <div className="w-14 h-14 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                onError={(e) => {
                                  e.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
                                }}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-medium text-[#171717] truncate">{item.name}</h4>
                              <p className="text-[11px] text-[#737373]">
                                {item.color} {item.size ? `• Size: ${item.size}` : ''}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-[#171717]">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom row */}
                      <div className="pt-3 border-t border-[#E7E5E4] flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="text-[#737373]">
                          Total:{' '}
                          <span className="font-semibold text-[#171717] text-sm">
                            {formatPrice(order.total)}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Track Shipment
                          </Button>
                          <Button variant="secondary" size="sm">
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h2 className="text-base font-semibold text-[#171717]">Personal Information</h2>
                  <p className="text-xs text-[#737373] mt-0.5">Manage your personal profile and account credentials</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-medium text-[#171717] block mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Vansh Sharma"
                      className="w-full bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-[#171717] block mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue="vansh.sharma@example.com"
                      className="w-full bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-[#171717] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full bg-[#FAF9F6] border border-[#E7E5E4] rounded-lg px-3.5 py-2.5 text-[#171717] focus:outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <Button variant="primary" size="md">
                  Save Changes
                </Button>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-[#171717]">Saved Addresses</h2>
                    <p className="text-xs text-[#737373] mt-0.5">Addresses for delivery and billing</p>
                  </div>
                  <Button variant="primary" size="sm">
                    + Add New Address
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="border border-[#171717] rounded-xl p-4 bg-[#FAF9F6] relative space-y-1">
                    <span className="absolute top-3 right-3 text-[10px] font-medium bg-[#171717] text-white px-2 py-0.5 rounded-full">
                      Default
                    </span>
                    <h4 className="font-semibold text-[#171717]">Home</h4>
                    <p className="text-[#171717] font-medium">Vansh Sharma</p>
                    <p className="text-[#737373]">123 Green Park, Hauz Khas</p>
                    <p className="text-[#737373]">New Delhi - 110016, Delhi</p>
                    <p className="text-[#737373] pt-1">Phone: +91 98765 43210</p>
                  </div>

                  <div className="border border-[#E7E5E4] rounded-xl p-4 bg-white space-y-1">
                    <h4 className="font-semibold text-[#171717]">Office</h4>
                    <p className="text-[#171717] font-medium">Vansh Sharma</p>
                    <p className="text-[#737373]">Tower B, 4th Floor, Cyber Hub</p>
                    <p className="text-[#737373]">Gurugram - 122002, Haryana</p>
                    <p className="text-[#737373] pt-1">Phone: +91 98765 43210</p>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-base font-semibold text-[#171717]">Payment Methods</h2>
                  <p className="text-xs text-[#737373] mt-0.5">Saved cards and linked payment accounts</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-[#E7E5E4] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717]">
                        <CreditCard className="w-5 h-5 stroke-1" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#171717]">HDFC Regalia Visa Platinum</h4>
                        <p className="text-[11px] text-[#737373]">•••• •••• •••• 4821 • Expires 08/29</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717] px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-[#E7E5E4] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E7E5E4] text-[#171717]">
                        <Shield className="w-5 h-5 stroke-1" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#171717]">UPI Handle</h4>
                        <p className="text-[11px] text-[#737373]">vansh@okaxis • Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
