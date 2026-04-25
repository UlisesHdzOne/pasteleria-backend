


```

import { useState } from "react";

import { Grid3X3, Cake, Layers } from "lucide-react";

import BreadcrumbBack from "../components/BreadcrumbBack";

import PageHeader from "../components/PageHeader";

  

import SizeTab from "../components/cake/SizeTab";

import FlavorTab from "../components/cake/FlavorTab";

import MatrixTab from "../components/cake/MatrixTab";

  

type TabId = "matrix" | "flavors" | "sizes";

  

const tabs = [

{ id: "matrix" as const, label: "Matriz de Precios", icon: Grid3X3 },

{ id: "flavors" as const, label: "Sabores", icon: Cake },

{ id: "sizes" as const, label: "Tamaños", icon: Layers },

];

  

const CakePage = () => {

const [activeTab, setActiveTab] = useState<TabId>("sizes");

  

const renderTab = () => {

switch (activeTab) {

case "sizes":

return <SizeTab />;

case "flavors":

return <FlavorTab />;

case "matrix":

return <MatrixTab />;

default:

return null;

}

};

  

return (

<div className="max-w-6xl mx-auto px-4 py-10">

<BreadcrumbBack

label="Panel de Administración"

to="/admin"

current="pasteles"

/>

  

<PageHeader

title="Precios de Pasteles"

description=""

/>

  

<div className="bg-card rounded-2xl border border-border overflow-hidden">

{/* Tabs */}

<div className="flex border-b border-border overflow-x-auto">

{tabs.map((tab) => {

const Icon = tab.icon;

  

return (

<button

key={tab.id}

onClick={() => setActiveTab(tab.id)}

className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors whitespace-nowrap

${

activeTab === tab.id

? "text-primary border-b-2 border-primary bg-primary/5"

: "text-muted-foreground hover:text-foreground hover:bg-muted/50"

}`}

>

<Icon className="w-4 h-4" />

{tab.label}

</button>

);

})}

</div>

  

{/* Content */}

<div className="p-6">{renderTab()}</div>

</div>

</div>

);

};

  

export default CakePage;


```



```jsx
// import { Plus } from "lucide-react";

// import { useCakeSizes } from "../../hooks/cake/useCakeSizes";

// import CakeSizeFormModal from "./modal/CakeSizeFormModal";

// import type {

// CakeSize,

// CreateCakeSizeDto,

// } from "../../services/cakeSize/types";

// import { useState } from "react";

// import { useToast } from "../../context/toast/useToast";

// import SizeEmptyState from "./SizeEmptyState";

// import SizeList from "./SizeList";

  

// const SizeTab = () => {

// const { sizes, loading, addSize, editSize, fetchSizes, removeSize } =

// useCakeSizes();

  
  

// const { showToast } = useToast();

  

// const [isModalOpen, setIsModalOpen] = useState(false);

// const [cakeSizeToEdit, setCakeSizeToEdit] = useState<CakeSize | null>(null);

  

// const submitCakeSize = async (data: CreateCakeSizeDto) => {

// let result;

  

// if (cakeSizeToEdit) {

// result = await editSize(cakeSizeToEdit.id, data);

// } else {

// result = await addSize(data);

// }

  

// if (!result.success) {

// showToast(

// result.error ||

// (cakeSizeToEdit

// ? "Error al actualizar tamaño"

// : "Error al crear tamaño"),

// "error",

// );

// return false;

// }

  

// showToast(

// cakeSizeToEdit

// ? "Tamaño actualizado correctamente"

// : "Tamaño creado correctamente",

// "success",

// );

  

// setIsModalOpen(false);

// setCakeSizeToEdit(null);

  

// // Refresca la lista desde el servidor

// fetchSizes();

  

// return true;

// };

  

// const handleDelete = async (size: CakeSize) => {

// try {

// const result = await removeSize(size.id);

  

// if (result.success) {

// showToast("Tamaño eliminado correctamente", "success");

// } else {

// showToast(result.error || "Error al eliminar el tamaño", "error");

// }

// } catch (err) {

// console.error(err);

// showToast("Error al eliminar el tamaño", "error");

// }

// };

  

// if (loading) {

// return <p className="text-sm text-muted-foreground">Cargando tamaños...</p>;

// }

  

// return (

// <div className="space-y-6">

// <div className="flex items-center justify-between">

// <div>

// <h3 className="text-lg font-semibold text-foreground">

// Tamaños de Pasteles

// </h3>

// <p className="text-sm text-muted-foreground">

// Administra los tamaños disponibles

// </p>

// </div>

  

// <button

// onClick={() => setIsModalOpen(true)}

// className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"

// >

// <Plus className="w-4 h-4" />

// Nuevo Tamaño

// </button>

// </div>

  

// {sizes.length === 0 && <SizeEmptyState />}

  

// {sizes.length > 0 && (

// <SizeList

// sizes={sizes}

// onEdit={(size) => {

// setCakeSizeToEdit(size);

// setIsModalOpen(true);

// }}

// onDelete={handleDelete}

// />

// )}

  

// <CakeSizeFormModal

// isOpen={isModalOpen}

// onClose={() => {

// setIsModalOpen(false);

// setCakeSizeToEdit(null);

// }}

// onSave={submitCakeSize}

// cakeSizeToEdit={cakeSizeToEdit}

// />

// </div>

// );

// };

  

// export default SizeTab;

  
  
  
  

const SizeTab = () => {

return (

<div>SizeTab</div>

)

}

  

export default SizeTab
```



```jsx
import { Users, Pencil, Trash2 } from "lucide-react";

  

type SizeCardProps = {

size: {

id: string;

name: string;

people: number;

description?: string | null;

};

onEdit?: (size: any) => void;

onDelete?: (size: any) => void;

};

  

const SizeCard = ({ size, onEdit, onDelete }: SizeCardProps) => {

return (

<div className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-200">

{/* Icon */}

<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">

<Users className="w-5 h-5 text-primary" />

</div>

  

{/* Content */}

<div className="flex-1 min-w-0">

<div className="flex items-center gap-2">

<h3 className="font-semibold text-foreground truncate">

{size.name}

</h3>

  

<span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">

{size.people} porciones

</span>

</div>

  

{size.description && (

<p className="text-sm text-muted-foreground truncate">

{size.description}

</p>

)}

</div>

  

{/* Actions */}

<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">

<button

onClick={() => onEdit?.(size)}

className="p-2 rounded-lg hover:bg-muted transition"

>

<Pencil className="w-4 h-4 text-muted-foreground" />

</button>

  

<button

onClick={() => onDelete?.(size)}

className="p-2 rounded-lg hover:bg-destructive/10 transition"

>

<Trash2 className="w-4 h-4 text-destructive" />

</button>

</div>

</div>

);

};

  

export default SizeCard;
```