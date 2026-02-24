import { useState, useRef } from "react";
import { Calendar, Phone, User, Trash2, Edit3 } from "lucide-react";
import type { Customer } from "../../context/customer/types";

type Direction = "left" | "right" | null;

type CustomerItemProps = {
  customer: Customer;
  openId: string | null;
  openDirection: Direction;
  setOpen: (id: string | null, direction: Direction) => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
};

const MAX = 120;
const THRESHOLD = 80;

const CustomerItem = ({
  customer,
  openId,
  openDirection,
  setOpen,
  onEdit,
  onDelete,
}: CustomerItemProps) => {
  const isOpen = openId === customer.id;

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const baseTranslate = isOpen
    ? openDirection === "left"
      ? -MAX
      : MAX
    : 0;

  const handleStart = (x: number) => {
    setDragging(true);
    startX.current = x - baseTranslate;
  };

  const handleMove = (x: number) => {
    if (!dragging) return;
    const delta = x - startX.current;
    setDragX(Math.max(-MAX, Math.min(MAX, delta)));
  };

  const handleEnd = () => {
    if (!dragging) return;
    setDragging(false);

    if (dragX <= -THRESHOLD) {
      setOpen(customer.id, "left");
    } else if (dragX >= THRESHOLD) {
      setOpen(customer.id, "right");
    } else {
      setOpen(null, null);
    }

    setDragX(0);
  };

  const translate = dragging ? dragX : baseTranslate;

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Editar */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <button
          onClick={() => onEdit?.(customer)}
          className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center text-white"
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </div>

      {/* Eliminar */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <button
          onClick={() => onDelete?.(customer)}
          className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center text-white"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Card */}
      <div
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        className="bg-white p-5 rounded-xl shadow-sm border relative z-10"
        style={{
          transform: `translateX(${translate}px)`,
          transition: dragging ? "none" : "transform 0.25s ease",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">
              {customer.firstName} {customer.lastName}
            </h3>

            <div className="flex gap-4 mt-1 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {customer.phone}
              </div>

              {customer.createdAt && (
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(customer.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerItem;