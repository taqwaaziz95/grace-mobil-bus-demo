import React, { useEffect, useState } from "react";
import "./BookingModal.css";
import { useRouter } from "next/navigation";
import moment from "moment";

interface TopupModalProps {
  onClose: () => void;
  onTopupConfirm: (amount: number) => void;
}


const TopupModal: React.FC<TopupModalProps> = ({ onClose, onTopupConfirm }) => {

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const amounts = [50000, 100000, 150000, 200000, 300000];

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="">
          {/* Header */}
          <h3 className="tw:!text-xl tw:!font-bold tw:!mb-4 tw:!text-center">
            Topup Wallet
          </h3>

          {/* Amount Options */}
          <div className="tw:!grid tw:!grid-cols-2 tw:!gap-4 tw:!mb-6">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`tw:!w-full tw:!py-3 tw:!rounded-lg tw:!border tw:!font-semibold tw:!transition-all ${selectedAmount === amount
                  ? "tw:!border-[#2A9FD6] tw:!bg-[#EAF6FB] tw:!text-[#2A9FD6]"
                  : "tw:!border-gray-300 hover:tw:!bg-gray-50"
                  }`}
              >
                Rp{amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="tw:!flex tw:!justify-between tw:!items-center">
            <button
              onClick={onClose}
              className="tw:!px-5 tw:!py-2 tw:!bg-gray-200 hover:tw:!bg-gray-300 tw:!rounded-lg tw:!font-medium"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                if (selectedAmount) onTopupConfirm(selectedAmount);
                onClose()
              }}
              disabled={!selectedAmount}
              className={`tw:!px-6 tw:!py-2 tw:!rounded-lg tw:!font-semibold tw:!transition-all ${selectedAmount
                ? "tw:!bg-[#2A9FD6] tw:!text-white hover:tw:!bg-[#238bbd]"
                : "tw:!bg-gray-300 tw:!text-gray-500 tw:!cursor-not-allowed"
                }`}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopupModal;
