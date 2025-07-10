"use client";

import React, { useState } from "react";

const TopUp: React.FC = () => {
	const [topUpAmount, setTopUpAmount] = useState<number>(0);

	const handleTopUp = () => {
		const currentBalance = localStorage.getItem("balance");
		const newBalance =
			(currentBalance ? parseInt(currentBalance) : 0) + topUpAmount;
		localStorage.setItem("balance", newBalance.toString());
		alert("Topup successful");
		window.location.reload();
	};

	return (
		<div>
			<section className="section-cta-12 background-100 py-96">
				<div className="box-cta-6">
					<div className="container">
						<div className="row align-items-center flex-column-reverse flex-lg-row">
							<div className="col-lg-6">
								<div className="card-image d-inline-block position-relative mb-100">
									<img
										className="rounded-12"
										src="/assets/imgs/cta/cta-11/img-3.png"
										alt="Gracetrans"
									/>
									<img
										className="position-absolute top-100 start-100 translate-middle d-none d-md-block"
										src="/assets/imgs/cta/cta-11/img-car.png"
										alt="Gracetrans"
									/>
								</div>
							</div>
							<div className="col-lg-6 ps-lg-5">
								<div className="mb-30 background-card p-md-5 p-4 rounded-3 mt-lg-0 mt-30">
									<h5 className="neutral-1000 mb-2">Top Up Balance</h5>
									<p className="text-sm-medium neutral-500 mb-25">
										Add funds to your account balance.
									</p>
									<div className="form-contact">
										<div className="row">
											<div className="col-lg-12">
												<div className="form-group">
													<label className="text-sm-medium neutral-1000">
														Top Up Amount
													</label>
													<select
														className="form-control"
														value={topUpAmount}
														onChange={(e) =>
															setTopUpAmount(parseInt(e.target.value))
														}
													>
														<option value={0}>Select amount</option>
														<option value={20000}>Rp 20000</option>
														<option value={50000}>Rp 50000</option>
														<option value={100000}>Rp 100000</option>
														<option value={200000}>Rp 200000</option>
													</select>
												</div>
											</div>
											<div className="col-lg-12">
												<button className="btn btn-book" onClick={handleTopUp}>
													Top Up Now
													<svg
														width={17}
														height={16}
														viewBox="0 0 17 16"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
				</div>
			</section>
		</div>
	);
};

export default TopUp;
