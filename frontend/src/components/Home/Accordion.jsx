import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Accordion = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleAccordion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	const faqs = [
		{
			question: "What is Shelf Wise's return policy?",
			answer:
				"We offer a 30-day return policy for all unused books in their original condition and packaging.",
		},
		{
			question: "How long does shipping take?",
			answer:
				"Standard shipping for books takes 3-5 business days. Expedited shipping is available at checkout.",
		},
		{
			question: "Do you offer international shipping?",
			answer:
				"Yes, we ship to most countries. Shipping costs and times vary depending on the destination.",
		},
		{
			question: "Are the books at Shelf Wise guaranteed?",
			answer:
				"All books are guaranteed to be brand new and free from defects. We provide a 30-day return policy for any issues.",
		},
		{
			question: "How do I track my order?",
			answer:
				"Once your order has shipped, you will receive a tracking number via email to monitor your package's progress.",
		},
		{
			question: "Can I change my delivery address after placing the order?",
			answer:
				"Changes to the delivery address can be made within 24 hours of placing the order by contacting our customer service team.",
		},
		{
			question: "Are there discounts for bulk orders?",
			answer:
				"Yes, we offer discounts for bulk purchases. Please contact us directly for more information about our bulk order policies.",
		},
	];

	return (
		<div className="px-5 mx-auto my-12">
			<h1 className="text-center text-3xl mb-5 font-bold">
				Frequently Asked Questions
			</h1>
			{faqs.map((faq, index) => (
				<div
					key={index}
					className="border-b border-gray-200 last:border-b-0 bg-gray-100"
				>
					<button
						onClick={() => toggleAccordion(index)}
						className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
					>
						<span className="font-medium text-gray-800">{faq.question}</span>
						{activeIndex === index ? (
							<ChevronUp className="w-5 h-5 text-gray-600" />
						) : (
							<ChevronDown className="w-5 h-5 text-gray-600" />
						)}
					</button>
					{activeIndex === index && (
						<div className="p-4 bg-gray-50 text-gray-700 text-sm">
							{faq.answer}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Accordion;
