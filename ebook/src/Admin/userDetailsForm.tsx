import { Spin } from "antd"

type prop = {
  selectedUser: any
  setSelectedUser: (record: any) => void;
  spin:boolean;
}
function UserDetailsForm({selectedUser, setSelectedUser, spin}:prop) {
  return (
    <>
    {<Spin size="small" spinning={spin} tip="updating record..." className="flex justify-center" />}
    <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold">User Name</label>
          <input
            type="text"
            value={selectedUser?.userName || ""}
            onChange={(e) =>
              setSelectedUser((prev:any) => ({
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
              setSelectedUser((prev:any) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="border border-gray-300 rounded p-2"
          />
        </div>
    </>
  )
}

export default UserDetailsForm
