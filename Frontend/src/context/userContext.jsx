import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, isSignedIn, isLoaded } = useUser();

  const [backendUser, setBackendUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !isSignedIn || !user?.id || synced) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post("/api/users/sync", {
          externalId: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          profileImage: user.imageUrl,
        });

        setBackendUser(res.data.user);
        setSynced(true);
      } catch (err) {
        console.error("❌ Error syncing user:", err);
        setBackendUser(null);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user, synced]);

  const toggleCollection = async (productId) => {
    if (!backendUser) return;
  
    try {
      const res = await axios.post("/api/user/collection", {
        email: backendUser.email,
        productId,
      });
  
      const isNowSaved = res.data.savedItems.some(
        (item) => item.productId === productId
      );
  
      setBackendUser((prev) => ({
        ...prev,
        savedItems: res.data.savedItems,
      }));
  
      if (isNowSaved) {
        toast.success("Bookmark added", { autoClose: 2000 });
      } else {
        toast.info("Bookmark removed", { autoClose: 2000 });
      }
    } catch (err) {
      console.error("Bookmark error:", err);
      toast.error("Failed to toggle bookmark", { autoClose: 2000 });
    }
  };
  
  

  const isInCollection = (productId) => {
    return backendUser?.savedItems?.some(
      (item) => item.productId === productId
    );
  };

  return (
    <UserContext.Provider
      value={{
        clerkUser: user,
        backendUser,
        isSignedIn,
        loading,
        email:
          backendUser?.email || user?.primaryEmailAddress?.emailAddress || "",
        toggleCollection,
        isInCollection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
