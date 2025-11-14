  import { useState } from "react";
  import { Card, CardContent } from "./components/card"
  import { Button } from "./components/button";
  import { motion, AnimatePresence } from "framer-motion";

  export default function BillPrinterApp() {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({ name: "", qty: 0, price: 0 });
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState({
      storeNames: false,
      paperSize: "A4 Full Page",
      copies: 1,
      orientation: "Portrait",
      invoiceHeader: "ESTIMATE",
      invoiceSubheader: "",
      invoiceFooter: "Thank you",
      darkMode: false,
      gstin: "",
      gstTax: 0,
      gstHeader: "GST INVOICE",
      roundOff: 1,
    });

    const handleAddItem = () => {
      if (!item.name || !item.qty || !item.price) return;
      setItems([...items, item]);
      setItem({ name: "", qty: "", price: "" });
    };

    const handleNewBill = () => {
      setItems([]);
      setItem({ name: "", qty: "", price: "" });
    };

    const handleSave = () => {
      localStorage.setItem("item",items);
      localStorage.setItem("setting",settings);
    };

    const handlePrint=()=>{
      window.print();
    }
    const date = new Intl.DateTimeFormat("en-IN").format(new Date());

    const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

    return (
      <div
        className={`min-h-screen transition-all duration-500 ${
          settings.darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Header */}
        <header className="bg-blue-700 text-white py-4 text-center text-2xl font-semibold shadow-md relative">
          POSHAK BILL PRINTER
          <button
            className="absolute right-6 top-4 bg-blue-600 hover:bg-blue-800 p-2 rounded"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>
        </header>

        {/* Top Section (Date, Bill Number, Account, City, Broker, Delivery, Note) */}
        <div className="max-w-5xl mx-auto mt-6 bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Date:</label>
            <input type="text" className="w-full border rounded p-2 mt-1" defaultValue= {date} />
          </div>
          <div>
            <label className="font-semibold">Bill Number:</label>
            <input type="text" className="w-full border rounded p-2 mt-1" defaultValue="1" />
          </div>
          <div>
            <label className="font-semibold">City:</label>
            <input type="text" className="w-full border rounded p-2 mt-1" defaultValue="Jodhpur" />
          </div>
          <div>
            <label className="font-semibold">Account:</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter account name" />
          </div>
          <div>
            <label className="font-semibold">Broker:</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter broker" />
          </div>
          <div>
            <label className="font-semibold">Delivery:</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter delivery address" />
          </div>
          <div className="md:col-span-2">
            <label className="font-semibold">Note:</label>
            <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter any notes" />
          </div>
        </div>

        {/* Item Form */}
        <div className="max-w-4xl mx-auto mt-8 space-y-6 p-4">
          <Card className="p-4 shadow-lg">
            <CardContent className="flex flex-wrap gap-4 items-end">
              <input
                type="text"
                placeholder="Item Name"
                className="border rounded p-2 flex-1"
                value={item.name}
                onChange={(e) => setItem({ ...item, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Qty"
                className="border rounded p-2 w-24"
                value={item.qty}
                onChange={(e) => setItem({ ...item, qty: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Price"
                className="border rounded p-2 w-32"
                value={item.price}
                onChange={(e) => setItem({ ...item, price: Number(e.target.value) })}
              />
              <Button onClick={handleAddItem}>Add</Button>
            </CardContent>
          </Card>

          {/* Bill Table */}
          <Card className="shadow-md">
            <CardContent>
              <table className="w-full border border-gray-300 text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Item</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{i.name}</td>
                      <td className="p-2">{i.qty}</td>
                      <td className="p-2">₹{i.price}</td>
                      <td className="p-2 font-medium">₹{i.qty * i.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right mt-4 font-bold text-lg">
                Total: ₹{total.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
              Save Only
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={handlePrint}>Print Only</Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={handleNewBill}>
              New Bill
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">Old Bills</Button>
          </div>
        </div>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.storeNames}
                      onChange={(e) => setSettings({ ...settings, storeNames: e.target.checked })}
                    />
                    Store Customer Names
                  </label>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label>Paper Size:</label>
                      <select
                        className="w-full border p-2 rounded"
                        value={settings.paperSize}
                        onChange={(e) => setSettings({ ...settings, paperSize: e.target.value })}
                      >
                        <option>A4 Full Page</option>
                        <option>A5 Half Page</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label>Copies:</label>
                      <input
                        type="number"
                        className="w-full border p-2 rounded"
                        value={settings.copies}
                        onChange={(e) => setSettings({ ...settings, copies: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label>Orientation:</label>
                    <select
                      className="w-full border p-2 rounded"
                      value={settings.orientation}
                      onChange={(e) => setSettings({ ...settings, orientation: e.target.value })}
                    >
                      <option>Portrait</option>
                      <option>Landscape</option>
                    </select>
                  </div>

                  <div>
                    <label>Invoice Header:</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={settings.invoiceHeader}
                      onChange={(e) => setSettings({ ...settings, invoiceHeader: e.target.value })}
                    />
                  </div>

                  <div>
                    <label>Invoice Subheader:</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={settings.invoiceSubheader}
                      onChange={(e) => setSettings({ ...settings, invoiceSubheader: e.target.value })}
                    />
                  </div>

                  <div>
                    <label>Invoice Footer:</label>
                    <textarea
                      className="w-full border p-2 rounded"
                      value={settings.invoiceFooter}
                      onChange={(e) => setSettings({ ...settings, invoiceFooter: e.target.value })}
                    />
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                    />
                    Dark Mode
                  </label>

                  <div>
                    <label>GSTIN No.:</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={settings.gstin}
                      onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                    />
                  </div>

                  <div>
                    <label>GST Tax %:</label>
                    <input
                      type="number"
                      className="w-full border p-2 rounded"
                      value={settings.gstTax}
                      onChange={(e) => setSettings({ ...settings, gstTax: e.target.value })}
                    />
                  </div>

                  <div>
                    <label>GST Header:</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={settings.gstHeader}
                      onChange={(e) => setSettings({ ...settings, gstHeader: e.target.value })}
                    />
                  </div>

                  <div>
                    <label>Round Off:</label>
                    <input
                      type="number"
                      className="w-24 border p-2 rounded ml-2"
                      value={settings.roundOff}
                      onChange={(e) => setSettings({ ...settings, roundOff: e.target.value })}
                    />
                  </div>
                </div>

                <div className="text-right mt-6">
                  <Button onClick={() => setShowSettings(false)}>Close</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }