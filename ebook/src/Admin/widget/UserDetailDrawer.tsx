import { Drawer } from "antd";

export default function UserDetailDrawer({ onClose, open }: { onClose: () => void; open: boolean }) {
    console.log(open)
  return (
    <>
    <Drawer
      title="User Details"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={open}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
    </>
  );
}
