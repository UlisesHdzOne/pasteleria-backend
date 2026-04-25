sin usememo y callback
``
```jsx
import { useState } from "react";

import type { VehicleInput } from "../types/vehicle";

import type { NormalizedErrors } from "../normalizeError";

import { validateVehicleField } from "../validations/vehicle.field";

import { validateVehicleOnSubmit } from "../validations/vehicle.submit";

  

export function useVehicleForm(

onSave: (vehicle: VehicleInput) => Promise<boolean>,

onClose: () => void,

externalErrors?: NormalizedErrors

) {

const [name, setName] = useState("");

const [driven, setDriven] = useState("");

const [errors, setErrors] = useState<NormalizedErrors>({});

const [touched, setTouched] = useState({ name: false, driven: false });

const [isSubmitting, setIsSubmitting] = useState(false);

const [hasUserEdited, setHasUserEdited] = useState(false);

  

const handleNameChange = (value: string) => {

setName(value);

if (externalErrors?.name) setHasUserEdited(true);

  

if (touched.name) {

setErrors((p) => ({

...p,

name: validateVehicleField("name", value),

}));

}

};

  

const handleDrivenChange = (value: string) => {

setDriven(value);

if (externalErrors?.driven) setHasUserEdited(true);

  

if (touched.driven) {

setErrors((p) => ({

...p,

driven: validateVehicleField("driven", value),

}));

}

};

  

const handleNameBlur = () => {

setTouched((p) => ({ ...p, name: true }));

setErrors((p) => ({

...p,

name: validateVehicleField("name", name),

}));

};

  

const handleDrivenBlur = () => {

setTouched((p) => ({ ...p, driven: true }));

setErrors((p) => ({

...p,

driven: validateVehicleField("driven", driven),

}));

};

  

const handleSubmit = async (e: React.FormEvent) => {

e.preventDefault();

setTouched({ name: true, driven: true });

  

const payload: VehicleInput = {

name,

driven: driven ? { name: driven } : undefined,

};

  

const submitErrors = validateVehicleOnSubmit(payload);

if (Object.keys(submitErrors).length) {

setErrors(submitErrors as NormalizedErrors);

return;

}

  

setIsSubmitting(true);

try {

const success = await onSave(payload);

if (success) onClose();

} finally {

setIsSubmitting(false);

}

};

  

const reset = () => {

setName("");

setDriven("");

setErrors({});

setTouched({ name: false, driven: false });

setHasUserEdited(false);

};

  

const effectiveErrors = hasUserEdited

? errors

: { ...errors, ...externalErrors };

  

const isFormValid =

(!effectiveErrors.name || effectiveErrors.name.length === 0) &&

(!effectiveErrors.driven || effectiveErrors.driven.length === 0) &&

!isSubmitting;

  

return {

name,

driven,

isSubmitting,

effectiveErrors,

isFormValid,

handleNameChange,

handleDrivenChange,

handleNameBlur,

handleDrivenBlur,

handleSubmit,

reset,

};

}
```

este fue el cambio con usememo y callback

```jsx
import { useState, useCallback, useMemo } from "react";
import type { VehicleInput } from "../types/vehicle";
import type { NormalizedErrors } from "../normalizeError";
import { validateVehicleField } from "../validations/vehicle.field";
import { validateVehicleOnSubmit } from "../validations/vehicle.submit";

export function useVehicleForm(
  onSave: (vehicle: VehicleInput) => Promise<boolean>,
  onClose: () => void,
  externalErrors?: NormalizedErrors
) {
  const [name, setName] = useState("");
  const [driven, setDriven] = useState("");
  const [errors, setErrors] = useState<NormalizedErrors>({});
  const [touched, setTouched] = useState({ name: false, driven: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUserEdited, setHasUserEdited] = useState(false);

  const handleNameChange = useCallback(
    (value: string) => {
      setName(value);
      if (externalErrors?.name) setHasUserEdited(true);

      if (touched.name) {
        setErrors((p) => ({
          ...p,
          name: validateVehicleField("name", value),
        }));
      }
    },
    [externalErrors?.name, touched.name]
  );

  const handleDrivenChange = useCallback(
    (value: string) => {
      setDriven(value);
      if (externalErrors?.driven) setHasUserEdited(true);

      if (touched.driven) {
        setErrors((p) => ({
          ...p,
          driven: validateVehicleField("driven", value),
        }));
      }
    },
    [externalErrors?.driven, touched.driven]
  );

  const handleNameBlur = useCallback(() => {
    setTouched((p) => ({ ...p, name: true }));
    setErrors((p) => ({
      ...p,
      name: validateVehicleField("name", name),
    }));
  }, [name]);

  const handleDrivenBlur = useCallback(() => {
    setTouched((p) => ({ ...p, driven: true }));
    setErrors((p) => ({
      ...p,
      driven: validateVehicleField("driven", driven),
    }));
  }, [driven]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ name: true, driven: true });

      const payload: VehicleInput = {
        name,
        driven: driven ? { name: driven } : undefined,
      };

      const submitErrors = validateVehicleOnSubmit(payload);
      if (Object.keys(submitErrors).length) {
        setErrors(submitErrors as NormalizedErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const success = await onSave(payload);
        if (success) onClose();
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, driven, onSave, onClose]
  );

  const reset = useCallback(() => {
    setName("");
    setDriven("");
    setErrors({});
    setTouched({ name: false, driven: false });
    setHasUserEdited(false);
  }, []);

  const effectiveErrors = useMemo(
    () =>
      hasUserEdited
        ? errors
        : { ...errors, ...externalErrors },
    [errors, externalErrors, hasUserEdited]
  );

  const isFormValid = useMemo(
    () =>
      (!effectiveErrors.name || effectiveErrors.name.length === 0) &&
      (!effectiveErrors.driven || effectiveErrors.driven.length === 0) &&
      !isSubmitting,
    [effectiveErrors, isSubmitting]
  );

  return {
    name,
    driven,
    isSubmitting,
    effectiveErrors,
    isFormValid,
    handleNameChange,
    handleDrivenChange,
    handleNameBlur,
    handleDrivenBlur,
    handleSubmit,
    reset,
  };
}

```