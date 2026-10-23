import React from "react";
import SidePanel from "./SidePanel";
import ManageInventory from "./ManageInventory";
import ManageAppearance from "./ManageAppearance";
import ManageLink from "./ManageLink";

export default function ManageDrawer({ open, onClose, items, settings, onAddItem, onRemoveItem, onSaveSettings }) {
  return (
    <SidePanel open={open} onClose={onClose} subtitle="Admin" title="Manage store">
      <div className="space-y-9 pb-6">
        <ManageInventory
          items={items}
          currency={settings.currency}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
        <div className="h-px bg-white/10" />
        <ManageAppearance settings={settings} onSaveSettings={onSaveSettings} />
        <div className="h-px bg-white/10" />
        <ManageLink />
      </div>
    </SidePanel>
  );
}