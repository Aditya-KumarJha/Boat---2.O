import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "../utils/axios"; 

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

  const addToCollection = async (productId) => {
    if (!backendUser) return;
    try {
      const res = await axios.post("/api/user/collection", { productId });
      setBackendUser(res.data.user);
    } catch (err) {
      console.error("❌ Failed to add to collection:", err);
    }
  };

  const removeFromCollection = async (productId) => {
    if (!backendUser) return;
    try {
      const res = await axios.delete("/api/user/collection", {
        data: { productId },
      });
      setBackendUser(res.data.user);
    } catch (err) {
      console.error("❌ Failed to remove from collection:", err);
    }
  };

  const isInCollection = (productId) => {
    return backendUser?.savedItems?.some((item) => item.productId === productId)
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
        addToCollection,
        removeFromCollection,
        isInCollection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
