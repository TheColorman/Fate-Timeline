import { useMemo } from 'react';
import { getMarkerEnd, useStoreState, getBezierPath, getSmoothStepPath } from 'react-flow-renderer';

import { getEdgeParams } from './FloatingLineUtils.ts';

const FloatingEdge = ({ id, source, target, arrowHeadType, markerEndId, style }) => {
  const nodes = useStoreState((state) => state.nodes);
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const sourceNode = useMemo(() => nodes.find((n) => n.id === source), [source, nodes]);
  const targetNode = useMemo(() => nodes.find((n) => n.id === target), [target, nodes]);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  // eslint-disable-next-line no-unused-vars
  const dBezier = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });
  const dSmoothStep = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <g className="react-flow__connection">
      <path id={id} className="react-flow__edge-path" d={dSmoothStep} markerEnd={markerEnd} style={style} />
    </g>
  );
};

export default FloatingEdge;