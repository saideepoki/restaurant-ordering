import MenuItem from "../models/MenuItem.js";

export async function featuredItems(req,res) {
    try {
        const featuredItems = await MenuItem.find({featured: true})
        if(!featuredItems || featuredItems.length === 0) {
            res.status(404).json({
                success: false,
                message: "No items found"
            });
        }
        res.status(200).json({
            success: true,
            message: featuredItems
        })
    } catch (error) {
        console.error("Error fetching featured Items", error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}