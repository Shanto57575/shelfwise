import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/products", label: "Products" },
		{ href: "/categories", label: "Categories" },
		{ href: "/deals", label: "Deals" },
		{ href: "/about", label: "About" },
	];

	return (
		<footer className="bg-gray-100 py-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div>
						<h3 className="text-xl font-bold mb-4 text-emerald-600">
							ShelfWise
						</h3>
						<p className="text-gray-600">
							Your one-stop destination for all your shopping needs. Quality
							products, great prices, and exceptional service.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							{navLinks.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className="text-gray-600 hover:text-blue-600 transition"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className="font-semibold mb-4">Customer Service</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="/contact"
									className="text-gray-600 hover:text-blue-600"
								>
									Contact Us
								</a>
							</li>
							<li>
								<a
									href="/shipping"
									className="text-gray-600 hover:text-blue-600"
								>
									Shipping
								</a>
							</li>
							<li>
								<a
									href="/returns"
									className="text-gray-600 hover:text-blue-600"
								>
									Returns
								</a>
							</li>
							<li>
								<a href="/faq" className="text-gray-600 hover:text-blue-600">
									FAQ
								</a>
							</li>
						</ul>
					</div>

					{/* Social Media */}
					<div>
						<h4 className="font-semibold mb-4">Connect With Us</h4>
						<div className="flex space-x-4">
							<a href="#" className="text-blue-700 hover:text-blue-900">
								<Facebook size={24} />
							</a>
							<a href="#" className="text-blue-400 hover:text-blue-600">
								<Twitter size={24} />
							</a>
							<a href="#" className="text-pink-600 hover:text-pink-800">
								<Instagram size={24} />
							</a>
							<a href="#" className="text-blue-500 hover:text-blue-700">
								<Linkedin size={24} />
							</a>
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="border-t mt-8 pt-6 text-center text-gray-600">
					<p>
						&copy;{" "}
						<span className="font-sans font-semibold">
							{new Date().getFullYear()}
						</span>{" "}
						ShelfWise. All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
