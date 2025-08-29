import {v} from "convex/values"
import {query} from "./_generated/server";


export const get = query({
    args: {
        orgId: v.string()
    },
    handler: async (ctx , arg)=>{

        const identity = await ctx.auth.getUserIdentity()
        if(!identity) return

       return await ctx.db.query("boards").withIndex("by_org", (q) => q.eq("orgId", arg.orgId) )
        .order("desc")
        .collect()

    }
})
