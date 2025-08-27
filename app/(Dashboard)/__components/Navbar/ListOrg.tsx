import React from "react";
import { useOrganizationList } from "@clerk/nextjs";
import List from "../Sidebar/list";

function ListOrg() {
  const { userMemberships } = useOrganizationList({ userMemberships: true });

  return (
    <div>
      {userMemberships.data?.map((mem) => {
        return (
          <div key={mem.id} className="w-full flex justify-center  mb-1">
            <List
              name={mem.organization.name}
              id={mem.organization.id}
              url={mem.organization.imageUrl}
              key={mem.organization.id}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListOrg;
