import Layout from "../components/layout/Layout";
import App from "../components/sections/App";
import Banners from "../components/sections/Banners";
import Blog1 from "../components/sections/Blog1";
import Brand1 from "../components/sections/Brand1";
import CarReview1 from "../components/sections/CarReview1";
import CarsListing1 from "../components/sections/CarsListing1";
import CarsListing2 from "../components/sections/CarsListing2";
import Categories1 from "../components/sections/Categories1";
import Cta1 from "../components/sections/Cta1";
import Cta2 from "../components/sections/Cta2";
import Cta3 from "../components/sections/Cta3";
import Hero1 from "../components/sections/Hero1";
import Hero2 from "../components/sections/Hero2";
import Hero3 from "../components/sections/Hero3";
import Search1 from "../components/sections/Search1";
import Services1 from "../components/sections/Services1";
import Testimonials from "../components/sections/Testimonials";
import WhyUs1 from "../components/sections/WhyUs1";
import { Star, PhoneCall, Car, Shield, FileText } from "lucide-react";

const features = [
  {
    icon: <Star size={24} />, // Use Lucide React icons
    title: "Jaminan Kenyamanan",
    description:
      "Kami memberikan kenyamanan terbaik bagi pengguna layanan transportasi sesuai standar pemerintah.",
  },
  {
    icon: <PhoneCall size={24} />,
    title: "Customer Service 24/7",
    description:
      "Pelayanan pelanggan 24 jam dengan layanan ramah dan responsif.",
  },
  {
    icon: <Car size={24} />,
    title: "Unit Pengganti",
    description:
      "Jika unit mengalami kendala, kami menyediakan unit pengganti sesuai pesanan awal.",
  },
  {
    icon: <Shield size={24} />,
    title: "Asuransi",
    description:
      "Kami menjamin keamanan dengan perlindungan asuransi jika terjadi kecelakaan.",
  },
  {
    icon: <FileText size={24} />,
    title: "Kelengkapan Surat Kendaraan",
    description:
      "Setiap kendaraan memiliki dokumen resmi dan pajak yang tertib sesuai regulasi.",
  },
];

function MengapaKami() {
  return (
    <div className="tw:!container tw:!mx-auto tw:!py-16 tw:!text-center tw:!bg-gradient-to-b tw:!from-white tw:!to-gray-100">
      <h2 className="tw:!text-4xl tw:!font-extrabold tw:!mb-12 tw:!text-gray-800">
        Mengapa Kami Adalah{" "}
        <span className="tw:!text-blue-600">Pilihan yang Tepat?</span>
      </h2>

      <div className="tw:!flex tw:!flex-wrap tw:!justify-center tw:!gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="tw:!bg-white tw:!shadow-lg tw:!py-8 tw:!px-6 tw:!rounded-3xl tw:!text-left tw:!flex tw:!items-center tw:!gap-6 tw:!transition-all tw:!duration-300 hover:tw:!shadow-2xl hover:tw:!scale-105 tw:!basis-full sm:tw:!basis-[45%] md:tw:!basis-[30%] tw:!max-w-[360px]"
          >
            <div className="tw:!bg-blue-500 tw:!text-white tw:!p-4 tw:!rounded-2xl tw:!flex tw:!items-center tw:!justify-center tw:!w-14 tw:!h-14">
              {feature.icon}
            </div>
            <div>
              <h3 className="tw:!font-semibold tw:!text-xl tw:!mb-2 tw:!text-gray-800">
                {feature.title}
              </h3>
              <p className="tw:!text-gray-600 tw:!text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerTestimonial() {
  return (
    <section className="tw:!bg-white tw:!py-10 tw:!px-4">
      <div className="tw:!max-w-6xl tw:!mx-auto tw:!grid tw:!grid-cols-2 md:tw:!grid-cols-2 tw:!gap-8 tw:!items-center">
        {/* Left: Video */}
        <div className="tw:!rounded-2xl tw:!overflow-hidden tw:!shadow-md tw:!relative tw:!w-full tw:!aspect-video">
          <video
            src="/videos/jirayut.mp4"
            controls
            className="tw:!w-full tw:!h-full tw:!object-cover"
          />
        </div>

        {/* Right: Text */}
        <div className="tw:!text-left">
          <h2 className="tw:!text-3xl tw:!font-bold tw:!text-gray-900 tw:!mb-4">
            Ulasan Nyata{" "}
            <span className="tw:!text-sky-500">Pelanggan Kami</span>
          </h2>
          <p className="tw:!text-gray-700 tw:!text-base tw:!leading-relaxed">
            Orang nya keren, mobil nya bersih, bisa nyanyi ada karaoke juga.
            Pokoknya keren, terima kasih Grace Trans udah menemani dan libur
            bareng Jirayut. Kalau nanti ada waktu lagi kita jalan bareng lagi
            ya, terima kasih.
          </p>
          <div className="tw:!mt-5">
            <p className="tw:!text-sky-500 tw:!font-medium tw:!text-lg">
              Jirayut Afsan Jehdueramae
            </p>
            <p className="tw:!text-gray-500 tw:!text-sm">
              Penyanyi, Presenter, dan Aktor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Layout headerStyle={3} footerStyle={1}>
        <Hero3 />
        <MengapaKami />
        <CustomerTestimonial />
        {/* <Search1 />
				<Brand1 />
				<CarsListing1 />
				<Cta1 />
				<Categories1 />
				<WhyUs1 />
				<Cta2 />
				<CarsListing2 />
				<Cta3 />
				<Services1 />
				<Banners />
				<Testimonials />
				<CarReview1 />
				<Blog1 />
				<App /> */}
      </Layout>
    </>
  );
}
