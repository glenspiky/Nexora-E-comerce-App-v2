import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-secondary)] text-white mt-12 border-t-4 border-[var(--color-primary)]">
      <div className="max-w-6xl mx-auto px-5 py-14 flex flex-wrap justify-between gap-8">
        {/* Brand Section */}
        <div className="flex-[2] min-w-[250px]">
          <h2 className="text-2xl mb-4 text-white font-semibold">
            NEX<span className="text-[var(--color-primary)]">ORA</span>
          </h2>

          <p className="text-[var(--color-light-gray)] text-sm leading-relaxed">
            Your one-stop shop for the latest trends and tech. Quality products
            delivered to your doorstep.
          </p>

          <div className="flex gap-4 mt-5 text-xl">
            <a
              href="#"
              className="hover:text-[var(--color-primary)] transition"
            >
              <i className="ri-facebook-fill"></i>
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-primary)] transition"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-primary)] transition"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="#"
              className="hover:text-[var(--color-primary)] transition"
            >
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>

        {/* Shopping Links */}
        <div className="flex-1 min-w-[150px]">
          <h4 className="text-sm uppercase mb-5">Shopping</h4>
          <ul className="space-y-2 text-sm text-[var(--color-light-gray)]">
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Clothing Store
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Trending Shoes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Sale & Offers
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="flex-1 min-w-[150px]">
          <h4 className="text-sm uppercase mb-5">Customer Care</h4>
          <ul className="space-y-2 text-sm text-[var(--color-light-gray)]">
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Payment Methods
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Delivery & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--color-primary)]">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex-[1.5] min-w-[250px]">
          <h4 className="text-sm uppercase mb-5">Subscribe</h4>
          <p className="text-sm text-[var(--color-light-gray)]">
            Be the first to know about new arrivals and promotions!
          </p>

          <div className="flex mt-4">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-3 py-3 border border-[var(--color-light-gray)] rounded-l-md outline-none text-black text-white"
            />
            <button className="px-5 py-3 bg-[var(--color-primary)] text-white font-bold rounded-r-md hover:bg-[var(--color-primary-hover,#e07c14)] transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--color-dark-gray)] mt-10 py-5 px-5 max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <p className="text-xs text-white">
          &copy; 2026 Nexora. All rights reserved.
        </p>

        <div className="flex gap-4 text-2xl text-[var(--color-light-gray)]">
          <i className="ri-visa-line"></i>
          <i className="ri-mastercard-line"></i>
          <i className="ri-paypal-line"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
