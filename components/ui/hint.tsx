import React from 'react'
import { TooltipContent, Tooltip, TooltipTrigger } from './tooltip'
interface ProductProps {
    side: "right" | "left" | "top" | "bottom",
    sideOffset?: number,
    label: string,
    align: "center" | "start" | "end",
    children?: React.ReactNode

}

function Hint({side,children, label,align, sideOffset}:ProductProps) {
  return (
    <div>
    <Tooltip delayDuration={100}>
        <TooltipTrigger >
             {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} sideOffset={sideOffset} >
            {label}
        </TooltipContent>
    </Tooltip>


    </div>
  )
}

export default Hint