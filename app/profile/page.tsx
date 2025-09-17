"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import JumbotronHeader from "@/components/jumbotron-header";
import { withBasePath } from "@/lib/basePath";
import { H3, H4, H6, P } from "@/components/typography";
import Link from "next/link";
import CustomHeaders from "@/components/custom-headers";
import Button from "@/components/button";
import { ToggleRow } from "@/components/toggle";

// ---------------- Types ----------------
type Gender = "male" | "female" | "other" | "";
type TabKey = "profile" | "security" | "notifications";

interface ProfileData {
	avatarUrl: string | null;
	name: string;
	email: string; // read-only (usually)
	phone: string;
	gender: Gender;
	dob: string; // yyyy-mm-dd
	address: string;
	city: string;
	country: string;
}

interface SecurityData {
	currentPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}

interface NotificationPrefs {
	tripUpdates: boolean;
	promotions: boolean;
	billing: boolean;
	securityAlerts: boolean;
}

// ---------------- Dummy current user ----------------
const initialProfile: ProfileData = {
	avatarUrl: withBasePath("/assets/imgs/template/avatars/avatar-1.png"),
	name: "Grace Customer",
	email: "grace@example.com",
	phone: "+62 812-3456-7890",
	gender: "female",
	dob: "1994-07-20",
	address: "Jl. Boulevard Gading Serpong",
	city: "Tangerang",
	country: "Indonesia",
};

const initialNotifications: NotificationPrefs = {
	tripUpdates: true,
	promotions: false,
	billing: true,
	securityAlerts: true,
};

// ---------------- Helpers ----------------
const cls = (...tokens: Array<string | false | null | undefined>) =>
	tokens.filter(Boolean).join(" ");

const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
const phoneDigits = (v: string) => v.replace(/[^\d+]/g, "");

