import { Drawer, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserDetailDrawer({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const [users, setUsers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  function GetUsers() {
    axios
      .get(`https://ebook-dbm9.onrender.com/members`)
      .then((response) => {
        setUsers(response.data);
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
  if (users.length === 0)
    return (
      <>
        <div className="grid grid-cols-1 gap-4">
          <div className="animate-pulse w-full p-2 h-20">
            <p className="w-full"></p>
          </div>
          <div className="animate-pulse w-full p-2 h-20">
            <p className="w-full"></p>
          </div>
          <div className="animate-pulse w-full p-2 h-20">
            <p className="w-full"></p>
          </div>
          <div className="animate-pulse w-full p-2 h-20">
            <p className="w-full"></p>
          </div>
          <div className="animate-pulse w-full p-2 h-20">
            <p className="w-full"></p>
          </div>
          <div className="animate-pulse w-full p-2 h-20">
            <p className="w-full"></p>
          </div>
        </div>
      </>
    );
  console.log(users);
  return (
    <>
      {contextHolder}
      <Drawer
        title="User Details"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        size="large"
      >
        {users.map(
          (user: {
            id: string;
            userName: string;
            email: string;
            role: string;
            createdAt: string;
          }) => (
            <UserCard
              key={user.id}
              name={user.userName}
              email={user.email}
              role={user.role}
              date={user.createdAt}
            />
          )
        )}
      </Drawer>
    </>
  );
}

function UserCard({
  name,
  email,
  role,
  date,
}: {
  name: string;
  email: string;
  role: string;
  date: string;
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
        >
          <path
            d="M1 1L15.5 4.5L17 12L12 17L4.5 15.5L1 1ZM1 1L8.586 8.586M11 18L18 11L21 14L14 21L11 18ZM12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z"
            stroke="#1E1E1E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
