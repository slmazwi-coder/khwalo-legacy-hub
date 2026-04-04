import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    branch: "",
    plan: "",
    paymentMethod: "monthly",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted! A consultant will contact you shortly.");
  };

  return (
    <section id="apply" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Get Started</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Apply Online</h2>
          <p className="text-muted-foreground mt-4 text-sm">
            Complete the form below and upload your documents. Monthly payment options available.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                maxLength={100}
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">ID Number</label>
              <input
                type="text"
                name="idNumber"
                required
                maxLength={13}
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                maxLength={15}
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                maxLength={255}
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Nearest Branch</label>
              <select
                name="branch"
                required
                value={formData.branch}
                onChange={handleChange}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
              >
                <option value="">Select Branch</option>
                <option value="east-london">East London</option>
                <option value="mthatha">Mthatha</option>
                <option value="queenstown">Queenstown</option>
                <option value="ngcobo">Ngcobo</option>
                <option value="lusikisiki">Lusikisiki</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Burial Plan</label>
              <select
                name="plan"
                required
                value={formData.plan}
                onChange={handleChange}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold"
              >
                <option value="">Select Plan</option>
                <option value="essential">Essential - R99/month</option>
                <option value="premium">Premium - R199/month</option>
                <option value="prestige">Prestige - R350/month</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Payment Method</label>
            <div className="flex gap-4">
              {["monthly", "quarterly", "annual"].map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m}
                    checked={formData.paymentMethod === m}
                    onChange={handleChange}
                    className="accent-gold"
                  />
                  <span className="text-sm text-muted-foreground capitalize">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Upload Documents (ID, Proof of Address)</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-gold/40 transition">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload or drag files here</span>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((f) => (
                  <div key={f.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 text-gold" />
                    {f.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-maroon text-primary-foreground py-4 rounded-md font-medium hover:opacity-90 transition shadow-maroon"
          >
            Submit Application
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ApplicationForm;
