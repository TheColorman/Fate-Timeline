import React from "react";
import * as FateImages from "../images/images.js";
import * as FateDataRaw from "../data/data.json";
import { ArrowHeadType } from "react-flow-renderer";

const FateData = FateDataRaw.default;

const edgeType = 'smoothstep'; // 'floating' for custom floating edges
const animated = true;

export default function createElements() {
    const elements = [];
    for (let i = 0; i < FateData.length; i++) {
        const FateEntry = FateData[i];
        const FateImage = FateImages['i_' + FateEntry.id];

        // Generate image
        const ImageComponent = (props) => {
            const hasImage = props.hasImage;
            if (hasImage) {
                return (
                    <img
                        src={FateImage}
                        alt={FateEntry.name}
                        draggable="false"
                        style={{
                            width: '100%',
                        }}
                    />
                );
            }
            return null;
        }

        // Push Node
        elements.push({
            id: FateEntry.id,
            data: {
                label: (
                    <div>
                        {FateEntry.name}
                        <ImageComponent hasImage = {!!FateImage} />
                    </div>
                ),
            },
            position: FateEntry.position,
            sourcePosition: 'right',
            targetPosition: 'left',
        });

        // Push Edge
        if (FateEntry.source) {
            elements.push({
                id: `edge-${FateEntry.source}-${FateEntry.id}`,
                target: FateEntry.id,
                source: FateEntry.source,
                arrowHeadType: ArrowHeadType.Arrow,
                type: edgeType,
                animated: animated,
                style: {
                    strokeWidth: "2px"
                }
            });
        }
    }

    return elements;
}