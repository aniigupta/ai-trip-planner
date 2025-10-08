import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateTripDetail = mutation({
  args: {
    tripId: v.string(),
    uid: v.id("UserTable"),
    tripDetail: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("TripDetailTable", {
      tripId: args.tripId,
      uid: args.uid,
      tripDetail: args.tripDetail,
      createdAt: Date.now(), 
    });

    return result;
  },
});
