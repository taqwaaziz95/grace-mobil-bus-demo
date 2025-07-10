import React, { ReactNode } from "react";

type AlertProps = {
	type?: "warning" | "success" | "error" | "info";
	title?: string;
	children: ReactNode;
	className?: string;
};

const alertStyles = {
	warning: {
		container:
			"tw:!bg-yellow-100 tw:!border-l-4 tw:!border-yellow-500 tw:!text-yellow-700",
		title: "tw:!font-bold",
	},
	success: {
		container:
			"tw:!bg-green-100 tw:!border-l-4 tw:!border-green-500 tw:!text-green-700",
		title: "tw:!font-bold",
	},
	error: {
		container:
			"tw:!bg-red-100 tw:!border-l-4 tw:!border-red-500 tw:!text-red-700",
		title: "tw:!font-bold",
	},
	info: {
		container:
			"tw:!bg-blue-100 tw:!border-l-4 tw:!border-blue-500 tw:!text-blue-700",
		title: "tw:!font-bold",
	},
};

export const Alert: React.FC<AlertProps> = ({
	type = "warning",
	title,
	children,
	className = "",
}) => (
	<div
		className={`${alertStyles[type].container} tw:!p-4 tw:!rounded ${className}`}
		role="alert"
	>
		{title && <p className={alertStyles[type].title}>{title}</p>}
		<div>{children}</div>
	</div>
);

// Animated top-right alert demo
const AlertDemo = () => {
	const [show, setShow] = React.useState(false);
	const timer = React.useRef<NodeJS.Timeout | null>(null);

	// Show alert for 3 seconds
	const handleShowAlert = () => {
		setShow(true);
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => setShow(false), 3000);
	};

	React.useEffect(() => {
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, []);

	return (
		<div className="tw:!space-y-4">
			<h2 className="tw:!text-xl tw:!font-semibold">
				Animated Alert (Top Right)
			</h2>
			<button
				className="tw:!bg-blue-500 tw:!text-white tw:!px-4 tw:!py-2 tw:!rounded tw:!hover:bg-blue-600"
				onClick={handleShowAlert}
			>
				Show Alert
			</button>
			{/* Animated Alert Overlay */}
			<div
				style={{
					position: "fixed",
					top: 24,
					right: 24,
					zIndex: 9999,
					transition: "transform 0.3s, opacity 0.3s",
					transform: show ? "translateY(0)" : "translateY(-40px)",
					opacity: show ? 1 : 0,
					pointerEvents: show ? "auto" : "none",
				}}
			>
				{show && (
					<Alert type="success" title="Success!">
						This alert will disappear after 3 seconds.
					</Alert>
				)}
			</div>
			<pre className="tw:!bg-gray-100 tw:!p-2 tw:!rounded tw:!text-xs">
				{`// Example usage
<button onClick={handleShowAlert}>Show Alert</button>
{show && (
  <div style={{ position: 'fixed', top: 24, right: 24 }}>
	<Alert type="success" title="Success!">
	  This alert will disappear after 3 seconds.
	</Alert>
  </div>
)}`}
			</pre>
		</div>
	);
};

export default AlertDemo;
