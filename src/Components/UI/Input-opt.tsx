import React, { useMemo, useRef, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export default function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  autoFocus = true,
  className = "",
}: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const cells = useMemo(() => {
    const v = (value || "").replace(/\D/g, "").slice(0, length);
    return Array.from({ length }, (_, i) => v[i] || "");
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
      inputsRef.current[0].select?.();
    }
  }, [autoFocus]);

  function setCell(index: number, char: string) {
    const digit = (char || "").replace(/\D/g, "").slice(0, 1);
    if (digit === "" && cells[index] === "") return;

    const next = cells.slice();
    next[index] = digit;
    const nextValue = next.join("");
    onChange?.(nextValue);

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
      inputsRef.current[index + 1]?.select?.();
    }

    if (digit && nextValue.length === length && next.every(Boolean)) {
      onComplete?.(nextValue);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    const { key } = e;

    if (key === "Backspace") {
      if (cells[index]) {
        e.preventDefault();
        const next = cells.slice();
        next[index] = "";
        onChange?.(next.join(""));
      } else if (index > 0) {
        e.preventDefault();
        inputsRef.current[index - 1]?.focus();
        const prev = cells.slice();
        prev[index - 1] = "";
        onChange?.(prev.join(""));
      }
    }

    if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
      inputsRef.current[index - 1]?.select?.();
    }

    if (key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
      inputsRef.current[index + 1]?.select?.();
    }

    if (key === "Enter" && value?.length === length) {
      onComplete?.(value);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, length);
    if (!text) return;

    const filled = text.padEnd(length, "");
    onChange?.(filled);

    const lastIndex = Math.min(text.length, length - 1);
    inputsRef.current[lastIndex]?.focus();
    inputsRef.current[lastIndex]?.select?.();

    if (text.length === length) {
      onComplete?.(text);
    }
  }

  return (
    <div className={"flex gap-2 sm:gap-3 " + className} onPaste={handlePaste}>
      {cells.map((char, i) => (
        <input
          key={i}
          ref={(el) => void (inputsRef.current[i] = el)}
          value={char}
          onChange={(e) => setCell(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label={`Number ${i + 1} з ${length}`}
          pattern="\\d*"
          maxLength={1}
          className="w-10 h-10 sm:w-14 sm:h-16 border-2 text-center text-lg font-semibold rounded-xl focus:border-[rgb(100,26,230)] outline-none border-gray-100 shadow-xs bg-white tracking-widest caret-transparent transition-colors duration-200"
        />
      ))}
    </div>
  );
}
