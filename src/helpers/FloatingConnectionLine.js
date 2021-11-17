import { getBezierPath, getSmoothStepPath } from "react-flow-renderer";

import { getEdgeParams } from "./FloatingLineUtils.ts";

const FloatingConnectionLine = ({
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    sourceNode,
}) => {
    if (!sourceNode) {
        return null;
    }

    const targetNode = {
        id: "connection-target",
        __rf: { width: 1, height: 1, position: { x: targetX, y: targetY } },
    };

    const { sx, sy } = getEdgeParams(sourceNode, targetNode);
    // eslint-disable-next-line no-unused-vars
    const dBezier = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition,
        targetPosition,
        targetX,
        targetY,
    });
    const dSmoothStep = getSmoothStepPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition,
        targetPosition,
        targetX,
        targetY,
    });

    return (
        <g>
            <path
                fill="none"
                stroke="#222"
                strokeWidth={1.5}
                className="animated"
                d={dSmoothStep}
            />
            <circle
                cx={targetX}
                cy={targetY}
                fill="#fff"
                r={3}
                stroke="#222"
                strokeWidth={1.5}
            />
        </g>
    );
};

export default FloatingConnectionLine;
