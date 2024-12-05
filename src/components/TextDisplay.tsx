import { useEffect } from "react";
import { ReactTyped, Typed } from "react-typed";

type TextDisplayProps = {
  strings: string[];
  onStringTyped: (index: number) => void;
  typedRef: React.MutableRefObject<Typed | null>;
  isTypingPaused: boolean;
  className?: string;
};

const TextDisplay = ({
  strings,
  onStringTyped,
  typedRef,
  isTypingPaused,
  className = "",
}: TextDisplayProps) => {
  useEffect(() => {
    if (isTypingPaused) {
      typedRef.current?.stop();
    } else {
      typedRef.current?.start();
    }
  }, [isTypingPaused]);

  return (
    <ReactTyped
      className={`text-5xl font-medium font-open ${className}`}
      typedRef={(typed) => (typedRef.current = typed)}
      strings={strings}
      typeSpeed={40}
      backSpeed={30}
      onStringTyped={onStringTyped}
    />
  );
};

export default TextDisplay;
