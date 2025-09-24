import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Query the 'UserTable' to check if a user with the provided email already exists.
    const user = await ctx.db
      .query("UserTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // 2. Check if the query result is an empty array.
    if (user.length === 0) {
      // 3. If no user is found, insert the new user into the 'UserTable'.
      const userData = {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      };
     const result = await ctx.db.insert("UserTable", userData);
      return userData; // Return the newly created user data
    }

    // 4. If the user already exists, return the first user object found.
    return user[0];
  },
});