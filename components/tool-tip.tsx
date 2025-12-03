import React, { useRef, useEffect, useCallback } from 'react';

type TooltipProps = {
  children?: React.ReactNode;
  content: string;
  direction: string;
  status: number;
  delay: number;
  dynamic: boolean;
}

const Tooltip = (props: TooltipProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);

  const showTip = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (toolTipRef.current) {
        toolTipRef.current.style.display = "block";
      }
    }, props.delay || 400);
  }, [props.delay]);

  const hideTip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (toolTipRef.current) {
      toolTipRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    if (props.dynamic) {
      if (props.status !== 0 && toolTipRef.current) {
        toolTipRef.current.style.display = "block";
      }
      timeoutRef.current = setTimeout(() => {
        if (toolTipRef.current) {
          toolTipRef.current.style.display = "none";
        }
      }, props.delay || 400);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [props.content, props.dynamic, props.status, props.delay]);

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      <div className={`Tooltip-Tip ${props.direction || 'top'}`} ref={toolTipRef}>
        {props.content}
      </div>
    </div>
  );
};

export default Tooltip;
