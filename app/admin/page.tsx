"use client";

import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";

export default function AdminDashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Welcome to your Content Management System. Monitor your website content and perform common tasks.
        </p>
      </div>

      <DashboardOverview />
    </div>
  );
}