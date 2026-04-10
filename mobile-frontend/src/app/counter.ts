"use server";
// import { getCloudflareContext } from '@opennextjs/cloudflare'
import { cookies } from "next/headers";

/**
 * Increment counter and log access
 */
export async function incrementAndLog() {
  const cookieStore = await cookies();

  let currentCount = parseInt(cookieStore.get("page_views")?.value || "0", 10);
  currentCount += 1;

  cookieStore.set("page_views", currentCount.toString(), {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    path: "/",
  });

  const accessTime = new Date().toISOString();
  const recentAccessList: Array<{ accessed_at: string }> = JSON.parse(
    cookieStore.get("recent_access")?.value || "[]",
  );
  recentAccessList.unshift({ accessed_at: accessTime });

  while (recentAccessList.length > 5) {
    recentAccessList.pop();
  }

  cookieStore.set("recent_access", JSON.stringify(recentAccessList), {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    path: "/",
  });

  return {
    count: currentCount,
    recentAccess: recentAccessList,
  };
}

/**
 * Get current counter value and recent access logs
 */
export async function getStats() {
  const cookieStore = await cookies();

  const currentCount = parseInt(
    cookieStore.get("page_views")?.value || "0",
    10,
  );

  const recentAccessList: Array<{ accessed_at: string }> = JSON.parse(
    cookieStore.get("recent_access")?.value || "[]",
  );

  return {
    count: currentCount,
    recentAccess: recentAccessList,
  };
}
