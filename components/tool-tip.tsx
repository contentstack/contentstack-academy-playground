import React, { useRef, useEffect, MutableRefObject } from 'react';

type TooltipProps = {
  children?: JSX.Element|JSX.Element[];
  content: string;
  direction: string;
  status: number;
  delay: number;
  dynamic: boolean;
}

const Tooltip = (props: TooltipProps) => {
  let timeout: any;
  const toolTipRef = useRef() as MutableRefObject <HTMLDivElement>;

  const showTip = () => {
    timeout = setTimeout(() => {
      toolTipRef.current.style.display = "block";
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    toolTipRef.current.style.display = "none";
  };

  useEffect(() => {
    if (props.dynamic) {
      props.status !== 0 && (toolTipRef.current.style.display = "block");
      timeout = setTimeout(() => {
        toolTipRef.current.style.display = "none";
      }, props.delay || 400);
    }
  }, [props.content]);

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
