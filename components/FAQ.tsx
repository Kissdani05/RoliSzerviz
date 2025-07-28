import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";

const faqData = [
	{
		questionKey: "faq_q_1",
		answerKey: "faq_a_1",
	},
	{
		questionKey: "faq_q_2",
		answerKey: "faq_a_2",
	},
	{
		questionKey: "faq_q_3",
		answerKey: "faq_a_3",
	},
	{
		questionKey: "faq_q_4",
		answerKey: "faq_a_4",
	},
	{
		questionKey: "faq_q_5",
		answerKey: "faq_a_5",
	},
	{
		questionKey: "faq_q_6",
		answerKey: "faq_a_6",
	},
];

const FAQ: React.FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const { t } = useTranslation();

	const toggle = (idx: number) => {
		setOpenIndex(openIndex === idx ? null : idx);
	};

	return (
		<div
			className="faq-list"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1.5rem",
				marginTop: "1.5rem",
			}}
		>
			{/* Section title example: <h2>{t('faq_section_title')}</h2> */}
			{faqData.map((item, idx) => (
				<div
					key={idx}
					className="faq-item"
					style={{
						background: "#23262e",
						borderRadius: "1.1rem",
						boxShadow: "0 2px 16px rgba(0,0,0,0.13)",
						padding: "0.2rem 1.2rem",
						transition: "box-shadow 0.18s",
						border:
							openIndex === idx
								? "1.5px solid #f47b20"
								: "1.5px solid transparent",
					}}
				>
					<button
						className="faq-question"
						onClick={() => toggle(idx)}
						aria-expanded={openIndex === idx}
						style={{
							background: "none",
							border: "none",
							color: "var(--primary-color)",
							fontWeight: 700,
							fontSize: "1.13rem",
							width: "100%",
							textAlign: "left",
							padding: "1.1rem 0",
							cursor: "pointer",
							outline: "none",
							display: "flex",
							alignItems: "center",
							gap: 12,
						}}
					>
						<span style={{ flex: 1 }}>{t(item.questionKey)}</span>
						<span
							style={{
								transition: "transform 0.2s",
								transform:
									openIndex === idx
										? "rotate(180deg)"
										: "rotate(0deg)",
							}}
						>
							<ChevronDown
								color={openIndex === idx ? "#f47b20" : "#fff"}
								size={22}
							/>
						</span>
					</button>
					<div
						className="faq-answer"
						style={{
							color: "#e0e0e0",
							padding:
								openIndex === idx ? "0 0 1.1rem 0" : "0",
							fontSize: "1.01rem",
							maxHeight: openIndex === idx ? 300 : 0,
							overflow: "hidden",
							transition:
								"max-height 0.25s cubic-bezier(0.4,0,0.2,1)",
							opacity: openIndex === idx ? 1 : 0,
						}}
					>
						{openIndex === idx && (
							<div style={{ paddingTop: 2 }}>{t(item.answerKey)}</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default FAQ;
