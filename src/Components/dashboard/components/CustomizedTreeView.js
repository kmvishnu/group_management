import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
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
  const { itemId, label, children, ...other } = props;
  const { getRootProps, getContentProps, getIconContainerProps, getCheckboxProps, getLabelProps, getGroupTransitionProps } = useTreeItem2({ itemId, label, children, rootRef: ref });

  return (
    <TreeItem2Root {...getRootProps(other)}>
      <CustomTreeItemContent {...getContentProps()}>
        <TreeItem2IconContainer {...getIconContainerProps()} />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: "0.8rem" }}>{label[0]}</Avatar>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <TreeItem2Label {...getLabelProps()}>{label}</TreeItem2Label>
        </Box>
      </CustomTreeItemContent>
      {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
    </TreeItem2Root>
  );
});

export default function CustomizedTreeView() {
  const [nodes, setNodes] = React.useState([{ id: '1', label: 'test', children: [] }]);
  const [isVisible, setIsVisible] = React.useState(false);

  function handleAddNode(name) {
    const newNode = {
      id: Date.now().toString(),
      label: name,
      children: [],
    };
    setNodes([...nodes, newNode]);
  }

  return (
    <>
      <Box sx={{ minHeight: 200, minWidth: 250 }}>
        <button onClick={() => setIsVisible(true)}>Add Parent Node</button>
        <RichTreeView
          defaultExpandedItems={["3"]}
          items={nodes}
          slots={{ item: CustomTreeItem }}
        />
      </Box>
      {isVisible && <AddChild setIsVisible={setIsVisible} handleAddNode={handleAddNode} />}
    </>
  );
}
