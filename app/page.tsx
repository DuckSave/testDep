"use client";
import { useEffect, useState } from "react";
import UserAPI from "@/api/admin";
import { toast } from "@/components/hook/use-toast";

interface User {
  userId: string;
  userName: string;
  gmail: string;
}

const AdminAccount = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await UserAPI.account.getAllusers();
        console.log("API response:", response);

        if (response.status === 200) {
          setUsers(response.data); // Lấy danh sách user đúng định dạng
        } else {
          console.error("Lỗi: Response không hợp lệ");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast({
          title: "Error",
          description: "There was an issue fetching the accounts.",
          variant: "destructive",
        });
      }
    };

    fetchAccounts(); // Gọi API khi component mount
  }, []);

  return (
    <div className="p-5">
      <h1 className="font-medium text-sky-500 text-xl">Danh sách Users</h1>
      <ul className="mt-3">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.userId} className="border-b py-2">
              {user.userName} - {user.gmail}
            </li>
          ))
        ) : (
          <p className="text-gray-500">Đang tải...</p>
        )}
      </ul>
    </div>
  );
};

export default AdminAccount;
