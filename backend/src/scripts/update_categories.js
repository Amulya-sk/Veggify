require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('../model/ItemModel');

async function updateCategories() {
    try {
        const MONGO_URI = process.env.MONGODB_URI;
        if (!MONGO_URI) {
            console.error("MONGODB_URI not found in environment");
            process.exit(1);
        }

        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await Item.updateMany(
            { name: { $in: ['Chana Masala', 'Paneer Butter Masala'] } },
            { $set: { category: 'Lunch' } }
        );

        console.log(`Updated ${result.modifiedCount} items to category 'Lunch'.`);
        console.log('Matched:', result.matchedCount);

        // Verify
        const updatedItems = await Item.find({ name: { $in: ['Chana Masala', 'Paneer Butter Masala'] } });
        updatedItems.forEach(item => {
            console.log(`- ${item.name}: ${item.category}`);
        });

    } catch (error) {
        console.error('Error updating categories:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
        process.exit(0);
    }
}

updateCategories();
