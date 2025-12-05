// frontend/src/components/settings/ProfileSettings.tsx
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import client from "../../api/client";
import { useAuth } from "../../contexts/AuthContext";

interface ProfileSettingsProps {
  onBack: () => void;
}

export function ProfileSettings({ onBack }: ProfileSettingsProps) {
  const { user, updateUser } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // yyyy-mm-dd
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load initial values from current user
  useEffect(() => {
    if (!user) return;

    const name = user.name || "";
    const parts = name.trim().split(" ").filter(Boolean);
    const fn = (user as any).firstName ?? parts[0] ?? "";
    const ln =
      (user as any).lastName ??
      (parts.length > 1 ? parts.slice(1).join(" ") : "");

    setFirstName(fn);
    setLastName(ln);
    setEmail(user.email || "");
    setPhoneNumber((user as any).phoneNumber || "");
    setAddress((user as any).address || "");
    setBio((user as any).bio || "");

    if ((user as any).dateOfBirth) {
      const d = new Date((user as any).dateOfBirth);
      if (!Number.isNaN(d.getTime())) {
        const iso = d.toISOString().slice(0, 10); // yyyy-mm-dd
        setDateOfBirth(iso);
      }
    }
  }, [user]);

  // Clear success message when user starts editing again
  useEffect(() => {
    if (success) setSuccess(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, phoneNumber, dateOfBirth, address, bio]);

  const validate = () => {
    if (!firstName.trim() || !lastName.trim()) {
      return "First name and last name are required.";
    }
    if (!email.trim()) {
      return "Email address is required.";
    }
    // quick email pattern check (not perfect but good enough for UI)
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSave = async () => {
    if (!user) {
      setError("You must be logged in to update your profile.");
      return;
    }

    const id = (user as any).id || (user as any)._id;
    if (!id) {
      setError("Unable to update profile: missing user ID.");
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const fullName = `${firstName} ${lastName}`.trim() || user.name;

      const payload: any = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: fullName,
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        bio: bio.trim(),
      };

      if (dateOfBirth) {
        // backend can parse yyyy-mm-dd into Date
        payload.dateOfBirth = dateOfBirth;
      }

      const res = await client.put(`/users/${id}/profile`, payload);
      const updated = res.data ?? { ...user, ...payload };

      // update auth context + localStorage (AuthContext should handle persistence)
      updateUser(updated);

      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save changes.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Settings
        </Button>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
          <p className="text-slate-600 dark:text-slate-300">
            You need to be logged in to edit your profile.
          </p>
        </div>
      </div>
    );
  }

  const initials =
    (firstName?.[0] || user.name?.[0] || "?") +
    (lastName?.[0] ||
      (user.name || "").split(" ")[1]?.[0] ||
      "");

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 mb-4"
        type="button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </button>

      {/* Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-8 text-white flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-semibold">
            {initials.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl mb-1">Profile Settings</h1>
            <p className="text-white/80 text-sm">
              Manage your personal information
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-sm text-emerald-700 dark:text-emerald-300">
              {success}
            </div>
          )}

          {/* Name row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                className="mt-1"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                className="mt-1"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 000-0000"
                className="mt-1"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          {/* DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                className="mt-1"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            {/* right column left empty to keep layout balanced */}
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              className="mt-1"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={onBack}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-indigo-500 to-blue-600"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
