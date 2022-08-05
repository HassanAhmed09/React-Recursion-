import { useCallback, useEffect, useState } from "react";

const defaultTree = [
  {
    id: "001",
    child: [
      { id: "00", child: [] },
      { id: "01", child: [{ id: "02", child: [{ id: "04", child: [] }] }] },
    ],
  },

];

function Node({ node, onAdd, onRemove }) {
  const addChild = (id) => {
    onAdd(id);
  };
  const removeChild = (id) => {
    onRemove(id);
  };

  const nestedChild = (node.child || []).map((nodeItem) => {
    return (
      <Node key={nodeItem.id} node={nodeItem} type="child" onAdd={onAdd} onRemove={onRemove}/>
    );
  });
  return (
    <div style={{color:"black",borderWidth:3, marginLeft: "70px", marginTop: "10px",position: 'relative', display: 'flex', flexDirection: 'column', left: 25, borderLeft: '1px solid', paddingLeft: 15  }}>
      <div className="Box">
        <div onClick={addChild.bind(null, node.id)}>+</div>
        <div>{node.id}</div>
        <div onClick={removeChild.bind(null, node.id)}>-</div>
      </div>
      {nestedChild}
    </div>
  );
}

function App() {
  const [treeVal, setTreeVal] = useState(defaultTree);
  const [maxID, setMaxID] = useState(15);
  const [reRender,SetRender ] = useState(false);
  const addChild = (id) => {
    const newNode = { id: maxID.toString(), child: [] };
    setMaxID(maxID + 1);

    function insertNodeIntoTree(node, nodeId, newNode) {
      if (node.id === nodeId) {

        if (newNode) {
          node.child.push(newNode);
        }
      } else if (node.child !== null) {
        for (let i = 0; i < node.child.length; i++) {
          insertNodeIntoTree(node.child[i], nodeId, newNode);
        }
      }
    }
    
    insertNodeIntoTree(treeVal[0],id,newNode);
  };
  const deleteChild =(id)=>{
    function deleteNodeFromTree(node, nodeId) {
      if (node.child !== null) {
        for (let i = 0; i < node.child.length; i++) {
            let filtered = node.child.filter(f => f.id === nodeId);
            if (filtered && filtered.length > 0) {
                node.child = node.child.filter(f => f.id !== nodeId);
                SetRender(!reRender);
                return;
            }
            
            deleteNodeFromTree(node.child[i], nodeId);
        }
      }
    }
    deleteNodeFromTree(treeVal[0],id);
  }


  return treeVal.map((node) => {
    return <Node key={node.id} node={node} onAdd={addChild} onRemove={deleteChild} />;
  });
}

export default App;