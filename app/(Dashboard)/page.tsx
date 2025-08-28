"use client";
import React from "react";
import OnUnSelected from "./__components/Layout/OnUnSelected";
import { useOrganization } from "@clerk/nextjs";
import SearchExpressions from "./__components/Layout/SearchExpressions";

// interfaces or types

interface ParamsInteface {
  searchParams: {
    search?: string;
    favorites?: boolean;
  };
}

function Page({ searchParams }: ParamsInteface) {
  const { organization } = useOrganization();
  return (
    <div className="h-[calc(100vh-70px)] w-full overflow-y-auto">
      {!organization ? (
        <OnUnSelected />
      ) : (
        <div>
          <SearchExpressions
            orgId={organization.id}
            searchParams={searchParams}
          />
        </div>
      )}
    </div>
  );
}

export default Page;
