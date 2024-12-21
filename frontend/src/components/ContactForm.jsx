import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

const ContactForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsSubmitting(false);
		setFormData({ name: "", email: "", subject: "", message: "" });
		alert("Message sent successfully!");
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="w-full max-w-6xl mx-auto p-4">
			<div className="grid md:grid-cols-2 gap-8">
				{/* Contact Information */}
				<div className="space-y-6">
					<div>
						<h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
						<p className="text-gray-600 mb-8">
							Have more questions? We&apos;d love to hear from you. Send us a
							message and we&lsquo;ll respond as soon as possible.
						</p>
					</div>

					<div className="space-y-4">
						<div className="bg-white p-4 rounded-lg shadow-sm">
							<div className="flex items-center space-x-4">
								<div className="p-2 bg-emerald-100 rounded-full">
									<Mail className="w-6 h-6 text-emerald-600" />
								</div>
								<div>
									<h3 className="font-semibold">Email</h3>
									<p className="text-gray-600">contact@example.com</p>
								</div>
							</div>
						</div>

						<div className="bg-white p-4 rounded-lg shadow-sm">
							<div className="flex items-center space-x-4">
								<div className="p-2 bg-green-100 rounded-full">
									<Phone className="w-6 h-6 text-green-600" />
								</div>
								<div>
									<h3 className="font-semibold">Phone</h3>
									<p className="text-gray-600">+1 (555) 123-4567</p>
								</div>
							</div>
						</div>

						<div className="bg-white p-4 rounded-lg shadow-sm">
							<div className="flex items-center space-x-4">
								<div className="p-2 bg-purple-100 rounded-full">
									<MapPin className="w-6 h-6 text-purple-600" />
								</div>
								<div>
									<h3 className="font-semibold">Address</h3>
									<p className="text-gray-600">
										123 Business Street, Suite 100, City, ST 12345
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Form */}
				<div className="bg-white p-6 rounded-lg shadow-sm">
					<h3 className="text-xl font-bold mb-4">Send Message</h3>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
								placeholder="Your name"
							/>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
								placeholder="your@email.com"
							/>
						</div>

						<div>
							<label
								htmlFor="subject"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Subject
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={formData.subject}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
								placeholder="How can we help?"
							/>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
								rows="4"
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
								placeholder="Your message here..."
							/>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center justify-center space-x-2"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									<span>Sending...</span>
								</>
							) : (
								<>
									<Send className="w-5 h-5" />
									<span>Send Message</span>
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
