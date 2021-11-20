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
import Cookie from "./helpers/CookieConsent";

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
                elementsSelectable={true}
            >
                <Cookie />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Flow;
