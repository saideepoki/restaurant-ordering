import MenuItem from "../models/MenuItem.js";

export async function menuItems(req, res) {
    try {
        const menuItems = await MenuItem.find({});
        if(!menuItems || menuItems.length === 0) {
            res.status(404).json({
                success: false,
                message: "No items found"
            })
        }
        res.status(200).json({
            success: true,
            message: menuItems
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}