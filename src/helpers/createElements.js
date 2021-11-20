import React from "react";
import * as FateImages from "../images/images.js";
import * as FateDataRaw from "../data/data.json";
import { ArrowHeadType } from "react-flow-renderer";
import { Popover } from "react-bootstrap";
import PopoverStickOnHover from "./PopoverStickOnHover.jsx";

const FateData = FateDataRaw.default;

const edgeType = 'smoothstep'; // 'floating' for custom floating edges
const animated = true;

export default function createElements() {
    const elements = [];
    for (let i = 0; i < FateData.length; i++) {
        const FateEntry = FateData[i];
        const FateImage = FateImages['i_' + FateEntry.id];

        // Generate image element
        function ImageComponent(props) {
            const hasImage = props.hasImage;
            if (hasImage) {
                return (
                    <img
                        src={FateImage}
                        alt={FateEntry.name}
                        draggable="false"
                        style={{
                            width: props.width,
                        }} />
                );
            }
            return null;
        }

        // Icon links
        function LinksComponent(props) {
            if (props.links) {
                return props.links.map((link, index) => {
                    return (
                        <a
                            key={index}
                            className="link"
                            title={link.site}
                            target="_blank"
                            href={link.url}
                            rel="noreferrer"
                            style={{
                                paddingLeft: '10px',
                            }}
                        >
                            <img width="16" src={link.icon} alt={link.site}/>
                        </a>
                    );
                });
            }
            return null;
        }

        // Hover popover
        function PopoverComponent() {
            return (
                <PopoverStickOnHover
                    component={
                        <div>
                            <Popover.Header><strong>{FateEntry.time}</strong></Popover.Header>
                            <Popover.Body>
                                <div>
                                    <strong>{FateEntry.name}</strong>
                                    <div // Icon link
                                        style={{
                                            float: 'right',
                                        }}                                        
                                    >
                                        <LinksComponent links={FateEntry.links}/>
                                    </div>
                                    <div
                                        style={{
                                            paddingTop: '10px',
                                        }}
                                    >
                                        <p>
                                            {FateEntry.info.description}
                                        </p>
                                        {(
                                            FateEntry.info.points.length ? (
                                                <ul>
                                                    {(

                                                        FateEntry.info.points.map((point, index) => {
                                                            return (
                                                                <li key={index}>{point}</li>
                                                            );
                                                        })
                                                    )}
                                                </ul>
                                            ) : (
                                                null
                                            )
                                        )}
                                    </div>
                                </div>
                            </Popover.Body>
                        </div>
                    }
                    placement="bottom"
                    onMouseEnter={() => { }}
                    delay={0}
                >
                    <div>
                        {FateEntry.name}
                        <ImageComponent hasImage={!!FateImage} width="100%" />
                    </div>
                </PopoverStickOnHover>
            );
        }

        // Push Node
        elements.push(
            {
            id: FateEntry.id,
            data: {
                label: (
                        <div>
                            <PopoverComponent />
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