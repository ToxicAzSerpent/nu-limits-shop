import React, { useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { DEFAULT_SETTINGS, pickSettings } from "@/lib/shop";
import ShopBackground from "@/components/shop/ShopBackground";
import ShopNav from "@/components/shop/ShopNav";
import MenuOverlay from "@/components/shop/MenuOverlay";
import ShopHero from "@/components/shop/ShopHero";
import ShopPanel from "@/components/shop/ShopPanel";
import ProductDialog from "@/components/shop/ProductDialog";
import CollectionDialog from "@/components/shop/CollectionDialog";
import CartDrawer from "@/components/shop/CartDrawer";
import CheckoutDialog from "@/components/shop/CheckoutDialog";
import ManageDrawer from "@/components/shop/ManageDrawer";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [settingsId, setSettingsId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [page, savedSettings] = await Promise.all([
          base44.entities.ShopItem.filter({ active: true }, { sort: "sort_order", limit: 60 }),
          base44.entities.ShopSettings.list({ limit: 1 }),
        ]);
        if (!alive) return;
        setItems(page.items || []);
        if (savedSettings[0]) {
          setSettingsId(savedSettings[0].id);
          setSettings({ ...DEFAULT_SETTINGS, ...pickSettings(savedSettings[0]) });
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .catch((error) => {
        if (error?.status !== 401 && error?.status !== 403) console.error(error);
        setUser(null);
      });
  }, []);

  const isAdmin = user?.role === "admin";
  const featured = useMemo(() => items.find((item) => item.featured) || items[0], [items]);

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

  const addToCart = (item, size, qty = 1) => {
    const key = `${item.id}__${size || "one"}`;
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) => (line.key === key ? { ...line, qty: line.qty + qty } : line));
      }
      return [
        ...current,
        { key, id: item.id, name: item.name, price: item.price, image_url: item.image_url, size: size || "", qty },
      ];
    });
    setActiveItem(null);
    setCartOpen(true);
  };

  const changeQty = (key, delta) => {
    setCart((current) =>
      current
        .map((line) => (line.key === key ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0)
    );
  };

  const removeLine = (key) => setCart((current) => current.filter((line) => line.key !== key));

  const placeOrder = async (customer) => {
    const order_number = `NU-${Date.now().toString(36).toUpperCase().slice(-5)}`;
    const order = await base44.entities.ShopOrder.create({
      order_number,
      customer_name: customer.name,
      customer_email: customer.email,
      phone: customer.phone,
      address: customer.address,
      notes: customer.notes,
      items: cart.map((line) => ({
        item_id: line.id,
        name: line.name,
        size: line.size,
        quantity: line.qty,
        price: line.price,
      })),
      item_count: cartCount,
      total: subtotal,
      status: "new",
    });
    setCart([]);
    return order;
  };

  const refreshItems = async () => {
    const page = await base44.entities.ShopItem.filter({ active: true }, { sort: "sort_order", limit: 60 });
    setItems(page.items || []);
  };

  const addItem = async (payload) => {
    await base44.entities.ShopItem.create(payload);
    await refreshItems();
  };

  const removeItem = async (id) => {
    await base44.entities.ShopItem.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const saveSettings = async (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    const payload = {
      store_name: next.store_name,
      hero_caption: next.hero_caption,
      panel_description: next.panel_description,
      background: next.background,
      currency: next.currency,
    };
    if (settingsId) {
      await base44.entities.ShopSettings.update(settingsId, payload);
    } else {
      const created = await base44.entities.ShopSettings.create(payload);
      setSettingsId(created.id);
    }
  };

  const openManage = () => {
    if (isAdmin) setManageOpen(true);
    else base44.auth.redirectToLogin(window.location.href);
  };

  const menuLinks = [
    { label: "Collection", onClick: () => setCollectionOpen(true) },
    { label: "New release", onClick: () => featured && setActiveItem(featured) },
    {
      label: "Bag",
      meta: `${cartCount} item${cartCount === 1 ? "" : "s"}`,
      onClick: () => setCartOpen(true),
    },
    { label: isAdmin ? "Manage store" : "Sign in to manage", onClick: openManage },
  ];

  return (
    <div className="nu-scope relative min-h-screen overflow-x-hidden">
      <ShopBackground variant={settings.background} />

      <ShopNav
        storeName={settings.store_name}
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />

      <main className="relative mx-auto grid w-full max-w-[1680px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-20 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 lg:px-10 lg:pb-10 lg:pt-24">
        <ShopHero
          featured={featured}
          settings={settings}
          loading={loading}
          onBrowse={() => setCollectionOpen(true)}
          onSelect={setActiveItem}
        />
        <ShopPanel
          items={items}
          settings={settings}
          loading={loading}
          onSelect={setActiveItem}
          onBrowse={() => setCollectionOpen(true)}
        />
      </main>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} links={menuLinks} />

      <ProductDialog
        item={activeItem}
        currency={settings.currency}
        onClose={() => setActiveItem(null)}
        onAdd={addToCart}
      />

      <CollectionDialog
        open={collectionOpen}
        onClose={() => setCollectionOpen(false)}
        items={items}
        currency={settings.currency}
        loading={loading}
        onSelect={(item) => {
          setCollectionOpen(false);
          setActiveItem(item);
        }}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart}
        currency={settings.currency}
        onQty={changeQty}
        onRemove={removeLine}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onBrowse={() => {
          setCartOpen(false);
          setCollectionOpen(true);
        }}
      />

      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        lines={cart}
        subtotal={subtotal}
        currency={settings.currency}
        onPlaceOrder={placeOrder}
      />

      <ManageDrawer
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        items={items}
        settings={settings}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onSaveSettings={saveSettings}
      />
    </div>
  );
}