// ---------------- Page ----------------
export default function ProfilePage() {
	const [tab, setTab] = useState<TabKey>("profile");

	// profile form state
	const [profile, setProfile] = useState<ProfileData>(initialProfile);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(
		initialProfile.avatarUrl
	);

	// security form state
	const [sec, setSec] = useState<SecurityData>({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	// notification prefs
	const [prefs, setPrefs] = useState<NotificationPrefs>(initialNotifications);

	// UI banners
	const [banner, setBanner] = useState<{
		type: "success" | "error";
		msg: string;
	} | null>(null);

	// dirty tracking
	const dirtyProfile = useMemo(() => {
		const changed =
			profile.name !== initialProfile.name ||
			profile.phone !== initialProfile.phone ||
			profile.gender !== initialProfile.gender ||
			profile.dob !== initialProfile.dob ||
			profile.address !== initialProfile.address ||
			profile.city !== initialProfile.city ||
			profile.country !== initialProfile.country ||
			avatarFile !== null;
		return changed;
	}, [profile, avatarFile]);

	const dirtySecurity = useMemo(
		() => !!(sec.currentPassword || sec.newPassword || sec.confirmNewPassword),
		[sec]
	);

	const dirtyPrefs = useMemo(
		() => JSON.stringify(prefs) !== JSON.stringify(initialNotifications),
		[prefs]
	);

	const anyDirty = dirtyProfile || dirtySecurity || dirtyPrefs;

	// avatar preview cleanup
	useEffect(() => {
		if (!avatarFile) return;
		const url = URL.createObjectURL(avatarFile);
		setAvatarPreview(url);
		return () => URL.revokeObjectURL(url);
	}, [avatarFile]);

	// ---------------- Save handlers (stubbed) ----------------
	const saveProfile = async () => {
		// basic validation
		if (!profile.name.trim()) {
			setBanner({ type: "error", msg: "Nama tidak boleh kosong." });
			return;
		}
		if (!isEmail(profile.email)) {
			setBanner({ type: "error", msg: "Email tidak valid." });
			return;
		}
		// pretend upload + save
		await new Promise((r) => setTimeout(r, 700));
		setBanner({ type: "success", msg: "Profil berhasil disimpan." });
		// “commit” local initial data
		if (avatarFile) {
			// In real app, get returned URL from backend
			(initialProfile as any).avatarUrl = avatarPreview;
			setAvatarFile(null);
		}
		Object.assign(initialProfile, profile);
	};

	const saveSecurity = async () => {
		if (!sec.currentPassword || !sec.newPassword || !sec.confirmNewPassword) {
			setBanner({ type: "error", msg: "Lengkapi semua kolom kata sandi." });
			return;
		}
		if (sec.newPassword.length < 8) {
			setBanner({ type: "error", msg: "Kata sandi baru minimal 8 karakter." });
			return;
		}
		if (sec.newPassword !== sec.confirmNewPassword) {
			setBanner({ type: "error", msg: "Konfirmasi kata sandi tidak cocok." });
			return;
		}
		await new Promise((r) => setTimeout(r, 700));
		setBanner({ type: "success", msg: "Kata sandi berhasil diperbarui." });
		setSec({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
	};

	const savePrefs = async () => {
		await new Promise((r) => setTimeout(r, 500));
		setBanner({ type: "success", msg: "Preferensi notifikasi disimpan." });
		Object.assign(initialNotifications, prefs);
	};

	const discardAll = () => {
		setProfile(initialProfile);
		setPrefs(initialNotifications);
		setSec({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
		setAvatarFile(null);
		setAvatarPreview(initialProfile.avatarUrl);
		setBanner(null);
	};

	return (
		<Layout footerStyle={1}>
			{/* <JumbotronHeader
				title="Profil"
				subtitle="Kelola informasi akun Anda"
				bannerImg={"/assets/imgs/page-header/banner.png"}
				breadcrumbs={[
					{ label: "Home", href: "/", isActive: false },
					{ label: "Profil", href: "/profile", isActive: true },
				]}
			/> */}

			<CustomHeaders
				title="Profile"
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Profil", href: "/profile" },
				]}
			/>

			<div className="tw:!bg-white">
				<div className="tw:!container tw:!mx-auto tw:!px-4 tw:!py-8">
					<div className="tw:!mx-auto tw:!w-full tw:!max-w-3xl">
						{/* Tabs */}
						<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-2 tw:!mb-4">
							<SegmentedTabs
								active={["profile", "security", "notifications"].indexOf(tab)}
								setActive={(i) =>
									setTab(
										(["profile", "security", "notifications"][i] ??
											"profile") as TabKey
									)
								}
								tabs={["Profil", "Keamanan", "Notifikasi"]}
							/>
						</div>

						{/* Banner */}
						{banner && (
							<div
								className={cls(
									"tw:!mb-4 tw:!rounded-xl tw:!border tw:!p-3",
									banner.type === "success"
										? "tw:!bg-green-50 tw:!border-green-200 tw:!text-green-800"
										: "tw:!bg-red-50 tw:!border-red-200 tw:!text-red-800"
								)}
							>
								{banner.msg}
							</div>
						)}

						{/* PROFILE TAB */}
						{tab === "profile" && (
							<div className="tw:!space-y-4">
								<Card>
									<H3 className="tw:!text-lg">Informasi Dasar</H3>
									<P className="tw:!text-sm tw:!text-gray-500 tw:!mb-4">
										Sesuaikan nama tampilan, avatar, dan kontak Anda.
									</P>

									<div className="tw:!flex tw:!items-start tw:!gap-4 tw:!mb-4">
										<AvatarUploader
											previewUrl={avatarPreview}
											onFileSelected={setAvatarFile}
											onClear={() => {
												setAvatarFile(null);
												setAvatarPreview(initialProfile.avatarUrl);
											}}
										/>

										<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-2 tw:!gap-3 tw:!flex-1">
											<Field label="Nama Lengkap">
												<TextInput
													value={profile.name}
													onChange={(v) => setProfile({ ...profile, name: v })}
													placeholder="Nama Anda"
												/>
											</Field>

											<Field label="Email" hint="Email tidak dapat diubah">
												<TextInput value={profile.email} readOnly />
											</Field>

											<Field label="Nomor Telepon">
												<TextInput
													value={profile.phone}
													onChange={(v) =>
														setProfile({ ...profile, phone: phoneDigits(v) })
													}
													placeholder="+62 ..."
												/>
											</Field>

											<Field label="Jenis Kelamin">
												<SelectInput
													value={profile.gender}
													onChange={(v) =>
														setProfile({ ...profile, gender: v as Gender })
													}
													options={[
														{ label: "Pilih", value: "" },
														{ label: "Perempuan", value: "female" },
														{ label: "Laki-laki", value: "male" },
														{ label: "Lainnya", value: "other" },
													]}
												/>
											</Field>

											<Field label="Tanggal Lahir">
												<TextInput
													type="date"
													value={profile.dob}
													onChange={(v) => setProfile({ ...profile, dob: v })}
												/>
											</Field>
										</div>
									</div>

									<Divider />

									<H6 className="tw:!mb-2">Alamat</H6>
									<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-2 tw:!gap-3">
										<Field label="Alamat">
											<TextArea
												rows={3}
												value={profile.address}
												onChange={(v) => setProfile({ ...profile, address: v })}
												placeholder="Nama jalan, RT/RW, dsb."
											/>
										</Field>
										<div className="tw:!grid tw:!grid-cols-2 tw:!gap-3">
											<Field label="Kota">
												<TextInput
													value={profile.city}
													onChange={(v) => setProfile({ ...profile, city: v })}
												/>
											</Field>
											<Field label="Negara">
												<TextInput
													value={profile.country}
													onChange={(v) =>
														setProfile({ ...profile, country: v })
													}
												/>
											</Field>
										</div>
									</div>

									<div className="tw:!flex tw:!justify-end tw:!gap-2 tw:!mt-4">
										<Button
											variant="secondary"
											onClick={discardAll}
											disabled={!dirtyProfile}
										>
											Batalkan
										</Button>
										<Button
											onClick={saveProfile}
											disabled={!dirtyProfile}
											variant="secondary"
										>
											Simpan Perubahan
										</Button>
									</div>
								</Card>

								{/* <Card>
									<H4 className="tw:!mb-2">Akun Terkait</H4>
									<P className="tw:!text-sm tw:!text-gray-500 tw:!mb-3">
										Kelola login sosial yang terhubung.
									</P>
									<div className="tw:!flex tw:!flex-wrap tw:!gap-2">
										<SocialChip provider="Google" connected />
										<SocialChip provider="Apple" />
									</div>
								</Card> */}
							</div>
						)}

						{/* SECURITY TAB */}
						{tab === "security" && (
							<div className="tw:!space-y-4">
								<Card>
									<H3 className="tw:!text-lg">Kata Sandi</H3>
									<P className="tw:!text-sm tw:!text-gray-500 tw:!mb-4">
										Perbarui kata sandi untuk keamanan akun Anda.
									</P>
									<div className="tw:!grid tw:!grid-cols-1 md:tw:!grid-cols-2 tw:!gap-3">
										<Field label="Kata Sandi Saat Ini">
											<TextInput
												type="password"
												value={sec.currentPassword}
												onChange={(v) => setSec({ ...sec, currentPassword: v })}
												placeholder="••••••••"
											/>
										</Field>
										<Field label="Kata Sandi Baru">
											<TextInput
												type="password"
												value={sec.newPassword}
												onChange={(v) => setSec({ ...sec, newPassword: v })}
												placeholder="Minimal 8 karakter"
											/>
										</Field>
										<Field label="Konfirmasi Kata Sandi Baru">
											<TextInput
												type="password"
												value={sec.confirmNewPassword}
												onChange={(v) =>
													setSec({ ...sec, confirmNewPassword: v })
												}
												placeholder="Ulangi kata sandi baru"
											/>
										</Field>
									</div>
									<div className="tw:!flex tw:!justify-end tw:!gap-2 tw:!mt-4">
										<Button
											variant="secondary"
											onClick={discardAll}
											disabled={!dirtySecurity}
										>
											Batalkan
										</Button>
										<Button
											onClick={saveSecurity}
											disabled={!dirtySecurity}
											variant="secondary"
										>
											Simpan
										</Button>
									</div>
								</Card>

								<Card>
									<H4 className="tw:!mb-2">Nonaktifkan Akun</H4>
									<P className="tw:!text-sm tw:!text-gray-500 tw:!mb-3">
										Nonaktifkan akun Anda secara permanen.
									</P>
									<Button variant="danger" disabled>
										Nonaktifkan Akun (Hubungi CS)
									</Button>
								</Card>
							</div>
						)}

						{/* NOTIFICATIONS TAB */}
						{tab === "notifications" && (
							<div className="tw:!space-y-4">
								<Card>
									<H3 className="tw:!text-lg">Notifikasi</H3>
									<P className="tw:!text-sm tw:!text-gray-500 tw:!mb-4">
										Atur preferensi pemberitahuan yang ingin Anda terima.
									</P>

									<div className="tw:!space-y-2">
										<ToggleRow
											title="Update Perjalanan"
											desc="Perubahan jadwal, pengingat sebelum keberangkatan."
											checked={prefs.tripUpdates}
											onChange={(v) => setPrefs({ ...prefs, tripUpdates: v })}
										/>
										<ToggleRow
											title="Promo & Penawaran"
											desc="Diskon & promo terbaru."
											checked={prefs.promotions}
											onChange={(v) => setPrefs({ ...prefs, promotions: v })}
										/>
										<ToggleRow
											title="Tagihan & Pembayaran"
											desc="Kuitansi, pengingat pembayaran, dan info penagihan."
											checked={prefs.billing}
											onChange={(v) => setPrefs({ ...prefs, billing: v })}
										/>
										<ToggleRow
											title="Keamanan"
											desc="Peringatan login & aktivitas mencurigakan."
											checked={prefs.securityAlerts}
											onChange={(v) =>
												setPrefs({ ...prefs, securityAlerts: v })
											}
										/>
									</div>

									<div className="tw:!flex tw:!justify-end tw:!gap-2 tw:!mt-4">
										<Button
											variant="secondary"
											onClick={discardAll}
											disabled={!dirtyPrefs}
										>
											Batalkan
										</Button>
										<Button
											onClick={savePrefs}
											disabled={!dirtyPrefs}
											variant="danger"
										>
											Simpan Preferensi
										</Button>
									</div>
								</Card>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Sticky dirty bar */}
			{anyDirty && (
				<div className="tw:!fixed tw:!bottom-4 tw:!left-0 tw:!right-0 tw:!z-50">
					<div className="tw:!mx-auto tw:!max-w-3xl tw:!bg-white tw:!border tw:!border-gray-200 tw:!shadow-lg tw:!rounded-2xl tw:!p-3 tw:!flex tw:!items-center tw:!gap-3">
						<span className="tw:!text-sm tw:!text-gray-700">
							Anda memiliki perubahan yang belum disimpan.
						</span>
						<div className="tw:!ml-auto tw:!flex tw:!gap-2">
							<Button variant="secondary" onClick={discardAll}>
								Buang
							</Button>
							<Button
								onClick={() => {
									if (tab === "profile" && dirtyProfile) saveProfile();
									if (tab === "security" && dirtySecurity) saveSecurity();
									if (tab === "notifications" && dirtyPrefs) savePrefs();
								}}
								variant="success"
							>
								Simpan
							</Button>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
}

// ---------------- Small UI bits ----------------
function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className="tw:!bg-white tw:!rounded-2xl tw:!border tw:!border-gray-200 tw:!shadow-sm tw:!p-4 md:tw:!p-5">
			{children}
		</div>
	);
}

function Divider() {
	return <div className="tw:!h-px tw:!bg-gray-200 tw:!my-4" />;
}

function Field({
	label,
	hint,
	children,
}: {
	label: string;
	hint?: string;
	children: React.ReactNode;
}) {
	return (
		<label className="tw:!block">
			<P className="tw:!text-[12px] tw:!text-gray-600 tw:!mb-1">{label}</P>
			{children}
			{hint && <P className="tw:!text-xs tw:!text-gray-400 tw:!mt-1">{hint}</P>}
		</label>
	);
}

function TextInput({
	value,
	onChange,
	placeholder,
	type = "text",
	readOnly,
}: {
	value: string;
	onChange?: (v: string) => void;
	placeholder?: string;
	type?: string;
	readOnly?: boolean;
}) {
	return (
		<input
			type={type}
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
			placeholder={placeholder}
			readOnly={readOnly}
			className={cls(
				"tw:!w-full tw:!px-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent",
				readOnly && "tw:!bg-gray-50 tw:!text-gray-500"
			)}
		/>
	);
}

function TextArea({
	value,
	onChange,
	placeholder,
	rows = 3,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	rows?: number;
}) {
	return (
		<textarea
			value={value}
			onChange={(e) => onChange(e.target.value)}
			rows={rows}
			placeholder={placeholder}
			className="tw:!w-full tw:!px-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent"
		/>
	);
}

function SelectInput({
	value,
	onChange,
	options,
}: {
	value: string;
	onChange: (v: string) => void;
	options: Array<{ label: string; value: string }>;
}) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="tw:!w-full tw:!px-3 tw:!py-2.5 tw:!rounded-xl tw:!border tw:!border-gray-300 focus:tw:!ring-2 focus:tw:!ring-primary-600 focus:tw:!border-transparent"
		>
			{options.map((o) => (
				<option key={o.value} value={o.value}>
					{o.label}
				</option>
			))}
		</select>
	);
}

// function Button({
// 	children,
// 	variant = "primary",
// 	onClick,
// 	disabled,
// }: {
// 	children: React.ReactNode;
// 	variant?: "primary" | "secondary" | "danger";
// 	onClick?: () => void;
// 	disabled?: boolean;
// }) {
// 	const styles =
// 		variant === "primary"
// 			? "tw:!bg-primary-600 tw:!text-white hover:tw:!bg-primary-700"
// 			: variant === "secondary"
// 				? "tw:!bg-white tw:!border tw:!border-gray-300 tw:!text-gray-700 hover:tw:!bg-gray-50"
// 				: "tw:!bg-red-600 tw:!text-white hover:tw:!bg-red-700";

// 	return (
// 		<button
// 			onClick={onClick}
// 			disabled={disabled}
// 			className={cls(
// 				"tw:!px-4 tw:!py-2.5 tw:!rounded-xl tw:!text-sm tw:!font-medium tw:!transition",
// 				styles,
// 				disabled && "tw:!opacity-60 tw:!cursor-not-allowed"
// 			)}
// 			type="button"
// 		>
// 			{children}
// 		</button>
// 	);
// }

const SegmentedTabs = ({
	active,
	setActive,
	tabs,
}: {
	active: number;
	setActive: (i: number) => void;
	tabs: string[];
}) => (
	<div className="tw:!w-full tw:!bg-gray-100 tw:!rounded-xl tw:!p-1 tw:!flex tw:!gap-1">
		{tabs.map((t, i) => {
			const isActive = active === i;
			return (
				<button
					key={t}
					onClick={() => setActive(i)}
					className={cls(
						"tw:!flex-1 tw:!py-2 tw:!text-sm tw:!rounded-lg tw:!transition tw:!font-medium",
						isActive
							? "tw:!bg-white tw:!shadow tw:!text-primary-600"
							: "tw:!text-gray-600 hover:tw:!text-gray-800"
					)}
				>
					{t}
				</button>
			);
		})}
	</div>
);

// Avatar uploader
function AvatarUploader({
	previewUrl,
	onFileSelected,
	onClear,
	maxSizeMb = 3,
}: {
	previewUrl: string | null;
	onFileSelected: (file: File | null) => void;
	onClear: () => void;
	maxSizeMb?: number;
}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string | null>(null);
	const onPick = (f: File | null) => {
		if (!f) return;
		if (!f.type.startsWith("image/")) {
			setError("File harus berupa gambar.");
			return;
		}
		if (f.size > maxSizeMb * 1024 * 1024) {
			setError(`Ukuran maksimal ${maxSizeMb}MB.`);
			return;
		}
		setError(null);
		onFileSelected(f);
	};

	const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		const f = e.dataTransfer.files?.[0];
		if (f) onPick(f);
	};

	return (
		<div className="tw:!w-[120px]">
			<div
				className="tw:!w-[96px] tw:!h-[96px] tw:!rounded-full tw:!overflow-hidden tw:!border tw:!border-gray-200 tw:!bg-gray-50 tw:!mx-auto tw:!mb-2 tw:!grid tw:!place-items-center"
				onDragOver={(e) => e.preventDefault()}
				onDrop={onDrop}
			>
				{previewUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={previewUrl}
						alt="Avatar"
						className="tw:!w-full tw:!h-full tw:!object-cover"
					/>
				) : (
					<span className="tw:!text-2xl">👤</span>
				)}
			</div>

			<div className="tw:!flex tw:!gap-2 tw:!justify-center">
				<button
					className="tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm hover:tw:!bg-gray-50"
					onClick={() => inputRef.current?.click()}
					type="button"
				>
					Ubah
				</button>
				<button
					className="tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!border tw:!border-gray-300 tw:!text-sm tw:!text-gray-700 hover:tw:!bg-gray-50"
					onClick={onClear}
					type="button"
				>
					Hapus
				</button>
			</div>

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				className="tw:!hidden"
				onChange={(e) => onPick(e.target.files?.[0] ?? null)}
			/>
			{error && (
				<P className="tw:!text-xs tw:!text-red-600 tw:!mt-1">{error}</P>
			)}

			<P className="tw:!text-[11px] tw:!text-gray-400 tw:!mt-2 tw:!text-center">
				Tarik & lepas gambar ke avatar.
			</P>
		</div>
	);
}

// Toggle row

function SocialChip({
	provider,
	connected = false,
}: {
	provider: "Google" | "Apple";
	connected?: boolean;
}) {
	return (
		<div
			className={cls(
				"tw:!inline-flex tw:!items-center tw:!gap-2 tw:!px-3 tw:!py-1.5 tw:!rounded-lg tw:!border tw:!text-sm",
				connected
					? "tw:!bg-green-50 tw:!border-green-200 tw:!text-green-700"
					: "tw:!bg-white tw:!border-gray-200 tw:!text-gray-700"
			)}
		>
			<span>{provider}</span>
			<span
				className={cls(
					"tw:!text-xs",
					connected ? "tw:!text-green-700" : "tw:!text-gray-500"
				)}
			>
				{connected ? "Terhubung" : "Tidak terhubung"}
			</span>
			<Link href="#" className="tw:!text-primary-600 hover:tw:!underline">
				{connected ? "Putuskan" : "Hubungkan"}
			</Link>
		</div>
	);
}
