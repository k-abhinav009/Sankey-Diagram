import React from "react";
import PropTypes from "prop-types";
import { Sankey, Tooltip } from "recharts";

const SankeyDiagram = (props) => {
  const { data, width, height, nodePadding, margin, nodeColor, linkColor,labelColor } = props;
  // Custom Link rendering
  const Link = ({ sourceX, sourceY, targetX, targetY, payload }) => (
    <g>
      <path
        d={`M${sourceX},${sourceY}C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`}
        fill="none"
        stroke={linkColor}
        strokeWidth={payload.target.value / 100}
      />
      <text
        x={(sourceX + targetX) / 2}
        y={(sourceY + targetY) / 2}
        textAnchor="middle"
        fill="grey"
        fontSize={13}
      >
        {payload.target.value}
      </text>
    </g>
  );

  const Node = ({ x, y, width, height, payload }) => (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={nodeColor} />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        fill={labelColor}
        verticalAnchor="middle"
      >
        {payload.name}
      </text>
    </g>
  );

  return (
    <Sankey
      width={width}
      height={height}
      data={data ? data : { nodes: [], links: [] }}
      nodePadding={nodePadding}
      node={<Node />}
      link={<Link />}
      margin={margin}
    >
      <Tooltip />
    </Sankey>
  );
};

// Default props
SankeyDiagram.defaultProps = {
  width: 800,
  height: 400,
  nodePadding: 30,
  margin: { top: 40, right: 50, bottom: 40, left: 50 },
  nodeColor: "#8884d8",
  linkColor: "#ccc",
  labelColor:'blue'
};

// Prop types
SankeyDiagram.propTypes = {
  data: PropTypes.shape({
    nodes: PropTypes.array.isRequired,
    links: PropTypes.array.isRequired,
  }).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  nodePadding: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  nodeColor: PropTypes.string,
  linkColor: PropTypes.string,
};

export default React.memo(SankeyDiagram);