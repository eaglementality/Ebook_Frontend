import { Drawer, message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserLoginStore } from "../../hooks/store";

export default function UserDetailDrawer({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [users, setUsers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    userId: string;
    userName: string;
    email: string;
    role: string;
    date: string;
  }>({
    userId: "",
    userName: "",
    email: "",
    role: "",
    date: "",
  });
  const updateUserStateStore = useUserLoginStore(
    (state) => state.updateUserState
  );
  function handleDelete(id:string){
    axios
      .delete(
        `https://ebook-dbm9.onrender.com/members/api/delete/${id}`
      )
      .then(() => {
        messageApi.open({
          type: "success",
          content: "User deleted successfully",
        });
        GetUsers();
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Failed to delete user",
        });
      });
  }
  function handleOk() {
    axios
      .patch(
        `https://ebook-dbm9.onrender.com/members/api/register/${selectedUser.userId}`,
        selectedUser
      )
      .then(() => {
        messageApi.open({
          type: "success",
          content: "User updated successfully",
        });
        GetUsers();
        setIsModalOpen(false);
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Failed to update user",
        });
      });
  }
  function handleCancel() {
    setIsModalOpen(false);
  }
  function GetUsers() {
    axios
      .get(`https://ebook-dbm9.onrender.com/members`)
      .then((response) => {
        setUsers(response.data);
        updateUserStateStore({ numberOfUsers: response.data.length });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "unable to fetch users",
        });
      });
  }
  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <>
      {contextHolder}
      <Modal
        title="Update user"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold">User Name</label>
          <input
            type="text"
            value={selectedUser?.userName || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
            className="border border-gray-300 rounded p-2"
          />
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="border border-gray-300 rounded p-2"
          />
        </div>
      </Modal>
      <Drawer
        title="User Details"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        size="large"
      >
        {users.map(
          (user: {
            userId: string;
            userName: string;
            email: string;
            role: string;
            createdAt: string;
          }) => (
            <UserCard
              key={user.userId}
              id={user.userId}
              name={user.userName}
              email={user.email}
              role={user.role}
              date={user.createdAt}
              setIsModalOpen={setIsModalOpen}
              setSelectedUser={setSelectedUser}
              handleDelete={() => handleDelete(user.userId)}
            />
          )
        )}
      </Drawer>
    </>
  );
}

function UserCard({
  id,
  name,
  email,
  role,
  date,
  setIsModalOpen,
  setSelectedUser,
    handleDelete,
}: {
  id: string;
  name: string;
  email: string;
  role: string;
  date: string;
  setSelectedUser: (user: any) => void;
  setIsModalOpen: (open: boolean) => void;
  handleDelete: () => void;
}): React.JSX.Element {
  return (
    <div className="border-b border-gray-200 py-2 w-full flex justify-between">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="flex items-center gap-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setSelectedUser({
              userId: id,
              userName: name,
              email: email,
              role: role,
            });
            setIsModalOpen(true);
          }}
        >
          <path
            d="M1 1L15.5 4.5L17 12L12 17L4.5 15.5L1 1ZM1 1L8.586 8.586M11 18L18 11L21 14L14 21L11 18ZM12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z"
            stroke="#1E1E1E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
                handleDelete()
            }}
        >
          <path
            d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
            fill="#1D1B20"
          />
        </svg>
      </div>
    </div>
  );
}
