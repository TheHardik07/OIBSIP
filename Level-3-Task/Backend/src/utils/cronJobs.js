const cron = require("node-cron");
const Inventory = require("../models/Inventory");
const sendEmail = require("./sendEmail");

// Check for low stock items daily at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    const lowStockItems = await Inventory.find({
      $expr: { $lt: ["$quantity", "$minThreshold"] },
    });

    if (lowStockItems.length > 0) {
      const adminEmail = process.env.ADMIN_EMAIL;
      const subject = "Low Stock Alert";
      const text = `The following items are low in stock:\n\n${lowStockItems
        .map((item) => `${item.name}: ${item.quantity} ${item.unit} remaining`)
        .join("\n")}`;

      await sendEmail({
        to: adminEmail,
        subject,
        text,
      });
    }
  } catch (error) {
    console.error("Error in low stock cron job:", error);
  }
});

module.exports = cron;
