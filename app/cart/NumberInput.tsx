"use client";

import React from "react";
import { ActionIcon, Button, InputBase, UnstyledButton } from "@mantine/core";
import { MinusIcon, PlusIcon } from "lucide-react";
import { clamp, useUncontrolled } from "@mantine/hooks";
import { NumericFormat, OnValueChange } from "react-number-format";

// re for negative -0, -0., -0.0, -0.00, -0.000 ... strings
// and for positive 0., 0.0, 0.00, 0.000 ... strings
const leadingDecimalZeroPattern = /^(0\.0*|-0(\.0*)?)$/;

// re for 01, 006, 00.02, -0010, -000.293 ... and negative counterparts
const leadingZerosPattern = /^-?0\d+(\.\d+)?\.?$/;

interface NumberInputProps {
  max?: number;
  min?: number;
  allowLeadingZeros?: boolean;
  onChange?: (value: number | string) => void;
  onValueChange?: OnValueChange;
  value?: string | number;
  defaultValue?: string | number;
}

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const {
    min,
    max,
    value,
    defaultValue,
    onChange,
    onValueChange,
    allowLeadingZeros,
  } = props;

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  const handleValueChange: OnValueChange = (payload, event) => {
    if (event.source === "event") {
      setValue(
        isValidNumber(payload.floatValue) &&
          !leadingDecimalZeroPattern.test(payload.value) &&
          !(allowLeadingZeros ? leadingZerosPattern.test(payload.value) : false)
          ? payload.floatValue
          : payload.value
      );
    }
    onValueChange?.(payload, event);
  };

  const onStep = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    isIncrement: boolean
  ) => {
    // event.preventDefault();
    let val: number = _value as number;
    val = isIncrement ? val + 1 : val - 1;
    console.log("STEP", val);
    val = clamp(val, min, max);
    setValue(val);
  };

  return (
    <div className="flex w-20 border border-gray-200 p-1 rounded-md">
      <ActionIcon
        variant="subtle"
        size={"sm"}
        onClick={(ev) => onStep(ev, false)}
      >
        <MinusIcon size={18} />
      </ActionIcon>
      <InputBase
        component={NumericFormat}
        styles={{
          root: {
            width: 1,
            flexGrow: 1,
          },
          input: {
            textAlign: "center",
            width: "100%",
          },
        }}
        unstyled
        value={_value}
        onValueChange={handleValueChange}
        allowLeadingZeros={allowLeadingZeros}
      />
      <ActionIcon
        variant="subtle"
        size={"sm"}
        onClick={(ev) => onStep(ev, true)}
      >
        <PlusIcon size={18} />
      </ActionIcon>
    </div>
  );
};

function isValidNumber(value: number | string | undefined): value is number {
  return (
    (typeof value === "number"
      ? value < Number.MAX_SAFE_INTEGER
      : !Number.isNaN(Number(value))) && !Number.isNaN(value)
  );
}
