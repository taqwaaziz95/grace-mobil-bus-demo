import React from "react";
import CounterUp from "../../components/elements/CounterUp";

export interface StatsSectionItem {
	count: number;
	suffix: string;
	lines: string[];
}

export interface StatsSectionProps {
	data: StatsSectionItem[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ data }) => (
	<section className="section-static-1 background-body background-2 pt-80 pb-80">
		<div className="container">
			<div className="row">
				<div>
					<div className="wow fadeIn">
						<div className="d-flex align-items-center justify-content-around flex-wrap">
							{data.map((item, idx) => (
								<div className="mb-4 mb-lg-0 d-block px-lg-5 px-3" key={idx}>
									<div className="d-flex justify-content-center justify-content-md-start">
										<h3 className="count neutral-1000">
											<CounterUp count={item.count} />
										</h3>
										<h3 className="neutral-1000">{item.suffix}</h3>
									</div>
									<div className="text-md-start text-center">
										{item.lines.map((line, i) => (
											<p className="text-lg-bold neutral-1000" key={i}>
												{line}
											</p>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default StatsSection;
