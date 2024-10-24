import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material"; 
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
  TreeItem2Checkbox,
  TreeItem2GroupTransition,
} from "@mui/x-tree-view/TreeItem2";
import AddChild from "../../addChild/AddChild";
import { useTreeItem2 } from "@mui/x-tree-view";

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { itemId, label, children, onAddChild, onDeleteNode, ...other } = props;
  const { getRootProps, getContentProps, getIconContainerProps, getCheckboxProps, getLabelProps, getGroupTransitionProps } = useTreeItem2({ itemId, label, children, rootRef: ref });

  return (
    <TreeItem2Root {...getRootProps(other)}>
      <CustomTreeItemContent {...getContentProps()}>
        <TreeItem2IconContainer {...getIconContainerProps()} />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: "0.8rem", marginRight: "8px" }}>{label[0]}</Avatar>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <TreeItem2Label {...getLabelProps()}>{label}</TreeItem2Label>
        </Box>

        <Button
          size="small"
          variant="outlined"
          color="primary"
          sx={{ marginRight: "8px" }}
          onClick={() => onAddChild(itemId)}
        >
          Add
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => onDeleteNode(itemId)}
        >
          Delete
        </Button>
      </CustomTreeItemContent>
      {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
    </TreeItem2Root>
  );
});

export default function CustomizedTreeView() {
  const [nodes, setNodes] = React.useState([{ id: '1', label: 'Root Node', children: [] }]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  const [isParentNode, setIsParentNode] = React.useState(false);

  function handleAddChildNode(parentId, childName) {
    const updateTree = (items) => {
      return items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...item.children, { id: Date.now().toString(), label: childName, children: [] }]
          };
        }
        if (item.children) {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });
    };
    setNodes(updateTree(nodes));
    setIsVisible(false);
  }

  function handleAddParentNode(name) {
    const newNode = {
      id: Date.now().toString(),
      label: name,
      children: [],
    };
    setNodes([...nodes, newNode]);
    setIsVisible(false);
  }

  function handleDeleteNode(nodeId) {
    const updateTree = (items) => {
      return items
        .filter(item => item.id !== nodeId)
        .map(item => {
          if (item.children) {
            return { ...item, children: updateTree(item.children) };
          }
          return item;
        });
    };
    setNodes(updateTree(nodes));
  }

  function handleSubmit() {
    console.log(JSON.stringify(nodes, null, 2));
  }

  return (
    <>
      <Box sx={{ minHeight: 200, minWidth: 250 }}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          sx={{ marginBottom: "16px" }}
          onClick={() => {
            setIsParentNode(true);
            setIsVisible(true);
          }}
        >
          Add Parent Node
        </Button>

        <RichTreeView
          defaultExpandedItems={["3"]}
          items={nodes}
          slots={{
            item: (props) => (
              <CustomTreeItem
                {...props}
                onAddChild={(id) => {
                  setSelectedNodeId(id);
                  setIsParentNode(false);
                  setIsVisible(true);
                }}
                onDeleteNode={handleDeleteNode}
              />
            ),
          }}
        />

        <Button
          size="medium"
          variant="contained"
          color="success"
          sx={{ marginTop: "16px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>

      {isVisible && (
        <AddChild
          setIsVisible={setIsVisible}
          handleAddNode={(name) => {
            if (isParentNode) {
              handleAddParentNode(name);
            } else {
              handleAddChildNode(selectedNodeId, name);
            }
          }}
        />
      )}
    </>
  );
}
