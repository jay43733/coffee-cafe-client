import React, { useEffect, useState } from "react";
import useUserStore from "../store/user-store";
import Heading from "../components/Typography/Heading";
import ListUser from "../components/ListUser";
import ChangeRole from "../components/ChangeRole";
import { toast } from "react-toastify";
import DeleteUser from "../components/DeleteUser";
import ReactiveUser from "../components/ReactiveUser";

const UserManagement = () => {
  const actionGetAllUser = useUserStore((state) => state.actionGetAllUSer);
  const actionChangeRole = useUserStore((state) => state.actionChangeRole);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const actionGetAllUSer = useUserStore((state)=>state.actionGetAllUSer)
  const actionDeleteUser = useUserStore((state)=>state.actionDeleteUser)
  const actionActivateUser = useUserStore((state)=>state.actionActivateUser)

  const allUser = useUserStore((state) => state.allUser);
  const currentUser = useUserStore((state) => state.currentUser);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    actionGetAllUser();
  }, []);

  
  const [role, setRole] = useState("");
  
  const hdlUpdateRole = async (role,item, id) => {
    setLoading(true)
    setRole(role);
    await setCurrentUser(item);
    await actionChangeRole(id, {role}, );
    await actionGetAllUser();
    await document.getElementById("change-role").showModal();
  };

  const hdlDeleteUser = async (id,user) => {
    setLoading(true)
    setCurrentUser(user)
    await actionDeleteUser(id )
    await actionGetAllUSer()
    await document.getElementById("delete-user").showModal()
  };

  
  const hdlReactiveUser = async(id,user) =>{
    setLoading(true)
    setCurrentUser(user)
    await actionActivateUser(id )
    await actionGetAllUSer()
    await document.getElementById("active-user").showModal()
  }


  return (
    <div>
      {loading && (
        <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
      )}
      <div className="basis-[0.7] w-full pl-12">
        <table className="overflow-hidden rounded-2xl table-auto w-full border-collapse">
          <thead className="bg-white ">
            <tr className="text-left">
              <th className="text-left px-8 pt-6 pb-4 w-[5%]">
                <Heading
                  text="No"
                  color="primary"
                  fontSize="20"
                  fontWeight="bold"
                />
              </th>
              <th className="text-left px-8 pt-6 pb-4 w-[25%]">
                <Heading
                  text="Email"
                  color="primary"
                  fontSize="20"
                  fontWeight="bold"
                />
              </th>
              <th className="text-left px-8 pt-6 pb-4 w-[20%]">
                <Heading
                  text="Name"
                  color="primary"
                  fontSize="20"
                  fontWeight="bold"
                />
              </th>
              <th className="text-left px-8 pt-6 pb-4 w-[20%]">
                <Heading
                  text="Phone"
                  color="primary"
                  fontSize="20"
                  fontWeight="bold"
                />
              </th>
              <th className="text-left px-8 pt-6 pb-4 w-[15%]">
                <Heading
                  text="Role"
                  color="primary"
                  fontSize="20"
                  fontWeight="bold"
                />
              </th>
              <th className="text-center px-8 pt-6 pb-4 w-[15%]">
                <Heading
                  text="Actions"
                  color="primary"
                  fontSize="20"
                  fontWeight="bold"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((item, index) => (
              <ListUser
                key={item.id}
                item={item}
                index={index}
                loading={loading}
                setLoading={setLoading}
                hdlUpdateRole={hdlUpdateRole}
                hdlDeleteUser={hdlDeleteUser}
                hdlReactiveUser={hdlReactiveUser}
              />
            ))}
          </tbody>
        </table>
        <dialog
        id="change-role"
        className="modal"
        onClose={() => {
          setCurrentUser(null);
          setLoading(false)
        }}
      >
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => e.target.closest("dialog").close()}
          >
            ✕
          </button>
          {currentUser && <ChangeRole role={role} hdlUpdateRole={hdlUpdateRole} />}
        </div>
      </dialog>
        <dialog
        id="delete-user"
        className="modal"
        onClose={() => {
          setCurrentUser(null);
          setLoading(false)
        }}
      >
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => e.target.closest("dialog").close()}
          >
            ✕
          </button>
          {currentUser && <DeleteUser />}
        </div>
      </dialog>
        <dialog
        id="active-user"
        className="modal"
        onClose={() => {
          setCurrentUser(null);
          setLoading(false)
        }}
      >
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => e.target.closest("dialog").close()}
          >
            ✕
          </button>
          {currentUser && <ReactiveUser />}
        </div>
      </dialog>
      </div>
    </div>
  );
};

export default UserManagement;
