import {v} from "convex/values"
import {query} from "./_generated/server";


export const get = query({
    args: {
        orgId: v.string()
    },
    handler: async (ctx , arg)=>{

        const identity = await ctx.auth.getUserIdentity()
        if(!identity) return

      const boards =  await ctx.db.query("boards").withIndex("by_org", (q) => q.eq("orgId", arg.orgId) )
        .order("desc")
        .collect()

        const boardWithFavoriteRelation = boards.map(board => {
            return ctx.db
                   .query("favorite")
                   .withIndex("by_user_board", q => q
                                                      .eq("userId", identity.subject)
                                                      .eq("boardId", board._id )
                    )
                    .unique()
                    .then(favorite => {
                        return {
                            ...board,
                            isFavorite: !!favorite
                        }
                    })

        })

        const boardWithFavoriteBoolean = Promise.all(boardWithFavoriteRelation);
        return boardWithFavoriteBoolean

    }
})
