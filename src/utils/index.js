export const transformDataForSankey = (data) => {
    const nodes = [];
    const links = [];

    const addNode = (name) => {
      const index = nodes.findIndex((node) => node.name === name);
      if (index !== -1) return index;
      nodes.push({ name });
      return nodes.length - 1;
    };

    data.inflows.forEach((inflow) => {
      const inflowIndex = addNode(inflow.name);
      links.push({
        source: inflowIndex,
        target: addNode("Total Inflows"),
        value: inflow.value,
      });
    });

    data.outflows.forEach((outflow) => {
      const outflowIndex = addNode(outflow.name);
      links.push({
        source: addNode("Total Inflows"),
        target: outflowIndex,
        value: outflow.value,
      });

      outflow.children?.forEach((child) => {
        links.push({
          source: outflowIndex,
          target: addNode(child.name),
          value: child.value,
        });
      });
    });

    return { nodes, links };
  };


