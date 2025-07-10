import React, { useState } from "react";
import Link from "next/link";

export interface AccordionItem {
	id: number;
	question: string;
	answer: string;
}

interface AccordionProps {
	items: AccordionItem[];
	className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, className = "" }) => {
	const [openId, setOpenId] = useState<number | null>(null);

	const handleAccordion = (id: number) => {
		setOpenId(openId === id ? null : id);
	};

	return (
		<div className={`accordion ${className}`} id="accordionFAQ">
			{items.map((item) => (
				<div className="accordion-item wow border-bottom-0" key={item.id}>
					<h5
						className="accordion-header"
						id={`heading${item.id}`}
						onClick={() => handleAccordion(item.id)}
					>
						<button
							className={`accordion-button text-heading-5 ${openId === item.id ? "collapsed" : ""}`}
							type="button"
							aria-expanded={openId === item.id}
							aria-controls={`collapse${item.id}`}
						>
							<h3>{item.id.toString().padStart(2, "0")}</h3>
							<p>{item.question}</p>
						</button>
					</h5>
					<div
						className={`accordion-collapse collapse ${openId === item.id ? "show" : ""}`}
						id={`collapse${item.id}`}
						aria-labelledby={`heading${item.id}`}
						data-bs-parent="#accordionFAQ"
					>
						<div className="accordion-body">{item.answer}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Accordion;

// Example usage for a page (accordion.tsx):
//
// import Accordion, { AccordionItem } from "../components/accordion";
//
// const faqs: AccordionItem[] = [
//   {
//     id: 1,
//     question: "How do I make a reservation on your website",
//     answer: "Provide a step-by-step guide on how users can browse and book travel services on your platform...",
//   },
//   // ...more items
// ];
//
// export default function AccordionPage() {
//   return (
//     <section className="section-box box-faqs background-body pt-0">
//       <div className="box-faqs-inner">
//         <div className="container">
//           <div className="text-center">
//             <span className="text-sm-bold bg-2 p-3 rounded-12">Our Support</span>
//             <h3 className="mt-4 neutral-1000">Frequently Asked Questions</h3>
//           </div>
//           <div className="block-faqs">
//             <Accordion items={faqs} />
//           </div>
//           <div className="row">
//             <div className="col-12 wow mt-4">
//               <div className="d-flex justify-content-center gap-2">
//                 <Link className="btn btn-primary mt-2" href="#">Contact Us</Link>
//                 <Link className="btn btn-primary bg-transparent mt-2 invert" href="#">Help Center</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
