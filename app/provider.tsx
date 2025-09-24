"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useContext,useEffect, useState } from "react";
import Header from "./_components/Header";
import { UserDetailContext } from '@/context/UserDetailContext'


function Provider({ children }: { children: React.ReactNode }) {
    // Get the current user from Clerk
    const { user } = useUser();
    const [userDetail,setUserDetail] = useState<any>();

    // Get the Convex mutation for creating a new user
    const createNewUser = useMutation(api.user.CreateNewUser);

    useEffect(() => {
        const addUser = async () => {
            if (user) {
               const result = await createNewUser({
                    email: user?.primaryEmailAddress?.emailAddress ?? "",
                    imageUrl: user?.imageUrl,
                    name: user?.fullName ?? "",
                });
                setUserDetail(result);
            }
        };

        addUser();
    }, [user, createNewUser]);

    return (
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
            <div>
                <Header />
                {children}
            </div>
        </UserDetailContext.Provider>
    );
}

export default Provider;

export const useUserDetail =()=>{
    return useContext(UserDetailContext);
}