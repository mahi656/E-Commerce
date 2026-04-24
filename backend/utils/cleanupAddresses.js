import mongoose from "mongoose";
import dotenv from "dotenv";
import Address from "../models/Address.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const cleanupDuplicates = async () => {
    try {
        const addresses = await Address.find({});
        const seen = new Set();
        const toDelete = [];

        for (const addr of addresses) {
            const key = `${addr.user}-${addr.street}-${addr.city}-${addr.zipCode}`;
            if (seen.has(key)) {
                toDelete.push(addr._id);
            } else {
                seen.add(key);
            }
        }

        if (toDelete.length > 0) {
            await Address.deleteMany({ _id: { $in: toDelete } });
            console.log(`Removed ${toDelete.length} duplicate addresses.`);
        } else {
            console.log("No duplicate addresses found.");
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

cleanupDuplicates();
