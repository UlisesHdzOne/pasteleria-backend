import { useState } from "react";
import type { Customer } from "../../context/customer/types";
import CustomerItem from "./CustomerItem";

type Direction = "left" | "right" | null;

type CustomerListPageProps = {
  customers: Customer[];
};

const CustomerListPage = ({ customers }: CustomerListPageProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openDirection, setOpenDirection] = useState<Direction>(null);

  const handleSetOpen = (id: string | null, direction: Direction) => {
    setOpenId(id);
    setOpenDirection(direction);
  };

  return (
    <div className="bg-slate-600 p-4 flex flex-col gap-3">
      {customers.map((customer) => (
        <CustomerItem
          key={customer.id}
          customer={customer}
          openId={openId}
          openDirection={openDirection}
          setOpen={handleSetOpen}
        />
      ))}
    </div>
  );
};

export default CustomerListPage;