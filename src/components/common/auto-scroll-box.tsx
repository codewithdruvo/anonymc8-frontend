import { ReactNode, useEffect, useRef } from "react";

type Props = {
  dependencies: any[];
  children: ReactNode;
  className?: string;
  targetClassName?: string;
};

const AutoScrollBox = (props: Props) => {
  const { children, dependencies, className, targetClassName } = props;

  const lastDivRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastDivRef.current && listRef.current) {
      if (listRef?.current?.dataset?.autoscroll === "true")
        lastDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dependencies]);

  useEffect(() => {
    const onScrollEnd = (e: Event) => {
      const element = e.target as HTMLDivElement;
      if (element) {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;

        const scrollPosition = scrollTop + clientHeight;

        if (scrollHeight - scrollPosition < 50) {
          element.dataset.autoscroll = "true";
        } else {
          element.dataset.autoscroll = "false";
        }
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener("scrollend", onScrollEnd);
    }

    return () => {
      if (listRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        listRef.current.removeEventListener("scrollend", onScrollEnd);
      }
    };
  }, []);

  return (
    <div
      className={`overflow-y-auto ${className || ""}`}
      ref={listRef}
      data-autoscroll="true"
    >
      {children}
      <div ref={lastDivRef} className={targetClassName} />
    </div>
  );
};

export default AutoScrollBox;
