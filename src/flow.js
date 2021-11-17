import React, { useState } from "react";
import ReactFlow, {
    addEdge,
    Background,
    ArrowHeadType,
    removeElements,
} from "react-flow-renderer";

import useWindowDimensions from "./helpers/WindowDimensions";
import FloatingEdge from "./helpers/FloatingEdge";
import FloatingConnectionLine from "./helpers/FloatingConnectionLine.js";
import createElements from "./helpers/createElements.js";

import * as FateImages from "./images/images.js";

const edgeType = "smoothstep"; // floating or smoothstep
// eslint-disable-next-line no-unused-vars
const testElements = [
    {
        id: "SN",
        data: { label: "Fate/stay night" },
        position: { x: 10, y: 10 },
        targetPosition: "left",
    },
    // default node
    {
        id: "UBW",
        data: { label: "Fate/stay night: Unlimited Blade Works" },
        position: { x: 10, y: 10 },
        targetPosition: "left",
    },
    {
        id: "HF",
        data: { label: "Fate/stay night: Heaven's Feel" },
        position: { x: 10, y: 10 },
        targetPosition: "left",
    },
    {
        id: "Zero",
        data: {
            label: (
                <div>
                    <img
                        src={FateImages.i_Zero}
                        alt="Fate/Zero thumbnail"
                        style={{
                            width: "100%",
                        }}
                    />
                </div>
            ),
        },
        position: { x: 10, y: 10 },
        sourcePosition: "right",
    },
    // animated edge
    {
        id: "edge-Z-SN",
        target: "SN",
        source: "Zero",
        arrowHeadType: ArrowHeadType.Arrow,
        type: edgeType,
        animated: true,
    },
    {
        id: "edge-Z-UBW",
        target: "UBW",
        source: "Zero",
        arrowHeadType: ArrowHeadType.Arrow,
        type: edgeType,
        animated: true,
        style: { "strokeWidth": "500px" },
    },
    {
        id: "edge-Z-HF",
        target: "HF",
        source: "Zero",
        arrowHeadType: ArrowHeadType.Arrow,
        type: edgeType,
        animated: true,
    },
];

const initialElements = createElements();

const edgeTypes = {
    floating: FloatingEdge,
};

const Flow = () => {
    const { height, width } = useWindowDimensions();

    const [elements, setElements] = useState(initialElements);

    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onConnect = (params) => {
        setElements((els) =>
            addEdge(
                {
                    ...params,
                    type: "floating",
                    arrowHeadType: ArrowHeadType.Arrow,
                },
                els
            )
        );
    };

    return (
        <div style={{ height: height, width: width }} className="floatingedges">
            <ReactFlow
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                edgeTypes={edgeTypes}
                connectionLineComponent={FloatingConnectionLine}
                snapToGrid={true}
                minZoom={0.1}
                defaultZoom={1}
                defaultPosition={[200, 300]}
                nodesDraggable={false}
                nodesConnectable={false}
            >
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Flow;
